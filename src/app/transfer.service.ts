import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { _throw as throwError } from 'rxjs/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  readonly POST_USERS: string = 'https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users';
  constructor(private httpClient: HttpClient) { }
  postUsersData() {
    return this.httpClient.post(this.POST_USERS, {}).pipe(
      catchError(error => {
        let errorMsg: string;
        console.log(error)
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return throwError(errorMsg);
      })
    );

    
    // const httpOptions = {
    //   headers: {
    //     'x-api-key': `Z1DcxhVb3J2TR8rrWiqJh1vFGMHJMPI0a8Wi6Wse`
    //   },
    // };

    // return this.httpClient
    //   .post('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/users', httpOptions)
    //   .pipe(
    //     catchError(error => {
    //       let errorMsg: string;
    //       console.log(error)
    //       if (error.error instanceof ErrorEvent) {
    //         errorMsg = `Error: ${error.error.message}`;
    //       } else {
    //         errorMsg = this.getServerErrorMessage(error);
    //       }
    //       return throwError(errorMsg);
    //     })
    //   );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
