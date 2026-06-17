import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Upload } from './pages/upload/upload';
import { Files } from './pages/files/files';
import { VerifyEmail } from './pages/verify-email/verify-email';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: 'upload', component: Upload, canActivate: [authGuard] },

  { path: 'files', component: Files, canActivate: [authGuard] },

  {path: 'verify-email', component: VerifyEmail }
];
