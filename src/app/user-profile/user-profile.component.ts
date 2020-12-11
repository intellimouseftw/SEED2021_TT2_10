import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { AccountDetailResponse, UserDetailResponse } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetail: UserDetailResponse;
  accountDetail: AccountDetailResponse;
  topupValue: number;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
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
      console.log(data);
    });
  }

  clickSelectedUser(event) {
    console.log(event);
    // this.getAccountProfile(event.custID);
  }

  clickTopUp(event) {
    console.log(event.target);
  }
}
