import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  
  constructor(private auth: AuthService) {
    
  }


  signUp(user){
    let email = user.email;
    let password = user.password;
    let displayName = user.displayName;

    this.auth.signup(email, password, displayName)
  }
}
