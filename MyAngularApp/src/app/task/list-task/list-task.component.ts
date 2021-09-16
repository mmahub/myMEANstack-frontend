import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { TaskService } from "src/app/shared/task.service";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit {

  taskList: any ;
  mtaskList: any ;
  // mtasks:any = {}  ;
  // datetime
  
  constructor(private taskService: TaskService,
              private router: Router) 
  { }

  deleteTaskmethod(id){

    this.taskService.deleteTask(id).subscribe( (result) => {
      console.warn(result);

      this.ngOnInit();
      
    } )
  }

  ngOnInit(): void {
    
    this.taskService.getTask().subscribe( 
      (result) => {
      this.taskList = result ;

      //here accessing tasks array by using ".task" at the end.
      this.mtaskList = this.taskList.tasks ;

      console.warn(this.taskList.tasks)
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
      }
    );

  }

}





// datetime ;
//   deadline: any = [] ;
//   createdOn
//   createdDateTime

// console.warn(this.taskList);

// for(let i in this.taskList){
//   this.deadline = this.taskList[i].deadline
//   this.datetime = new Date();
//   console.warn(this.datetime.toISOString(this.deadline).slice(0,10));
// }
