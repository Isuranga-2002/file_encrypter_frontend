import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    constructor(
      private authService: AuthService
    ) {}

    async testLogin() {

      try {

        const result = await this.authService.login(
          'dasunjayassri@gmail.com',
          'Password123!'
        );

        console.log('Login Success:', result);

      } catch(error) {

        console.error('Login Failed:', error);

      }

    }
}