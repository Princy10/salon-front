import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(
      (user) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('id', user._id);
        console.log('login successful');
        
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('login error');
        console.error(error);
      }
    );
  }
}