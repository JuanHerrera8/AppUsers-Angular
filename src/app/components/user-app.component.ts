import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {
  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.removeUser();
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe((user: User) => {
      if (user.id > 0) {
        this.users = this.users.map((u) =>
          u.id === user.id ? { ...user } : u
        );
      } else {
        this.users = [...this.users, { ...user, id: new Date().getTime() }];
      }
      this.router.navigate(['/users'], {state: {users: this.users}});
      Swal.fire({
        title: 'Guardado!',
        text: 'Usuario Creado con Exito!',
        icon: 'success',
      });
    });
  }

  removeUser() {
    this.sharingData.idUserEventEmitter.subscribe((id: number) => {

      Swal.fire({
        title: 'Estas seguro?',
        text: 'No puedes revertir este cambio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter((user) => user.id !== id);
          this.router.navigate(['/users/create'], {skipLocationChange: true}).then(() => {
            this.router.navigate(['/users'], {state: {users: this.users}});
          });


          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      });
    });
  }
  
}
