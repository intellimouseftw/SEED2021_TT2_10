import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_API_LOGIN: string = 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login';

  constructor(private http: HttpClient) { }

  login(user: string, pass: string): Observable<any> {
    const cred = {
      username: user,
      password: pass
    };

    return this.http.post(`${this.AUTH_API_LOGIN}login`, cred).pipe(map(user => {

    }));
  }
}
