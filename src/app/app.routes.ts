import { Routes } from '@angular/router';
import { Home } from './user/home/home';
import { ServiceRequest } from './user/service-request/service-request';
import { Login } from './auth/login/login';

export const routes: Routes = [
  { path: '', component: Home },   // default route
  { path: 'service-request', component: ServiceRequest },
  { path: 'login', component: Login }
];
