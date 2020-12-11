import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';
import { AccountBalanceRequest, AccountDetailResponse, UserDetailResponse } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetail: UserDetailResponse = {
    'custID': 10,
    'firstName': 'first',
    'lastName': 'last',
    'nric': 's123456e',
    'gender': 'M', 
    'age': 44,
    'phoneNumber': '12312312',
    'email': 'abc@gmail.com',
    'address': 'postal code 123456'
  };
  accountDetail: AccountDetailResponse;
  topupForm: FormGroup;
  custID: number;

  constructor(private userProfileService: UserProfileService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.topupForm = this.formBuilder.group({
      topupValue: ['']
    });
    this.getUserProfile();
  }

  getUserProfile() { 
    this.userProfileService.getUserDetails().subscribe((data)=>{
      this.userDetail = data;
      console.log(data);
    });
  }

  getAccountProfile(custID) { 
    this.userProfileService.getAccountDetails(custID).subscribe((data)=>{
      this.accountDetail = data;
      this.custID = custID; // keep track of selected custID
      console.log(data);
    });
  }

  clickSelectedUser(event) {
    console.log(event);
    // api call
     this.getAccountProfile(event);

    // temp solution
    if (event == 10) {
      this.accountDetail = {
        'accountName': 'account name',
        'accountNumber': 3453453453,
        'availableBal': 333,
        'linked': false
      };
      this.custID = event;
    }
  }

  clickTopUp() {
    let amount = this.topupForm.get('topupValue').value;
    amount += this.accountDetail.availableBal;

    const request: AccountBalanceRequest = {
      custID: this.custID,
      'Amount': amount,
    }

    // api call and update account
     this.updateAccountBalance(request);

    this.accountDetail.availableBal = amount;   // temp solution
  }
  updateAccountBalance(request: AccountBalanceRequest) { 
    this.userProfileService.updateAccountBalance(request).subscribe((data)=>{
      console.log(data);
      if(data.statusCode === '200'){
        console.log('successful update');
        this.accountDetail.availableBal = request.Amount;
      }
    });
  }
}