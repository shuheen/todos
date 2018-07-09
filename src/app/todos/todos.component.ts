import { Component, OnInit, Injectable, text } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { TodoService } from './../services/todo.service';
import { Todos } from './../model/todos';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
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
  todoList:Todos[];
  userId;
  uid;
    constructor( private auth: AuthService, private todoService: TodoService){
      
    }

    async ngOnInit(){
      await this.auth.user$.subscribe(user=>this.userId = user.uid)
      // this.todos$ = await this.todoService.getAllByUser(this.userId).valueChanges();
      // //await this.todos$.subscribe(todo=>this.todo = todo);
      // this.uid = await this.todoService.getAll();
      var x = this.todoService.getAllByUser(this.userId);
      x.snapshotChanges().subscribe(item => {
        this.todoList = [];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["$key"] = element.key;
          this.todoList.push(y as Todos);
        });
      });
    }
  

    async saveTodo(input: HTMLInputElement){
      await this.auth.user$.subscribe(user=>this.userId = user.uid)
      this.todoService.addTodo(input.value, this.userId);
      input.value = ''; 
    }

    doneTodo(key: string) {
      if (confirm('Are you sure you want to mark this Todo as Done ?') == true) {
        this.todoService.doneTodo(key);
      }
    }

    undoTodo(key:string){
      if (confirm('Are you sure you want to Undo this Todo ?') == true) {
        this.todoService.undoTodo(key);
      }
    }


    changePriority(element, key:string){
      let btnText = element.textContent;
      //console.log(btnText);
      this.todoService.changePriority(key, btnText);
    }

  }
