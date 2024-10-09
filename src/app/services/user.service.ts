import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { last, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [{
    id: 1,
    name: 'John',
    lastname: 'Doe',
    email: 'John@gmail.com',
    username: 'johndoe',
    password: '123456'
  },

  {
    id: 2,
    name: 'Jane',
    lastname: 'Doe',
    email: 'Jane@gmail.com',
    username: 'janedoe',
    password: '123456'
  }
  ];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
