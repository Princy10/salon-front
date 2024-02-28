import { Component, OnInit } from '@angular/core';
import { SalonService } from 'src/app/modules/services/salon/salon.service';
import { Router } from '@angular/router';
import { io, Socket} from 'socket.io-client';
import { environments } from 'src/environments/environments';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  //services: any[] = []
  serviceData = {
    titre: '',
    prix: 0,
    durer: 0,
    commission: 0
  };
  socket!: Socket;

  constructor(
    private serciceSalon: SalonService,
    private router: Router) {}

  ngOnInit(): void {
    this.socket = io(environments.BASE_URL);
    this.socket.on('addService', () => {});
  }

  ajout_service() {
    this.serciceSalon.createService(this.serviceData).subscribe(response => {
      // console.log('Insertion réussie', response);
      this.socket.emit('addService');
      this.router.navigate(['/list-service']);
    }, error => {
      console.error('Erreur lors de l\'insertion', error);
    });
  }

}