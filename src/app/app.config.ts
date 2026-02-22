/* 
 * This file contains the configuration for the entire Angular application.
 * It's where we 'provide' global services like Routing and HTTP.
 */

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Handles global application errors.
    provideBrowserGlobalErrorListeners(),
    // Tells Angular which routes to use (from app.routes.ts).
    provideRouter(routes),
    // Allows the app to make HTTP requests (talk to the backend).
    provideHttpClient()
  ]
};
