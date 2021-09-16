import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { Router } from "@angular/router";

import { TaskService } from "src/app/shared/task.service";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {


  constructor( private taskService: TaskService,
               private formBuilder: FormBuilder,
               private router: Router
  ){ }

  addTaskForm;
  submitted: boolean;
  showSuccessMessage: boolean;
  showFailMessage: boolean;
  statusTypes: any

  //for date picker configuration/modification
  datePickerConfig: Partial<BsDatepickerConfig>;

  //for date picker configuration/modification
  datepicker(){
    this.datePickerConfig = Object.assign({}, 
      {
        containerClass: 'theme-default',    //'theme-blue', 'theme-green', theme-red
        showWeekNumbers: false,
        dateInputFormat: 'DD/MM/YYYY',

        /*
        1- below line of code is for setting minimum Date 
        2- (with "minDate:new Date()" user will be able to select only future dates from present day
        and will not be able to select the past date, CAN ACT AS AN DATE VALIDATION)
        3- and "maxDate:new Date()" will do opposite of point-2 (this is mostly used in a Date of Birth validation).
        */ 
        // minDate: new Date()
        // maxDate: new Date(2099, 0, 1)   ---> //for 1st January 2099
      });
  }


  ngOnInit(): void {

    // calling this.datepicker() method to apply datepicker modification/config
    this.datepicker();

    this.addTaskForm = this.formBuilder.group({
      task: new FormControl('', Validators.required),
      statusId: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required)
    }) ;

    //calling this to get all the StatusTypes.
    this.getStatusTypes();

  }

  // convenience getter for easy access to form fields
  get at() { return this.addTaskForm.controls; }

  //getting all statusTypes values for displaying in dropdown.
  getStatusTypes(){
    this.taskService.getStatusTypes().subscribe( 
      (result) => {
        this.statusTypes = result ;
      } 
    )
  }

  getData(){

    this.submitted = true ;

    if(this.addTaskForm.valid){
      this.taskService.createTask(this.addTaskForm.value).subscribe( 
      (result) => {

        //for displaying success message
        this.showSuccessMessage = true ;
        setTimeout( () => this.showSuccessMessage = false, 4000 ) ;

        //logging values
        console.log(result);

        //to reset the form after submit
        this.ngOnInit();
        this.submitted = false;

      },
      (error) => {

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['/login'])
          }
          if (error.status === 500) {
            this.router.navigate(['/login'])
          }
        }

        //for displaying fail message
        this.showFailMessage = true ;
        setTimeout(() => this.showFailMessage = false, 4000);
        console.log(error);
        
      }
      ) ;
    }
    else{
      // this.showFailMessage = true ;
      // setTimeout(() => this.showFailMessage = false, 4000);
      console.warn('Form is invalid');
      return
    }

  }

}
