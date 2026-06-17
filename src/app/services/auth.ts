import { Injectable } from '@angular/core';
import { signUp } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { confirmSignUp } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async register(
    email: string,
    password: string
  ) {

    return await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email
        }
      }
    });

  }

  async confirmRegistration(
    email: string,
    code: string
  ) {

    return await confirmSignUp({
      username: email,
      confirmationCode: code
    });

  }

  async login(
    email: string,
    password: string
  ) {
    return await signIn({
      username: email,
      password
    });
  }

  async logout() {
    await signOut();
  }

}