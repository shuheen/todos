import { Component, OnInit, Injectable } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { TodoService } from './../services/todo.service';
import { Todos } from './../model/todos';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations:[
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor:'yellow', opacity: 0}),
        animate(2000, style({backgroundColor:'white', opacity: 1}))
      ])
    ])
  ]
})

export class TodosComponent implements OnInit {
  todos$: Observable<any>;
  userId;
    constructor( private auth: AuthService, private todoService: TodoService){
      // this.todos$ = this.todoService.getAll();
      // console.log(this.todos);
    }

    async ngOnInit(){
      this.todos$ = await this.todoService.getAll().valueChanges();
      // this.populateTodos();

    }
    //  populateTodos(){
    //   this.todos = this.todoService.getAll()
    // }
    async saveTodo(input: HTMLInputElement){
      await this.auth.user$.subscribe(user=>this.userId = user.uid)
      this.todoService.addTodo(input.value, this.userId);
      input.value = ''; 
    }

    // addTodo(input: HTMLInputElement) {
    //   this.todos.splice(0, 0, input.value);
    //   input.value = ''; 
    // }

}
