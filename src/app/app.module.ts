import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation'

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

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    CalendarComponent,
    NavigationComponent,
    SigninComponent,
    SignupComponent,
    
  ],
  imports: [
 
  BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      [
        {
          path: '', component: SigninComponent
        },
        {
          path: 'calendar', component: CalendarComponent
        },
        {
          path: 'todos', component: TodosComponent
        },
        {
          path: 'signup', component: SignupComponent
        }
      ]
    )
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
