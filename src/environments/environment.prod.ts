export const environment = {
  production: false,
  apiUrl: 'https://investigationb.corporatememory.com.au/oauth/token',
  csrfTokenUrl: 'https://investigationb.corporatememory.com.au/session/token',

  //Investigation
  getInvestigationListURL: 'https://investigationb.corporatememory.com.au/rest/investigation/list',
  createInvestigationURL: 'https://investigationb.corporatememory.com.au/rest/create-investigation-resource',
  duplicateInvestigationURL: 'https://investigationb.corporatememory.com.au/rest/duplicate-investigation-resource',
  updateInvestigationURL: 'https://investigationb.corporatememory.com.au/api/update-investigation-resource/',
  deleteInvestigationURL: 'https://investigationb.corporatememory.com.au/rest/delete-investigation-resource/',
  
  //Investigation Steps
  getInvestigationURL: 'https://investigationb.corporatememory.com.au/api/get-investigation-resource/',
  addInvestigationStepURL: 'https://investigationb.corporatememory.com.au/api/add-investigation-step-resource/',
  deleteInvestigationStepURL: 'https://investigationb.corporatememory.com.au/api/delete-investigation-step-resource/{investigationId}/step/{stepUuid}',
  updateInvestigationStepURL: 'https://investigationb.corporatememory.com.au/api/update-investigation-step-resource/{investigationId}/step/{stepUuid}',
  updateInvestigationStepOrderURL: 'https://investigationb.corporatememory.com.au/api/update-investigation-step-order/',

  //Report
  reportListURL: 'https://investigationb.corporatememory.com.au/rest/report/list',
  addReportListURL: 'https://investigationb.corporatememory.com.au/rest/report/create',
  deleteReportURL: 'https://investigationb.corporatememory.com.au/rest/report/delete/',
  getReportURL: 'https://investigationb.corporatememory.com.au/rest/report/list/',
  updateReportURL: 'https://investigationb.corporatememory.com.au/rest/report/update/',

  //Document Upload
  postUploadFileURL: 'https://investigationb.corporatememory.com.au/file/upload/investigation_documents/_/file',
  addDocument: 'https://investigationb.corporatememory.com.au/rest/investigation/document/post/',
  getDocumentList: 'https://investigationb.corporatememory.com.au//rest/investigation/document/get/',

  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
};