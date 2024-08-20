export const environment = {
    production: false,
    apiUrl: 'http://complaintdrupal.local/oauth/token',

    //Investigation
    getInvestigationListURL: 'http://complaintdrupal.local/rest/investigation/list',
    createInvestigationURL: 'http://complaintdrupal.local/rest/create-investigation-resource',
    duplicateInvestigationURL: 'http://complaintdrupal.local/rest/duplicate-investigation-resource',
    updateInvestigationURL: 'http://complaintdrupal.local/api/update-investigation-resource/',
    deleteInvestigationURL: 'http://complaintdrupal.local/rest/delete-investigation-resource/',
    
    //Investigation Steps
    getInvestigationURL: 'http://complaintdrupal.local/api/get-investigation-resource/',
    addInvestigationStepURL: 'http://complaintdrupal.local/api/add-investigation-step-resource/',
    deleteInvestigationStepURL: 'http://complaintdrupal.local/api/delete-investigation-step-resource/{investigationId}/step/{stepUuid}',
    updateInvestigationStepURL: 'http://complaintdrupal.local/api/update-investigation-step-resource/{investigationId}/step/{stepUuid}',
    updateInvestigationStepOrderURL: 'http://complaintdrupal.local/api/update-investigation-step-order/',

    
    reportListURL: 'http://complaintdrupal.local/rest/report/list',
    addReportListURL: 'http://complaintdrupal.local/rest/report/create',
    deleteReportURL: 'http://complaintdrupal.local/rest/report/delete/',
    getReportURL: 'http://complaintdrupal.local/rest/report/list/',
    updateReportURL: 'http://complaintdrupal.local/rest/report/update/',

  
    
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret'
  };