import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { UserDetailResponse } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetail: UserDetailResponse;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getUserDetails().subscribe((data)=>{
      this.userDetail = data;
      console.log(data);
    });
  }

}
