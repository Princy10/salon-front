import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private userService: UserService, private router: Router) {}

  logoutCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token non trouvé dans le stockage local');
      return;
    }
    this.userService.logout(token).subscribe(
      () => {
        console.log("Déconnexion réussie");
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }
}
