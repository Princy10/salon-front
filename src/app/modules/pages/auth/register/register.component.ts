import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(private userService: UserService,  private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès : ', response);

        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);

        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('login error');
        console.error(error);

        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }
}
