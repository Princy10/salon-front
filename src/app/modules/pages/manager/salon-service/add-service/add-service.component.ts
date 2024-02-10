import { Component } from '@angular/core';
import { SalonService } from 'src/app/modules/services/salon/salon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  //services: any[] = []
  serviceData = {
    titre: '',
    prix: 0,
    durer: 0,
    commission: 0
  };

  constructor(
    private serciceSalon: SalonService,
    private router: Router) {}

  ajout_service() {
    this.serciceSalon.createService(this.serviceData).subscribe(response => {
      console.log('Insertion réussie', response);
      this.router.navigate(['/list-service']);
    }, error => {
      console.error('Erreur lors de l\'insertion', error);
    });
  }

}