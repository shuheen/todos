import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }
}
