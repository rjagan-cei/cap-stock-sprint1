export const memberBasePath = '/api/v2/members';
export const lookupBasePath = '/api/v2/lookup';

export const environment = {
  production: false,
  memberApiPath: `http://${window.location.hostname}:8001` + memberBasePath,
  lookupApiPath: `http://${window.location.hostname}:8001` + lookupBasePath
};