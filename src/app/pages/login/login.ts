import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

    async testLogin() {

      try {
        const result = await this.authService.login(
          'dasunjayassri@gmail.com',
          'Password123!'
        );
        console.log('Login Success:', result);
        this.router.navigate(['./dashboard']);
      } catch(error) {
        console.error('Login Failed:', error);
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