import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { AppRoutingModule } from "src/app/app-routing.module";


@NgModule({
  declarations: [AddTaskComponent, UpdateTaskComponent, DeleteTaskComponent, ListTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    AppRoutingModule
  ],

  // need to export new component here Everytime, whenever you add a new Component in this Module
  exports: [
    AddTaskComponent,
    UpdateTaskComponent,
    DeleteTaskComponent,
    ListTaskComponent
  ]
})
export class TaskModule { }
