import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};

  constructor(private userService: UserService) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès : ', response);
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisateur : ', error);
      }
    );
  }
}
