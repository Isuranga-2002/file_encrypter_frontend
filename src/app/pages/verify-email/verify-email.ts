import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {

  email=''
  otp =''
  errorMessage =''
  
    constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async verify() {
    this.errorMessage=''
    try {

      const result =
        await this.authService.confirmRegistration(this.email, this.otp);

      console.log(result);
      this.router.navigate(['/dashboard']);

    } catch(error:any) {
      console.error(error);
      this.errorMessage = error.message || 'An error occurred during verification. Please try again.';
      this.cdr.detectChanges();
    }

  }
}
