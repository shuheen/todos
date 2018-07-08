import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseApp } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  constructor(private db: AngularFireDatabase, private app: FirebaseApp) { }

  addTodo(value, userId) {
    let uid = userId;
    const database = this.app.database().ref();
    const cat = database.child('todos').push({
      title: value,
      status: 'Incomplete',
      priority: 'Low',
      userId: uid
    });
  }

  getAll(){
    return this.db.list('/todos');
  }
}
