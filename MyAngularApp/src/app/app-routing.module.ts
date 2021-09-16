import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { ListTaskComponent } from "./task/list-task/list-task.component";
import { AddTaskComponent } from "./task/add-task/add-task.component";
import { UpdateTaskComponent } from "./task/update-task/update-task.component";
import { DeleteTaskComponent } from "./task/delete-task/delete-task.component";
import { AuthGuard } from "./auth.guard";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'tasklist',
    component: ListTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addtask',
    component: AddTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updatetask/:id',
    component: UpdateTaskComponent
  },
  {
    path: 'deletetask/:id',
    component: DeleteTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
