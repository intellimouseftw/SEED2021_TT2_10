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
  users = [{ user: "" }];
  usersResult$: Observable<any>;
  errors: { [key: string]: any } = {
    payeeID: {
      error: false,
      errorText: '',
    },
    amount: {
      error: false,
      errorText: '',
    },
    expensesCat: {
      error: false,
      errorText: '',
    },
  }

  values: { [key: string]: any } = {
    "custID": 10,
    "payeeID": null,
    "dateTime": new Date(),
    "amount": null,
    "expensesCat": null,
    "eGift": false,
    "message": null,
  }


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

  onChange(event: any) {
    console.log(event.value)
    this.values.payeeID = event.value.custID
    console.log(this.values.payeeID)
  }

  handleSubmit() {
    let allValidated = this.checkAllValidation();
    
    if (allValidated) {
      console.log("Success")
      console.log(this.values)
    } else {
      console.log("fail!!")
    }


  }

  handleFieldChange(event: any, id: string) {
   
    let value = (id === 'eGift' ?
      event.checked : (id === 'amount' ? parseInt(event.target.value) : event.target.value));

    let values = this.values;
    values[id] = value;
    this.values = values;

    if (id === "payeeID" || id === "amount" || id === "expensesCat") {
      this.checkValidation(id);

    }


  }

  checkValidation(id: string) {

    let value = this.values[id]
    let errors = this.errors;
    switch (id) {
      case "payeeID":
        if (value === null) {
          errors.payeeID.error = true;
          errors.payeeID.errorText = 'Please select user to transfer to';
        }
        else {
          errors.payeeID.error = false;
          errors.payeeID.errorText = '';
        }
        break;
      case "amount":
        if (value === null || value < 0) {
          errors.amount.error = true;
          errors.amount.errorText = 'Please enter amount';
        }
        else {
          errors.amount.error = false;
          errors.amount.errorText = '';
        }
        break;
      case "expensesCat":
        if (value === null || value === '') {
          errors.expensesCat.error = true;
          errors.expensesCat.errorText = 'Please fill in';
        }
        else {
          errors.expensesCat.error = false;
          errors.expensesCat.errorText = '';
        }
        break;
      default:
        errors[id].error = false;
        errors[id].errorText = '';

    }
    this.errors = errors
    return errors[id].error;
  }

  checkAllValidation() {
    let allValidated = true;
    let idList = ['payeeID', 'amount', 'expensesCat'];
    idList.forEach(id => {
      if (this.checkValidation(id)) {
        allValidated = false;
        console.log("error")
      }
    })
    return allValidated;
  }

}
