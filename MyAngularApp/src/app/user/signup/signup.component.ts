import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { MustMatch } from "src/app/shared/mustMatch";
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, 
              private formBuilder: FormBuilder, 
              private router: Router){ }    // private notification: NotificationsService

  signupForm;
  showSuccessMessage: boolean ;
  emailAlreadyExisterrorMessage: boolean;
  invalidFormErrorMessage: boolean;
  invalidEmailMessage: boolean;
  submitted: boolean = false;

  alreadyExistError: string = 'User already Exist';

  // to get clean form on load
  // ngOnInit(): void {
  //   this.signupForm = this.formBuilder.group({
  //     name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  //     confirmpassword: new FormControl('', Validators.required ) 
  //   });
  // }

  //to get clean form on every load
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmpassword: new FormControl('', Validators.required ) 
    }, 
    { 
      validator: MustMatch('password', 'confirmpassword') 
    });
  } 

  // convenience getter for easy access to form fields
  get s() { return this.signupForm.controls; }
  

  getData() {

    //need this variable to use in validation
    this.submitted = true;

    if (this.signupForm.valid) {
      this.userService.saveUser(this.signupForm.value).subscribe(
        (result) => {
          console.warn(result);

          //navigating to new page
          this.router.navigate(['/tasklist']);

          //for display success message
          this.showSuccessMessage = true;
          setTimeout(() => this.showSuccessMessage = false, 3000);

          //to reset the form after submit
          this.ngOnInit();
          this.submitted = false;
          
        },
        (error) => {
          //printing error status
          console.warn(error.status);

          //printing error value
          console.warn(error.error);

          //detecting type of error
          if (error.status == 409) {
            this.emailAlreadyExisterrorMessage = true
            setTimeout(() => this.emailAlreadyExisterrorMessage = false, 5000);
          }

          // if (error.status == 422) {
          if (error.error == 'invalidEmail') {
            this.invalidEmailMessage = true
            setTimeout(() => this.invalidEmailMessage = false, 4000);
          }
        }
      );
    }
    else {
      this.invalidEmailMessage = true
      setTimeout(() => this.invalidEmailMessage = false, 4000);
      console.warn('Form is invalid');
      return
    }

  }

}
