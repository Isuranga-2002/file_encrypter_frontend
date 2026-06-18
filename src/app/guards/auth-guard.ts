import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn =
  async () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const authenticated = await authService.isAuthenticated();

    if (authenticated) {
      return true;
    }
    router.navigate(['/login']);

    return false;

  };