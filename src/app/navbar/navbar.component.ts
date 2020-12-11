import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  onLogout = (): void => {
    this.authService.logout();
    location.reload();
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
