import { Component, OnInit, Injectable } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { TodoService } from './../services/todo.service';
import { Todos } from './../model/todos';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import { formatDate } from '@angular/common';
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
  thisKey;
  thisTodo;
  thisFullDueDate;
    constructor( private auth: AuthService, private todoService: TodoService){
      
    }

    async ngOnInit(){
      await this.auth.user$.subscribe(user=>this.userId = user.uid)
      // this.todos$ = await this.todoService.getAllByUser(this.userId).valueChanges();
      // //await this.todos$.subscribe(todo=>this.todo = todo);
      // this.uid = await this.todoService.getAll();
      var x = this.todoService.getAllByUser(this.userId);
      x.snapshotChanges().subscribe(todo => {
        this.todoList = [];
        todo.forEach(element => {
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

    getTodoDetials(key:string){
      this.todoService.getTodoById(key).valueChanges().subscribe(t=>{
        this.thisTodo=t;
        function amPm(dueHour){
          if(dueHour < 12){
            return "AM"
          }else{
            return "PM"
          }
        }
        let dueYear = new Date(this.thisTodo.dueAt).getFullYear();
        let dueMonth = new Date(this.thisTodo.dueAt).getMonth();
        let dueDate = new Date(this.thisTodo.dueAt).getDate();
        let dueHour = new Date(this.thisTodo.dueAt).getHours();
        let dueMinutes = new Date(this.thisTodo.dueAt).getMinutes();
        let dueSeconds = new Date(this.thisTodo.dueAt).getSeconds();
        let dueAmPm = amPm(dueHour);
        this.thisFullDueDate = new Date(dueYear, dueMonth, dueDate, dueHour, dueMinutes);
        this.thisKey = key;
      });
      
      this._toggleSidebar();
    }

    updateTodo(values)
    {
       this.todoService.updateTodo(values);
       this._toggleSidebar();
      // console.log(new Date(values.todoDueDate).getTime())
    }
   
    private _showSide: boolean = false;
 
    private _toggleSidebar() {
      this._showSide = !this._showSide;
    }

    closeSideNav(){
      this._toggleSidebar();
    }

  }
