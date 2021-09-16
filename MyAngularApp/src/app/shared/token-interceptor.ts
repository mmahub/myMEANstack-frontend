import { Injectable, Injector} from '@angular/core';   //, Injector 
import { HttpInterceptor } from "@angular/common/http";

import { UserService } from "./user.service";

// import { LoginComponent } from "src/app/user/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor(private injector: Injector) { }       //

  intercept(req, next){
    let userservice = this.injector.get(UserService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userservice.getToken()}`
      }
    })
    return next.handle(tokenizedReq) ;
  }
}






// let uToken = userservice.getToken('token');
//     let tokenizedReq = req.clone({
//       headers: req.headers.set("Authorization", `Bearer ${uToken}`)
//     })


// while(!uToken) {
    //     console.warn(`while loop started`);
        
    //     uToken = userservice.getToken('token');
    // }

    // let uToken = this.logincompo.token;
    // if(!uToken){
    //     console.warn(`if loop started...`);

    //     //getting token from login component
    //     uToken = this.logincompo.token;
    //     // return req;
    // }
    // let tokenizedReq = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${uToken}`
    //     }
    // })
    // return next.handle(tokenizedReq);