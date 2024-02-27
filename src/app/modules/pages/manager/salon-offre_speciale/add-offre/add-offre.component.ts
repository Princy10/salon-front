import { Component } from '@angular/core';
import { SalonService } from 'src/app/modules/services/salon/salon.service';
import { OffreSpecialeService } from 'src/app/modules/services/offre_speciale/offre-speciale.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css']
})
export class AddOffreComponent {
  services: any[] = [];
  offreData: any = {};
    


  constructor(
    private salonService: SalonService,
    private offreServicce: OffreSpecialeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getServices();
  }


  getServices(): void {
    this.salonService.getServices().subscribe(
      (data) => {
        this.services = data;
        // console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ajout_offre() {
    this.offreServicce.createOffreSpeciale(this.offreData).subscribe(response => {
      console.log('Insertion offre réussie', response);
      this.router.navigate(['/list-offre']);
    }, error => {
      console.error('Erreur lors de l\'insertion offre', error);
    });
  }

}
