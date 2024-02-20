import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/services/user/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/services/notification/notification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: any;
  notif: any[] = [];
  notifById: any = {};

  constructor(private userService: UserService, private router: Router, private notifService: NotificationService) {}

  ngOnInit(): void {
    this.getNotif();
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.user = JSON.parse(currentUser);
    }
  }

  logoutCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token non trouvé dans le stockage local');
      return;
    }
    this.userService.logout(token).subscribe(
      () => {
        console.log("Déconnexion réussie");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    );
  }

 getNotif(): void {
    this.notifService.getNotification().subscribe(
      (data) => {
        this.notif = data;
        this.notif.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getNotifById(id_notif: string) {
    this.notifService.getNotifById(id_notif).subscribe((res) => {
      this.notifById = res as any;
      this.router.navigate(['/notification-detail', this.notifById._id]);
    })
  }
}