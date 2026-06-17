import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  async Logout(){
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
