import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseApp } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: AngularFireList<any>;
  todoListByUser: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private app: FirebaseApp) { }

  addTodo(value, userId) {
    let uid = userId;
    const database = this.app.database().ref();
    const cat = database.child('todos').push({
      title: value,
      status: 'Incomplete',
      priority: 'Low',
      createdAt: new Date().getTime(),
      dueAt: new Date().getTime() + 120000000,
      userId: uid
    });
  }

  getAll(){
    this.todoList = this.db.list('/todos');
    return this.todoList;
  }


  getAllByUser(userId: string){
    // let ref = this.app.database().ref();
    // ref.orderByKey().endAt(userId);
    this.todoListByUser =  this.db.list('/todos', ref => ref.orderByChild('userId').equalTo(userId));
    return this.todoListByUser;
  }

  
  doneTodo(key){
    this.db.object('/todos/'+ key).update({
      status: 'Completed'
    });
  }
  undoTodo(key){
    this.db.object('/todos/'+ key).update({
      status: 'Incomplete'
    });
  }

  changePriority(key, value){
    this.db.object('/todos/'+ key).update({
      priority: value
    });
  }

  getTodoById(key){
    return this.db.object('/todos/'+ key)
  }

  updateTodo(val){
   // console.log(val.todoDueDate);
    let dueTime = new Date(val.todoDueDate).getTime();
     this.db.object('/todos/'+ val.hiddenKey).update({
       title: val.todoTitle,
       priority: val.todoPriority,
       dueAt: dueTime
     });
  }
}
