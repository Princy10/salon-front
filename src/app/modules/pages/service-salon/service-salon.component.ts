import { Component } from '@angular/core';
import { ServiceSalonService } from 'src/app/modules/services/service_salon/service-salon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-salon',
  templateUrl: './service-salon.component.html',
  styleUrls: ['./service-salon.component.css']
})
export class ServiceSalonComponent {
  titre: string = '';
  prix!: Number;
  durer!: Number;
  commission!: Number;

  constructor(
    private serciceSalon: ServiceSalonService,
    private router: Router) {}

    ajout_service() {
      this.serciceSalon.add_service(this.titre, this.prix, this.durer, this.commission).subscribe(response => {
        console.log('Insertion réussie', response);
        this.router.navigate(['/liste_service']);
      }, error => {
        console.error('Erreur lors de l\'insertion', error);
      });
    }


}
