# Cybersecurity Assessment - Excel vs Code Comparison

**Analysis Date:** March 27, 2026  
**Source:** `Cyber_Assessment_QA_Reference.xlsx`

---

## CRITICAL DISCREPANCIES SUMMARY

### 🔴 INVERTED SCORING (CRITICAL BUGS)

These questions have BACKWARDS scoring logic:

1. **CP-6: Cybersecurity Professional**
   - Excel: Yes (any) = 5, No = 3
   - Code: yes_inhouse = 0, yes_outsourced = 3, no = 5
   - **FIX:** Invert all scores

2. **GV-5: Compliance Requirement**
   - Excel: Yes = 5, No = 1
   - Code: yes = 1, no = 5
   - **FIX:** Invert scores

3. **ID-4: Third-Party Vendors**
   - Excel: Yes = 5, No = 1
   - Code: yes = 1, no = 5
   - **FIX:** Invert scores

### 🔴 WRONG OPTIONS (CRITICAL BUGS)

1. **CP-1: Business Model**
   - Excel: `Don't Know | B2C | B2B | B2G | B2B_B2C | ALL 3`
   - Code: `product | service | both | nonprofit | government`
   - **FIX:** Replace all options

2. **CP-3: Employee Range**
   - Excel: `0->9 | 10->49 | 50->199 | 200->999 | 1000->4999 | 5000+` (6 options)
   - Code: `0-9 | 10-49 | 50-249 | 250+` (4 options)
   - **FIX:** Replace with 6 ranges

3. **CP-4: Annual Revenue**
   - Excel: `Don't Know | Under 1M | 1M - 10M | 10M+` (4 options)
   - Code: `under_1m | 1m_10m | 10m_50m | 50m_plus` (4 options)
   - **FIX:** Replace with Excel's 4 options

### 🟡 MISSING OPTIONS (HIGH PRIORITY)

All questions missing:
- **"Don't Know"** option (score = 5)
- **"N/A"** option (score = 0) for applicable questions

### 🟡 WRONG SCORING VALUES

1. **CP-5: Handles Sensitive Data**
   - Excel: No = 3
   - Code: No = 1
   - **FIX:** Change No from 1 to 3

2. **CP-4: Annual Revenue**
   - Excel: 1M-10M = 3
   - Code: 1M-10M = 2
   - **FIX:** Change from 2 to 3

---

## DETAILED EXCEL DATA EXTRACTION

### CP-1: Primary Business Model

**Excel Options:**
```
Don't Know | B2C | B2B | B2G | B2B_B2C | ALL 3
```

**Excel Scoring:**
```
ALL 3 = 5
B2G = 4
B2B_B2C = 4
B2B = 2
B2C = 1
Don't Know = 5
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js
{
  id: 'cp_1', category: 'companyProfile', field: 'primaryBusinessModel',
  text: 'What is your primary business / organization model?',
  type: 'select', required: true,
  options: [
    { value: 'dont_know', label: "Don't Know" },
    { value: 'b2c', label: 'B2C' },
    { value: 'b2b', label: 'B2B' },
    { value: 'b2g', label: 'B2G' },
    { value: 'b2b_b2c', label: 'B2B_B2C' },
    { value: 'all_3', label: 'ALL 3' },
  ],
}

// assessmentScoring.js
primaryBusinessModel: { 
  all_3: 5, 
  b2g: 4, 
  b2b_b2c: 4, 
  b2b: 2, 
  b2c: 1, 
  dont_know: 5 
}
```

---

### CP-2: Critical Infrastructure

**Excel Options:**
```
Yes | No | Don't Know
```

**Excel Scoring:**
```
Yes = 5
No = 3
Don't Know = 5
N/A = 0
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js
options: [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'dont_know', label: "Don't Know" },
]

// assessmentScoring.js
criticalInfrastructure: { yes: 5, no: 3, dont_know: 5 }
```

---

### CP-3: Employee Range

**Excel Options:**
```
0->9 | 10->49 | 50->199 | 200->999 | 1000->4999 | 5000+
```

**Excel Scoring:**
```
0->9 = 1
10->49 = 2
50->199 = 3
200->999 = 4
1000->4999 = 5
5000+ = 5
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js
options: [
  { value: '0-9', label: '0 → 9' },
  { value: '10-49', label: '10 → 49' },
  { value: '50-199', label: '50 → 199' },
  { value: '200-999', label: '200 → 999' },
  { value: '1000-4999', label: '1000 → 4999' },
  { value: '5000+', label: '5000+' },
]

// assessmentScoring.js
employeeRange: { 
  '0-9': 1, 
  '10-49': 2, 
  '50-199': 3, 
  '200-999': 4, 
  '1000-4999': 5, 
  '5000+': 5 
}
```

---

### CP-4: Annual Revenue

**Excel Options:**
```
Don't Know | Under 1M | 1M - 10M | 10M+
```

**Excel Scoring:**
```
Under 1M = 1
1M–10M = 3
10M+ = 5
Don't Know = 5
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js
options: [
  { value: 'dont_know', label: "Don't Know" },
  { value: 'under_1m', label: 'Under 1M' },
  { value: '1m_10m', label: '1M - 10M' },
  { value: '10m_plus', label: '10M+' },
]

// assessmentScoring.js
annualRevenue: { 
  under_1m: 1, 
  '1m_10m': 3,  // Changed from 2 to 3
  '10m_plus': 5, 
  dont_know: 5 
}
```

---

### CP-5: Handles Sensitive Data

**Excel Options:**
```
Yes | No | N/A | Don't Know
```

**Excel Scoring:**
```
Yes = 5
No = 3
Don't Know = 5
N/A = 0
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js
options: [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'na', label: 'N/A' },
  { value: 'dont_know', label: "Don't Know" },
]

// assessmentScoring.js
handlesSensitiveData: { 
  yes: 5, 
  no: 3,  // Changed from 1 to 3
  na: 0, 
  dont_know: 5 
}
```

---

### CP-6: Cybersecurity Professional

**Excel Options:**
```
No | Yes - In-House | Yes - Outsourced | Yes - both | Don't Know
```

**Excel Scoring:**
```
Yes (any) = 5
No = 3
Don't Know = 5
N/A = 0
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js
options: [
  { value: 'no', label: 'No' },
  { value: 'yes_inhouse', label: 'Yes - In-House' },
  { value: 'yes_outsourced', label: 'Yes - Outsourced' },
  { value: 'yes_both', label: 'Yes - both' },
  { value: 'dont_know', label: "Don't Know" },
]

// assessmentScoring.js
hasCybersecurityPro: { 
  yes_inhouse: 5,     // Changed from 0 to 5
  yes_outsourced: 5,  // Changed from 3 to 5
  yes_both: 5,        // New option
  no: 3,              // Changed from 5 to 3
  dont_know: 5        // New option
}
```

---

### GOVERNANCE QUESTIONS (GV-1 to GV-6)

**Excel Options (ALL):**
```
Yes | No | Don't Know
```

**Excel Scoring (GV-1, GV-2, GV-3, GV-4, GV-6):**
```
Yes = 1
No = 5
Don't Know = 5
N/A = 0
Max = 5
```

**Excel Scoring (GV-5 ONLY - INVERTED):**
```
Yes = 5
No = 1
Don't Know = 5
N/A = 0
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js - Add to ALL governance questions
options: [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'dont_know', label: "Don't Know" },
]

// assessmentScoring.js - Update YES_NO_SCORES
const YES_NO_SCORES = { yes: 1, no: 5, dont_know: 5 };

// assessmentScoring.js - Add special case for GV-5
const GV5_SCORES = { yes: 5, no: 1, dont_know: 5 };

// Update scoreCategory function to handle GV-5 special case
export function scoreCategory(categoryName, responses) {
  const scores = {};
  let subtotal = 0;

  if (!responses || typeof responses !== 'object') {
    return { scores, subtotal };
  }

  for (const [field, value] of Object.entries(responses)) {
    // Special case for GV-5 (complianceRequirement)
    if (categoryName === 'governance' && field === 'complianceRequirement') {
      const score = GV5_SCORES[value] ?? 0;
      scores[field] = score;
      subtotal += score;
    } else {
      const score = YES_NO_SCORES[value] ?? 0;
      scores[field] = score;
      subtotal += score;
    }
  }

  return { scores, subtotal };
}
```

---

### IDENTIFY QUESTIONS (ID-1 to ID-5)

**Excel Options (ALL):**
```
Yes | No | N/A | Don't Know
```

**Excel Scoring (ID-1, ID-2, ID-3, ID-5):**
```
Yes = 1
No = 5
Don't Know = 5
N/A = 0
Max = 5
```

**Excel Scoring (ID-4 ONLY - INVERTED):**
```
Yes = 5
No = 1
Don't Know = 5
N/A = 0
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js - Add to ALL identify questions
options: [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'na', label: 'N/A' },
  { value: 'dont_know', label: "Don't Know" },
]

// assessmentScoring.js - Update YES_NO_SCORES
const YES_NO_SCORES = { yes: 1, no: 5, na: 0, dont_know: 5 };

// assessmentScoring.js - Add special case for ID-4
const ID4_SCORES = { yes: 5, no: 1, na: 0, dont_know: 5 };

// Update scoreCategory function to handle ID-4 special case
export function scoreCategory(categoryName, responses) {
  const scores = {};
  let subtotal = 0;

  if (!responses || typeof responses !== 'object') {
    return { scores, subtotal };
  }

  for (const [field, value] of Object.entries(responses)) {
    // Special case for GV-5 (complianceRequirement)
    if (categoryName === 'governance' && field === 'complianceRequirement') {
      const score = GV5_SCORES[value] ?? 0;
      scores[field] = score;
      subtotal += score;
    }
    // Special case for ID-4 (thirdPartyVendors)
    else if (categoryName === 'identify' && field === 'thirdPartyVendors') {
      const score = ID4_SCORES[value] ?? 0;
      scores[field] = score;
      subtotal += score;
    }
    else {
      const score = YES_NO_SCORES[value] ?? 0;
      scores[field] = score;
      subtotal += score;
    }
  }

  return { scores, subtotal };
}
```

---

### PROTECT, DETECT, RESPOND, RECOVER QUESTIONS

**Excel Options (ALL):**
```
Yes | No | N/A | Don't Know
```

**Excel Scoring (ALL):**
```
Yes = 1
No = 5
Don't Know = 5
N/A = 0
Max = 5
```

**Required Code Changes:**
```javascript
// assessmentQuestions.js - Add to ALL questions in these categories
options: [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'na', label: 'N/A' },
  { value: 'dont_know', label: "Don't Know" },
]

// assessmentScoring.js - Already handled by YES_NO_SCORES update above
const YES_NO_SCORES = { yes: 1, no: 5, na: 0, dont_know: 5 };
```

---

## IMPLEMENTATION PRIORITY

### Phase 1: CRITICAL FIXES (Do First)
1. CP-1: Replace all options and scoring
2. CP-3: Replace 4 ranges with 6 ranges
3. CP-4: Replace options and fix scoring
4. CP-5: Fix "No" scoring (1 → 3)
5. CP-6: Invert scoring and add options
6. GV-5: Invert scoring
7. ID-4: Invert scoring

### Phase 2: UX IMPROVEMENTS (Do Second)
8. Add "Don't Know" to all questions
9. Add "N/A" to applicable questions
10. Update backend validation
11. Update frontend UI

### Phase 3: TESTING (Do Last)
12. Unit tests for scoring
13. Integration tests for API
14. E2E tests for UI
15. Validation tests

---

## VALIDATION CHECKLIST

After implementation, verify:

- [ ] All dropdown options match Excel exactly
- [ ] All scoring values match Excel exactly
- [ ] CP-6 scoring is correct (Yes=5, No=3)
- [ ] GV-5 scoring is correct (Yes=5, No=1)
- [ ] ID-4 scoring is correct (Yes=5, No=1)
- [ ] "Don't Know" option exists on all questions
- [ ] "N/A" option exists on applicable questions
- [ ] Backend accepts all new option values
- [ ] Frontend displays all options correctly
- [ ] Risk calculations are accurate
- [ ] Reports show correct scores

---

**END OF ANALYSIS**
