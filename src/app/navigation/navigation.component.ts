import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: firebase.User
  constructor(private afAuth: AngularFireAuth, private route: Router) {
    afAuth.authState.subscribe(user=>this.user = user)
  }

  ngOnInit() {
  }

  logout(){
    this.afAuth.auth.signOut();
    this.route.navigate(['/signin'])
  }

}
