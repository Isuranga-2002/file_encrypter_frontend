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

  async register(){
    this.errorMessage = '';
    try{
      const result = await this.authService.register(this.email, this.password);
      console.log(result);
      this.router.navigate(['/verify-email']);
    } catch(error: any){
      console.error(error);
      this.errorMessage = error.message || 'An error occurred during registration. Please try again.';
      this.cdr.detectChanges();
    }

  // console.log(this.email);
  // console.log(this.password);
  }
}