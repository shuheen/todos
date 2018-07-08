import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CalendarComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    MyProfileComponent,
    ManageProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    CustomFormsModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,


    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      [
        {
          path: '', component: SigninComponent,
        },
        {
          path: 'signup', component: SignupComponent
        },
        {
          path: 'todos', component: TodosComponent, canActivate:[AuthGuardService]
        },
        {
          path: 'calendar', component: CalendarComponent, canActivate:[AuthGuardService]
        },
        {
          path: 'my-profile', component: MyProfileComponent, canActivate:[AuthGuardService]
        },
        {
          path: 'manage-profile', component: ManageProfileComponent, canActivate:[AuthGuardService, AdminAuthGuardService]
        }
      ]
    )
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    AdminAuthGuardService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
