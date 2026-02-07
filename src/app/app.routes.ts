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
  // USER WEBSITE (with navbar + footer)
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home },
      { path: 'service-request', component: ServiceRequest },
      { path: 'job-apply', component: JobApply },
      { path: 'job-apply-form', component: JobApplyForm },
      { path: 'login', component: Login },
    ]
  },

  // ADMIN PANEL 
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboard }
    ]
  },

  // EMPLOYEE PANEL
  {
    path: 'employee',
    component: EmployeeLayout,
    children: [
      { path: '', component: EmployeeDashboard }
    ]
  }
];
