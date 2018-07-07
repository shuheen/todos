import { Component } from '@angular/core';
import { AuthService } from './../app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private route: Router, private userService: UserService){
    auth.user$.subscribe(user => {
      if(user){
        let returnUrl = localStorage.getItem('returnUrl');
        this.userService.save(user);
        route.navigateByUrl(returnUrl); 
      }
    })
  }
}
