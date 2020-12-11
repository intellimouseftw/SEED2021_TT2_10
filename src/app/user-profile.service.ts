import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailResponse } from './user-profile/user-profile.model';

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
    return this.http.post<UserDetailResponse>('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users', { headers: headers});
  }
  
}
