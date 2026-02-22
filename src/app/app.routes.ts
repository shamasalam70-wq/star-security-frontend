/* 
 * This file defines the navigation paths (URLs) for our application.
 * Each 'path' is linked to a 'component'. When the URL matches the path, 
 * Angular displays that component.
 */

import { Routes } from '@angular/router';

import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { EmployeeLayout } from './layouts/employee-layout/employee-layout';

import { Home } from './user/home/home';
import { ServiceRequest } from './user/service-request/service-request';
import { JobApply } from './user/job-apply/job-apply';
import { JobApplyForm } from './user/job-apply-form/job-apply-form';
import { Login } from './auth/login/login';

import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { EmployeeDashboard } from './employee/employee-dashboard/employee-dashboard';

export const routes: Routes = [
  /* 
   * PUBLIC WEBSITE ROUTES
   * These all use the 'UserLayout' (which has the navbar and footer).
   */
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home }, // Home page
      { path: 'service-request', component: ServiceRequest }, // Form for clients
      { path: 'job-apply', component: JobApply }, // List of jobs
      { path: 'job-apply-form', component: JobApplyForm }, // Job application form
      { path: 'login', component: Login }, // Login page
    ]
  },

  /* 
   * ADMIN DASHBOARD ROUTES
   * These use a different layout specifically for administrators.
   */
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboard }
    ]
  },

  /* 
   * EMPLOYEE DASHBOARD ROUTES
   * These use the employee-specific layout.
   */
  {
    path: 'employee',
    component: EmployeeLayout,
    children: [
      { path: '', component: EmployeeDashboard }
    ]
  }
];
