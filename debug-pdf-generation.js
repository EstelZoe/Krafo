// Comprehensive PDF Generation Debug Script
import { generateAssessmentPDF, buildReportHTML } from './krafo_api/utils/pdfGenerator.js';
import { calculateAllScores } from './krafo_api/utils/assessmentScoring.js';

console.log('=== PDF GENERATION DEBUG ===\n');

// Step 1: Create test data
const testResponses = {
  companyProfile: {
    primaryBusinessModel: 'b2b',
    criticalInfrastructure: 'no',
    employeeRange: '10-49',
    annualRevenue: '1m_10m',
    handlesSensitiveData: 'yes',
    hasCybersecurityPro: 'yes_inhouse',
  },
  governance: {
    formalPolicy: 'no',
    oversightAssigned: 'no',
    vendorRiskPolicy: 'no',
    risksReportedToBoard: 'no',
    complianceRequirement: 'yes',
    thirdPartyAudit: 'no',
  },
  identify: {
    hardwareInventory: 'yes',
    softwareInventory: 'yes',
    knowCriticalSystems: 'yes',
    thirdPartyVendors: 'no',
    knowSensitiveDataLocation: 'yes',
  },
  protect: {
    requiresMfa: 'no',
    accessPrivilegesReviewed: 'yes',
    cybersecurityTraining: 'yes',
    dataEncrypted: 'yes',
    secureDisposalProcess: 'yes',
  },
  detect: {
    securityMonitoringTools: 'yes',
    logsReviewedRegularly: 'yes',
    alertsForUnusualActivity: 'yes',
    regularVulnerabilityScans: 'yes',
    detectUnauthorizedAccess: 'yes',
  },
  respond: {
    incidentResponsePlan: 'yes',
    designatedIncidentHandler: 'yes',
    containMitigateProcess: 'yes',
    employeesTrainedToReport: 'yes',
    communicationProtocols: 'yes',
  },
  recover: {
    disasterRecoveryPlan: 'yes',
    regularBackups: 'yes',
    testedBackupRestoration: 'yes',
    businessContinuityPlan: 'yes',
    postIncidentReviews: 'yes',
  },
};

console.log('Step 1: Calculate scores...');
const scores = calculateAllScores(testResponses);
console.log('✅ Scores calculated');
console.log('   - nistFunctions keys:', Object.keys(scores.nistFunctions));
console.log('   - Governance included?', 'governance' in scores.nistFunctions);

// Step 2: Create mock submission
const mockSubmission = {
  _id: '507f1f77bcf86cd799439011',
  responses: testResponses,
  scores: scores,
  completedAt: new Date(),
};

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  companyName: 'Test Company',
};

console.log('\nStep 2: Build HTML...');
try {
  const html = buildReportHTML(mockSubmission, mockUser);
  console.log('✅ HTML generated successfully');
  console.log('   - HTML length:', html.length, 'characters');
  console.log('   - Contains "Governance"?', html.includes('Governance'));
  console.log('   - Contains all NIST functions?', 
    ['Identify', 'Protect', 'Detect', 'Respond', 'Recover', 'Governance']
      .every(fn => html.includes(fn))
  );
  
  // Check for potential HTML issues
  const openDivs = (html.match(/<div/g) || []).length;
  const closeDivs = (html.match(/<\/div>/g) || []).length;
  console.log('   - Open <div> tags:', openDivs);
  console.log('   - Close </div> tags:', closeDivs);
  console.log('   - Balanced?', openDivs === closeDivs ? '✅' : '❌ MISMATCH!');
  
} catch (err) {
  console.error('❌ HTML generation failed!');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
}

console.log('\nStep 3: Test Puppeteer PDF generation...');
console.log('This will attempt to launch Chromium and generate a PDF...\n');

try {
  const pdfBuffer = await generateAssessmentPDF(mockSubmission, mockUser);
  
  if (pdfBuffer) {
    console.log('✅ PDF generated successfully!');
    console.log('   - PDF size:', pdfBuffer.length, 'bytes');
    console.log('   - PDF size (KB):', (pdfBuffer.length / 1024).toFixed(2), 'KB');
    
    // Save to file for inspection
    const fs = await import('fs');
    fs.writeFileSync('test-report.pdf', pdfBuffer);
    console.log('   - Saved to: test-report.pdf');
    console.log('\n✅ ALL TESTS PASSED - PDF generation is working!');
  } else {
    console.log('❌ PDF generation returned null');
    console.log('   - Check the error logs above for details');
    console.log('   - This means Puppeteer failed but was caught');
    process.exit(1);
  }
} catch (err) {
  console.error('❌ PDF generation threw an uncaught error!');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
}
