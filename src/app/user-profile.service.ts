import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AccountBalanceRequest, AccountBalanceResponse, AccountDetailResponse, UserDetailResponse } from './user-profile/user-profile.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<UserDetailResponse> {
    let headers = new HttpHeaders();
    headers.append('x-api-key','Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse');
    /*const data = {
      "email":email,
      "password":password
    }*/
    return this.http.post<UserDetailResponse>('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users', { headers: headers})
      .pipe(map(data => data), catchError((e)=>throwError(e)));
  }
  
  getAccountDetails(custID): Observable<AccountDetailResponse> {
    let headers = new HttpHeaders();
    headers.append('x-api-key','Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse');
    const data = {
      "custID": custID
    }
    return this.http.post<AccountDetailResponse>('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/view', data, { headers: headers})
    .pipe(map(data => data), catchError((e)=>throwError(e)));;
  }

  updateAccountBalance(data): Observable<AccountBalanceResponse> {
    let headers = new HttpHeaders();
    headers.append('x-api-key','Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse');
    return this.http.post<AccountBalanceResponse>('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/accounts/update', data, { headers: headers})
    .pipe(map(data => data), catchError((e)=>throwError(e)));;
  }
}
