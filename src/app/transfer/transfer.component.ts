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
  userId = 10;
  errorMsg = 'noError';
  users = [{user:""}];
  usersResult$: Observable<any>;
  selectedPayee;

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
        this.users = result;
        console.log(this.users)
      }

    })

  }

  ngOnInit(): void {
  }

  onChange(event:any){
    console.log(event.value)
    this.selectedPayee = event.value
    console.log(this.selectedPayee)
  }

  handleSubmit() {
    console.log("submitted")

  }

  handleFieldChange(event: any, id: string){
    console.log("event: " + event)
  }

}
