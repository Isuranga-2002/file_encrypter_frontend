import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth';

// 1. Add 'async' before the arrow function
export const guestGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. Add 'await' to resolve the Promise into an actual boolean
  const isAuth = await authService.isAuthenticated();

  if (isAuth) {
    // If the user is already logged in, redirect them to the dashboard
    return router.parseUrl('/dashboard');
  }
  
  // If not logged in, allow them to view the login/register page
  return true;
};