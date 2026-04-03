# PDF Generation Failure - Root Cause Analysis

## Executive Summary

The PDF generation is failing with error: `{"error":"Report generation failed. Please try again later."}`. After comprehensive analysis of the codebase, I've identified **CRITICAL SCHEMA MISMATCH** as the root cause. The database schema and scoring logic are fundamentally incompatible with the PDF generator's expectations.

---

## Critical Finding: Schema Mismatch

### The Problem

**Database Schema** (`assessment_submission_model.js` lines 48-56):
```javascript
nistFunctions: {
  identify: { score: Number, maxScore: { type: Number, default: 25 }, status: String },
  protect:  { score: Number, maxScore: { type: Number, default: 25 }, status: String },
  detect:   { score: Number, maxScore: { type: Number, default: 25 }, status: String },
  respond:  { score: Number, maxScore: { type: Number, default: 25 }, status: String },
  recover:  { score: Number, maxScore: { type: Number, default: 25 }, status: String },
  // ❌ GOVERNANCE IS MISSING FROM SCHEMA
},
```

**Scoring Logic** (`assessmentScoring.js` lines 122-123):
```javascript
const governance = scoreCategory('governance', responses?.governance);
// ✅ Governance IS calculated
```

**Scoring Output** (`assessmentScoring.js` lines 145-151):
```javascript
return {
  companyProfile: companyProfile.subtotal,
  governance: governance.subtotal,  // ✅ Governance score returned
  identify: identify.subtotal,
  // ... but NOT in nistFunctions object
  nistFunctions,  // ❌ Does NOT include governance
};
```

**PDF Generator Expectation** (`pdfGenerator.js` line 109):
```javascript
function buildNistBars(nistFunctions) {
  return Object.entries(nistFunctions || {}).map(([fn, data]) => {
    // ❌ Expects governance to be in nistFunctions
    const pct = Math.round((data.score / data.maxScore) * 100);
    // ...
  }).join('');
}
```

### The Impact

1. **Database saves scores WITHOUT governance in nistFunctions**
2. **PDF generator expects governance IN nistFunctions**
3. **When PDF tries to render, it encounters undefined/null values**
4. **Puppeteer crashes or produces malformed HTML**
5. **Error is caught and generic 500 error returned**

---

## Data Flow Analysis

### 1. Assessment Submission Flow

```
User completes assessment
  ↓
submitAssessment() called (assessment_controller.js:56)
  ↓
calculateAllScores(responses) (assessmentScoring.js:121)
  ↓
Returns scores object:
  {
    governance: 18,  // ✅ Flat score
    nistFunctions: {
      identify: { score: 15, maxScore: 25, status: 'needs_improvement' },
      protect: { score: 20, maxScore: 25, status: 'adequate' },
  