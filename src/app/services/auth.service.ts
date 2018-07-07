import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from './../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private route: Router, private router: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }


  signup(email, pass, disp) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then(function (user) {
      let userDetails = firebase.auth().currentUser;
      userDetails.updateProfile({
        displayName: disp,
        photoURL: null
      }).then(function () {
        firebase.auth().currentUser.getIdToken(true);
      }, function (error) {
        console.log(error);
      });
      this.rou
    }, function (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }


  login(email, pass) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(function (user) {

    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });

  }


  // returnUrl(){
  //   let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);
  // }

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

  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['/'])
  }
}
