import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {
    constructor(
    private authService: AuthService
  ) {}

  async verify() {

    try {

      const result =
        await this.authService.confirmRegistration(
          'dsisuranga@std.foc.sab.ac.lk',
          '492084'
        );

      console.log(result);

    } catch(error) {

      console.error(error);

    }

  }
}
