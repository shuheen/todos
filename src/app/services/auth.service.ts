import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private route: Router, private router: ActivatedRoute) {
    this.user$  = afAuth.authState
  }


  signup(email, pass, disp){
    // this.returnUrl();
    this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then(function(user) {
      //console.log(user);
      // [END createwithemail]
      // callSomeFunction(); Optional
      let userDetails = firebase.auth().currentUser;
      
      //console.log(user.updateProfile());
      userDetails.updateProfile({
          displayName: disp,
          photoURL: null
      }).then(function() {
        firebase.auth().currentUser.getIdToken(true);
        
        // Update successful.
      }, function(error) {
        console.log(error);
          // An error happened.
      });
      this.rou
  }, function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // [START_EXCLUDE]
      // if (errorCode == 'auth/weak-password') {
      //     alert('The password is too weak.');
      // } else {
      //     console.error(error);
      // }
      // [END_EXCLUDE]
  });
  }


  login(email, pass){
    this.returnUrl();
    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(function(user){

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });

  }


  returnUrl(){
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  // get appUser$(): Observable<User>{
  //   // return this.user$
  //     // .switchMap(user => {
  //     //   if(user){
  //     //    return this.userService.get(user.uid)
  //     //   }else{
  //     //     return Observable.of(null);
  //     //   }
  //     // })
  // }
}
