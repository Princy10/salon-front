import { Component } from '@angular/core';
import { Services } from 'src/app/modules/models/services';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceSalonService } from 'src/app/modules/services/service_salon/service-salon.service';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent {

  service: Services = {
    _id: '',
    titre: '',
    prix: 0,
    durer: 0,
    commission: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceSalonService: ServiceSalonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id']; // Assurez-vous que 'id' est le même nom que celui spécifié dans votre route
      console.log('Service ID:', serviceId); // Vérifiez ici que serviceId n'est pas undefined
      if (serviceId) {
        this.getServiceDetails(serviceId);
      } else {
        console.error('Identifiant du service non trouvé dans l\'URL');
      }
    });
  }

  getServiceDetails(serviceId: string) {
    this.serviceSalonService.getById_service(serviceId).subscribe(service => {
      this.service = service;
    }, error => {
      console.error('Erreur lors de la récupération des détails du service', error);
    });
  }

  updateService() {
    this.serviceSalonService.updateService(this.service._id, this.service).subscribe(() => {
      console.log('Service mis à jour avec succès');
      this.router.navigate(['/liste_service']); // Rediriger vers la liste des services après la mise à jour
    }, error => {
      console.error('Erreur lors de la mise à jour du service', error);
    });
  }



}
