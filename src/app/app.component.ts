import { Component, OnInit } from '@angular/core';
import { UserDataService } from './_services/UserData/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login = true;

  onLogin = (event: any): void => {
    this.login = event;
  }

  constructor(private userData: UserDataService) { }

  ngOnInit(): void {
    this.login = this.userData.getUser() !== null;
  }
}
