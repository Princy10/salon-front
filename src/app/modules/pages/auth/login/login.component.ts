import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  showAlert: boolean = false;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.username = "manager";
    this.password = "admin"
  }
  login() {
    this.loading = true;
    this.userService.login(this.username, this.password).subscribe(
      (user) => {
        localStorage.setItem('token', user.token);
        console.log('login successful');
        
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('login error');
        console.error(error);

        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      () => {
        this.loading = false;
      }
    );
  }
}