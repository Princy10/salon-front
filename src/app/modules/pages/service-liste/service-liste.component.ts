import { Component } from '@angular/core';
import { Services } from 'src/app/modules/models/services';
import { ServiceSalonService } from 'src/app/modules/services/service_salon/service-salon.service';

@Component({
  selector: 'app-service-liste',
  templateUrl: './service-liste.component.html',
  styleUrls: ['./service-liste.component.css']
})
export class ServiceListeComponent {
  services: Services[] = [];

  constructor(private serviceSalonService: ServiceSalonService) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices() {
    this.serviceSalonService.list_service().subscribe(services => {
      this.services = services;
    }, error => {
      console.error('Erreur lors de la récupération des services', error);
    });
  }

  deleteService(serviceId: string) {
    this.serviceSalonService.delete_service(serviceId).subscribe(() => {
      console.log('Service supprimé avec succès');
      // Réactualiser la liste des services ou effectuer d'autres actions si nécessaire
      this.getAllServices();
    }, error => {
      console.error('Erreur lors de la suppression du service', error);
    });
  }

}
