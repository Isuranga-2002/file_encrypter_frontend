import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { Header } from './../header/header';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

}
