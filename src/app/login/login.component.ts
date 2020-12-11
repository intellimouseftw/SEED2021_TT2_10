import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/Auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Login form
  loginForm: FormGroup;

  onSubmit = (): void => {
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      window.alert('Please fill in username and password.');
      return;
    }

    this.authService.login(this.form.username.value, this.form.password.value).subscribe(data => {
      console.log(data);
      if (typeof data !== 'string') {

      } else {

      }
    });
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Getter for form fields
  get form(): any {
    return this.loginForm.controls;
  }

}
