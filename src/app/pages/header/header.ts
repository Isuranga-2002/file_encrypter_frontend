import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth';
import { fetchUserAttributes} from 'aws-amplify/auth';
import { Router, RouterLink, RouterLinkActive} from '@angular/router'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  userInitial = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Ensure the method is triggered when the component initializes
    this.getUserInitial(); 
  }

  async getUserInitial(): Promise<void> {
    this.userInitial=''
    try {
      const attributes = await fetchUserAttributes();
      const email = attributes.email ?? '';

      this.userInitial = email.charAt(0).toUpperCase();
      this.cdr.detectChanges();
      // return email.charAt(0).toUpperCase();
    } catch (error) {
      console.error('Failed to get user attributes:', error);
    }
  }

async logout(){
    try{

      const isAuthenticated = await this.authService.isAuthenticated()

      if (isAuthenticated){
        const result = await this.authService.logout()
        console.log('User logged out:', result);
        this.router.navigate(['/login']);
      }else{
        console.warn('No Authenticated user to Logout')
      }

    }
    catch{
      console.error('Login out Failed');
    }
  }
}
