/* 
 * This file stores environment-specific configuration, like the backend API URL.
 * When we use 'environment.apiUrl' in our services, Angular will use the address defined here.
 */

export const environment = {
  // Set to 'true' if we were publishing the app for real users.
  production: false,
  
  // This is the address where our ASP.NET backend is running.
  // Make sure this port (e.g., 5049) matches the port in the backend's 'launchSettings.json'.
  apiUrl: 'http://localhost:5049/api'
};
