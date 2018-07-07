import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../model/user';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  appUser: User;
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser=> this.appUser = appUser)
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
