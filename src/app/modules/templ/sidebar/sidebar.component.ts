import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logoutCurrentUser(): void {
    const token = this.user ? this.user.token : null;
    if (!token) {
      console.error('Token non trouvé dans le stockage de session');
      return;
    }
    this.userService.logout(token).subscribe(
      () => {
        console.log("Déconnexion réussie");
        sessionStorage.removeItem('currentUser'); // Remove user data from sessionStorage on logout
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }
}