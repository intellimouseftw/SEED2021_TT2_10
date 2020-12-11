import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDataService } from '../UserData/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_API_LOGIN: string = 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login';

  constructor(private http: HttpClient, private userData: UserDataService) { }

  login(user: string, pass: string): Observable<any> {
    const cred = {
      username: user,
      password: pass
    };

    return this.http.post(this.AUTH_API_LOGIN, cred).pipe(map(user => {
      if (user['custID'])  {
        this.userData.saveUser(user);
        return user;
      }
    }),
      catchError(err => {
        return of(err);
      })
    );
  }

  logout(): void {
    this.userData.removeUser();
  }
}
