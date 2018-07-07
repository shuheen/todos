import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { userInfo } from 'os';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private route: Router, private router: ActivatedRoute) {
    console.log(firebase.auth().currentUser);
  }


  signup(email, pass, disp){
    this.returnUrl();
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


  // this.route.navigate(['/signin']);
  this.db.list('/users').push({
    email: firebase.auth().currentUser.email,
    displayName: firebase.auth().currentUser.displayName
  })
  
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
    console.log('')
  }
}
