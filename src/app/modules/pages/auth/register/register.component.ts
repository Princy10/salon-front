import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(private userService: UserService,  private router: Router, private spinner: NgxSpinnerService) {}

  register() {
    this.spinner.show('spinR');
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès : ', response);

        this.spinner.hide('spinR');
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);

        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('login error');
        console.error(error);

        this.spinner.hide('spinR');
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }

  updateDateOfBirth(event: any) {
    this.user.date_naissance = event.target.value;
  }
}
