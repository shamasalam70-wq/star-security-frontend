import { Routes } from '@angular/router';
import { Home } from './user/home/home';
import { ServiceRequest } from './user/service-request/service-request';
import { Login } from './auth/login/login';
import { JobApply } from './user/job-apply/job-apply';
import { JobApplyForm } from './user/job-apply-form/job-apply-form';


export const routes: Routes = [
  { path: '', component: Home },   // default route
  { path: 'service-request', component: ServiceRequest },
  { path: 'login', component: Login },
  { path: 'job-apply', component: JobApply },
  { path: 'job-apply-form', component: JobApplyForm }
];
