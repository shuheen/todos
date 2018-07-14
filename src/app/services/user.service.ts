import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { User } from './../model/user';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor( private db: AngularFireDatabase) { }

  save(user: firebase.User){
    let adminObj = {
      email: user.email,
      displayName: user.displayName,
      isAdmin: true
    }
    let normalObj = {
      email: user.email,
      displayName: user.displayName,
    }
    if(user.email == "mail.shuaibkhan@gmail.com")
      this.db.object('/users/'+ user.uid).update(adminObj)
    else
      this.db.object('/users/' + user.uid).update(normalObj);  
  }

  get(uid:string): Observable<any>{
    return this.db.object('/users/' + uid).valueChanges();
  }
}
