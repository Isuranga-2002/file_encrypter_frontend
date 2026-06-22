import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <button (click)="testRegister()">
      Test Register
    </button>
  `
})
export class Register {

  constructor(
    private authService: AuthService
  ) {}

  async testRegister() {

    try {

      const result =
        await this.authService.register(
          'dsisuranga@std.foc.sab.ac.lk',
          'ASDqwe!@#123'
        );

      console.log(result);

    } catch(error) {

      console.error(error);

    }

  }

}