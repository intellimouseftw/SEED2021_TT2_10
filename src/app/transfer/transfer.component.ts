import { Component, OnInit } from '@angular/core';
import { TransferService } from '../transfer.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  error = false;
  errorMsg = 'noError';
  users = [{user:""}];
  usersResult$: Observable<any>;

  constructor(private transferService: TransferService) { 
    this.usersResult$ = transferService.postUsersData().pipe(
      catchError(error => {
        this.errorMsg = error;
        this.error = true;
        console.log(this.errorMsg)
        return of([]);
      })
    );

    this.usersResult$.subscribe((result) => {
      console.log(result)
      if (result !== []) {
        this.users = result.response;
      }

    })

  }

  ngOnInit(): void {
  }

}
