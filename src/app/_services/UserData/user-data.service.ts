import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  readonly USER_KEY = 'auth-user' ; // Storage key for user data

  constructor() { }

  // Save user data for current session
  public saveUser(user: any): void {
    // Clear previous value
    window.localStorage.removeItem(this.USER_KEY);
    // Set new user data
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Retrieve user data for current session
  public getUser(): any {
    return JSON.parse(localStorage.getItem(this.USER_KEY));
  }

  // Remove user data for current session
  public removeUser(): void {
    window.localStorage.removeItem(this.USER_KEY);
  }
}
