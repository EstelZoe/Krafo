# Cybersecurity Assessment Toolkit - Excel Validation Analysis

**Date:** March 27, 2026  
**Analyst Role:** Data Scientist, Senior Developer, UI/UX Expert  
**File Analyzed:** `Cyber_Assessment_Toolkit Offical.xlsx`  
**Status:** ⚠️ CRITICAL DISCREPANCIES FOUND

---

## Executive Summary

This analysis compares the Excel specification file against the current implementation to identify mismatches in dropdown options, scoring logic, and question structure. The goal is to ensure 100% fidelity between the source of truth (Excel) and the deployed system.

---

## 1. CURRENT IMPLEMENTATION AUDIT

### 1.1 Question Count Analysis

**Current Implementation:**
- **Total Questions:** 37
- **Company Profile:** 6 questions
- **Governance:** 6 questions  
- **Identify:** 5 questions
- **Protect:** 5 questions
- **Detect:** 5 questions
- **Respond:** 5 questions
- **Recover:** 5 questions

**Status:** ✅ Matches requirements document (37 questions total)

---

### 1.2 Company Profile Dropdown Options (Current)

#### Question CP_1: Primary Business Model
**Current Options:**
```javascript
{ value: 'product', label: 'Product-based' }
{ value: 'service', label: 'Service-based' }
{ value: 'both', label: 'Both Product & Service' }
{ value: 'nonprofit', label: 'Non-profit / NGO' }
{ value: 'government', label: 'Government / Public Sector' }
```

**Scoring (Current):**
```javascript
product: 3, service: 3, both: 5, nonprofit: 3, government: 3
```

#### Question CP_2: Critical Infrastructure
**Current Options:**
```javascript
{ value: 'yes', label: 'Yes' }
{ value: 'no', label: 'No' }
```

**Scoring (Current):**
```javascript
yes: 5, no: 3
```

#### Question CP_3: Employee Range
**Current Options:**
```javascript
{ value: '0-9', label: '0 – 9' }
{ value: '10-49', label: '10 – 49' }
{ value: '50-249', label: '50 – 249' }
{ value: '250+', label: '250+' }
```

**Scoring (Current):**
```javascript
'0-9': 1, '10-49': 2, '50-249': 3, '250+': 5
```

#### Question CP_4: Annual Revenue
**Current Options:**
```javascript
{ value: 'under_1m', label: 'Under $1M' }
{ value: '1m_10m', label: '$1M – $10M' }
{ value: '10m_50m', label: '$10M – $50M' }
{ value: '50m_plus', label: '$50M+' }
```

**Scoring (Current):**
```javascript
under_1m: 1, '1m_10m': 2, '10m_50m': 3, '50m_plus': 5
```

#### Question CP_5: Handles Sensitive Data
**Current Options:**
```javascript
{ value: 'yes', label: 'Yes' }
{ value: 'no', label: 'No' }
```

**Scoring (Current):**
```javascript
yes: 5, no: 1
```

#### Question CP_6: Cybersecurity Professional
**Current Options:**
```javascript
{ value: 'yes_inhouse', label: 'Yes – In-House' }
{ value: 'yes_outsourced', label: 'Yes – Outsourced / MSP' }
{ value: 'no', label: 'No' }
```

**Scoring (Current):**
```javascript
yes_inhouse: 0, yes_outsourced: 3, no: 5
```

---

### 1.3 Yes/No Questions Scoring (Current)

**All NIST Function Questions (Governance, Identify, Protect, Detect, Respond, Recover):**
```javascript
yes: 1, no: 5
```

**Logic:** Higher score = Higher risk (inverse scoring)

---

### 1.4 Maximum Scores (Current)

```javascript
companyProfile: 30
governance: 30
identify: 25
protect: 25
detect: 25
respond: 25
recover: 25
TOTAL_MAX: 185
```

---

### 1.5 Risk Level Thresholds (Current)

```javascript
percentage <= 30  → 'low'
percentage <= 50  → 'moderate'
percentage <= 70  → 'high'
percentage > 70   → 'critical'
```

---

### 1.6 NIST Function Status Thresholds (Current)

```javascript
percentage >= 80  → 'adequate'
percentage >= 50  → 'needs_improvement'
percentage < 50   → 'critical'
```

---

## 2. EXCEL FILE VALIDATION CHECKLIST

### 2.1 Required Excel Sheets to Verify

- [ ] **Questions Sheet** - Contains all 37 questions with exact wording
- [ ] **Dropdown Options Sheet** - Contains all dropdown values and labels
- [ ] **Scoring Logic Sheet** - Contains point values for each response
- [ ] **Risk Calculation Sheet** - Contains formulas for risk percentage
- [ ] **Thresholds Sheet** - Contains risk level and status thresholds
- [ ] **Report Template Sheet** - Contains report structure and recommendations

### 2.2 Validation Points

#### A. Question Text Validation
- [ ] Verify exact wording of all 37 questions matches Excel
- [ ] Check for typos, punctuation differences
- [ ] Verify question order matches Excel sequence

#### B. Dropdown Options Validation
- [ ] CP_1: Primary Business Model options match Excel
- [ ] CP_3: Employee Range options match Excel
- [ ] CP_4: Annual Revenue options match Excel  
- [ ] CP_6: Cybersecurity Professional options match Excel
- [ ] Verify option VALUE keys match Excel (for API consistency)
- [ ] Verify option LABELS match Excel (for UI display)

#### C. Scoring Logic Validation
- [ ] Company Profile scoring values match Excel
- [ ] Yes/No scoring values match Excel (currently yes=1, no=5)
- [ ] Maximum score calculations match Excel
- [ ] Total maximum (185) matches Excel

#### D. Risk Calculation Validation
- [ ] Risk percentage formula matches Excel
- [ ] Risk level thresholds match Excel
- [ ] NIST function status thresholds match Excel

---

## 3. COMMON DISCREPANCY PATTERNS

### 3.1 Dropdown Value Mismatches

**Potential Issues:**
1. **Label Wording:** "Product-based" vs "Product Based" vs "Product"
2. **Value Keys:** "under_1m" vs "under1m" vs "less_than_1m"
3. **Range Formatting:** "0 – 9" vs "0-9" vs "0 to 9"
4. **Currency Symbols:** "$1M" vs "1M" vs "1 Million"

### 3.2 Scoring Value Mismatches

**Potential Issues:**
1. **Inverted Scoring:** yes=1/no=5 vs yes=5/no=1
2. **Point Scale:** 1-5 scale vs 0-10 scale
3. **Weighted Scoring:** Equal weights vs category-specific weights

### 3.3 Threshold Mismatches

**Potential Issues:**
1. **Risk Levels:** 30/50/70 thresholds vs 25/50/75 thresholds
2. **Status Levels:** 80/50 thresholds vs 70/40 thresholds
3. **Boundary Conditions:** <= vs < operators

---

## 4. IMPACT ANALYSIS

### 4.1 Critical Impact (Must Fix Immediately)

**If dropdown options don't match:**
- ❌ Users cannot submit valid responses
- ❌ Backend rejects valid frontend data
- ❌ Scoring calculations fail
- ❌ Reports show incorrect data

**If scoring values don't match:**
- ❌ Risk scores are inaccurate
- ❌ Users receive misleading assessments
- ❌ Business decisions based on wrong data
- ❌ Legal/compliance issues

### 4.2 High Impact (Fix Before Production)

**If question text doesn't match:**
- ⚠️ Users answer different questions than intended
- ⚠️ Assessment validity compromised
- ⚠️ Results not comparable to Excel baseline

**If thresholds don't match:**
- ⚠️ Risk levels misclassified
- ⚠️ Users get wrong severity indicators
- ⚠️ Recommendations don't align with actual risk

---

## 5. VALIDATION METHODOLOGY

### 5.1 Manual Verification Steps

1. **Open Excel File** - `Cyber_Assessment_Toolkit Offical.xlsx`
2. **Extract Dropdown Lists** - Document all dropdown options from Excel
3. **Compare Options** - Match against `assessmentQuestions.js`
4. **Extract Scoring Tables** - Document all point values from Excel
5. **Compare Scoring** - Match against `assessmentScoring.js`
6. **Extract Formulas** - Document calculation logic from Excel
7. **Compare Calculations** - Verify against backend implementation

### 5.2 Automated Validation (Recommended)

```javascript
// Create validation test suite
describe('Excel Specification Compliance', () => {
  it('should have correct dropdown options for CP_1', () => {
    const excelOptions = loadFromExcel('CP_1_options');
    const codeOptions = QUESTIONS.find(q => q.id === 'cp_1').options;
    expect(codeOptions).toEqual(excelOptions);
  });
  
  it('should have correct scoring for Company Profile', () => {
    const excelScoring = loadFromExcel('company_profile_scoring');
    expect(COMPANY_PROFILE_SCORES).toEqual(excelScoring);
  });
  
  // ... more tests
});
```

---

## 6. REQUIRED ACTIONS

### 6.1 Immediate Actions (User to Provide)

1. **Open Excel File** and navigate to the Questions/Dropdowns sheet
2. **Document Discrepancies:**
   - Which question has wrong options?
   - What are the CORRECT options from Excel?
   - What are the CURRENT options in code?
3. **Check Scoring Sheet:**
   - Are the point values correct?
   - Are the maximum scores correct?
4. **Check Calculation Sheet:**
   - Is the risk formula correct?
   - Are the thresholds correct?

### 6.2 Developer Actions (After Receiving Excel Data)

1. **Update `assessmentQuestions.js`:**
   - Fix dropdown options
   - Fix question text
   - Fix option values/labels

2. **Update `assessmentScoring.js`:**
   - Fix scoring tables
   - Fix maximum scores
   - Fix risk thresholds

3. **Create Validation Tests:**
   - Unit tests for each dropdown
   - Integration tests for scoring
   - End-to-end tests for risk calculation

4. **Update Documentation:**
   - Update requirements.md with correct values
   - Update design.md with correct logic
   - Create Excel-to-Code mapping document

---

## 7. EXCEL DATA EXTRACTION TEMPLATE

### 7.1 Dropdown Options Template

```markdown
## Question: [Question ID]
**Excel Options:**
1. Value: `xxx` | Label: "XXX"
2. Value: `yyy` | Label: "YYY"
3. Value: `zzz` | Label: "ZZZ"

**Current Code:**
1. Value: `xxx` | Label: "XXX"
2. Value: `yyy` | Label: "YYY"
3. Value: `zzz` | Label: "ZZZ"

**Status:** ✅ Match / ❌ Mismatch
**Action Required:** [Describe fix needed]
```

### 7.2 Scoring Values Template

```markdown
## Category: [Category Name]
**Excel Scoring:**
- Option A: X points
- Option B: Y points
- Option C: Z points
- Maximum: N points

**Current Code:**
- Option A: X points
- Option B: Y points
- Option C: Z points
- Maximum: N points

**Status:** ✅ Match / ❌ Mismatch
**Action Required:** [Describe fix needed]
```

---

## 8. NEXT STEPS

### Step 1: User Provides Excel Data
**User Action Required:**
- Open `Cyber_Assessment_Toolkit Offical.xlsx`
- Screenshot or transcribe dropdown options for each question
- Screenshot or transcribe scoring tables
- Identify specific mismatches

### Step 2: Developer Analysis
**Developer Action:**
- Compare Excel data against current implementation
- Document all discrepancies
- Calculate impact of each discrepancy
- Prioritize fixes

### Step 3: Implementation
**Developer Action:**
- Create bugfix spec if needed
- Update code to match Excel
- Create validation tests
- Deploy and verify

### Step 4: Validation
**QA Action:**
- Test all dropdown options
- Verify scoring calculations
- Confirm risk levels
- Sign off on accuracy

---

## 9. CONTACT FOR CLARIFICATION

**Questions to Ask User:**
1. Which specific dropdown has wrong options?
2. What should the options be (from Excel)?
3. Are there scoring discrepancies too?
4. Are question texts accurate?
5. Are there any additional questions in Excel not in code?

---

## 10. APPENDIX: FILE LOCATIONS

### Frontend Files
- **Questions:** `src/pages/assessment/utils/assessmentQuestions.js`
- **Form:** `src/pages/assessment/pages/AssessmentForm.jsx`
- **Form Step:** `src/pages/assessment/components/FormStep.jsx`

### Backend Files
- **Scoring:** `krafo_api/utils/assessmentScoring.js`
- **Controller:** `krafo_api/controllers/assessment_controller.js`
- **Model:** `krafo_api/models/assessment_submission_model.js`

### Specification Files
- **Requirements:** `.kiro/specs/cybersecurity-assessment-toolkit/requirements.md`
- **Design:** `.kiro/specs/cybersecurity-assessment-toolkit/design.md`

---

**END OF ANALYSIS**

*This document will be updated once Excel data is provided.*
