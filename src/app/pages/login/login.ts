import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

    email = '';
    password = '';
    errorMessage = '';

    constructor(
      private authService: AuthService,
      private router: Router,
      private cdr: ChangeDetectorRef
    ) {}

    // async testLogin() {

    //   try {
    //     const result = await this.authService.login(
    //       'dsisuranga@std.foc.sab.ac.lk',
    //       'ASDqwe!@#123'
    //     );
    //     console.log('Login Success:', result);
    //     this.router.navigate(['./dashboard']);
    //   } catch(error) {
    //     console.error('Login Failed:', error);
    //   }

    // }

    async Login(){
      this.errorMessage = '';
      try {
        const result = await this.authService.login(this.email,this.password);
        console.log('Login Success:', result);
        this.router.navigate(['./dashboard']);
      } catch(error: any) {
        console.error('Login Failed:', error);
        this.errorMessage = error.message || 'An error occurred during login. Please try again.';
        this.cdr.detectChanges();
      }
    }

    async Logout(){
      try{

        const isAuthenticated = await this.authService.isAuthenticated()

        if (isAuthenticated){
          const result = await this.authService.logout()
          console.log('User logged out:', result);
        }else{
          console.warn('No Authenticated user to Logout')
        }

      }
      catch{
        console.error('Login out Failed');
      }
    }
}