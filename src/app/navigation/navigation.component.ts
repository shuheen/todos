import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private auth: AuthService) {
    //afAuth.authState.subscribe(user=>this.user = user)
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
