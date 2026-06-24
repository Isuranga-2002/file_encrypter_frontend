import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';
  errorMessage = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // async testRegister() {

  //   try {

  //     const result =
  //       await this.authService.register(
  //         'dsisuranga@std.foc.sab.ac.lk',
  //         'ASDqwe!@#123'
  //       );
  //     console.log(result);

  //   } catch(error) {
  //     console.error(error);
  //   }
  // }

async register(): Promise<void> {
    // 1. Clear any previous error messages
    this.errorMessage = '';

    // 2. Validate input fields
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password cannot be empty.';
      return; // Stop execution
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return; // Stop execution
    }

    // 3. Proceed with API registration
    try {
      const result = await this.authService.register(this.email, this.password);
      console.log('Registration successful:', result);
      
      this.router.navigate(['/verify-email']);
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Extract the error message or provide a fallback
      this.errorMessage = error.message || 'An error occurred during registration. Please try again.';
      
      // Manually trigger change detection to ensure the UI updates with the error
      this.cdr.detectChanges();
    }
  }
}