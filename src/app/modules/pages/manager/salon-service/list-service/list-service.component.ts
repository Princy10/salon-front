import { Component, OnInit } from "@angular/core";
import { SalonService } from "src/app/modules/services/salon/salon.service";
import { io, Socket } from "socket.io-client";
import { NgxSpinnerService } from 'ngx-spinner';
import { environments } from 'src/environments/environments';

@Component({
  selector: "app-list-service",
  templateUrl: "./list-service.component.html",
  styleUrls: ["./list-service.component.css"],
})
export class ListServiceComponent implements OnInit {
  services: any[] = [];
  serviceById: any = {
    titre: "",
    prix: "",
    durer: "",
    commission: "",
  };
  socket!: Socket;

  currentPage = 1;
  itemsPerPage = 5;
  filterString = "";

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(private salonService: SalonService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getServices();
    this.socket = io(environments.BASE_URL);
    this.socket.on("updateServiceById", () => {
      this.getServices();
    });

    this.socket.on("deleteServiceById", () => {
      this.getServices();
    });
  }

  getServices(): void {
    this.spinner.show('spinR');
    this.salonService.getServices().subscribe(
      (data) => {
        this.services = data;
        console.log(data);
        this.spinner.hide('spinR');
      },
      (error) => {
        console.error(error);
        this.spinner.hide('spinR');
      }
    );
  }

  getServiceById(id_service: string) {
    this.salonService.getServiceById(id_service).subscribe((res) => {
      this.serviceById = res as any;
      // console.log("service by id =>"+this.serviceById._id);
    });
  }

  getFilteredServices(): any[] {
    return this.services.filter((service) =>
        service.titre.toLowerCase().includes(this.filterString.toLowerCase()) ||
        service.prix.toString().toLowerCase().includes(this.filterString.toLowerCase()) ||
        service.durer.toString().toLowerCase().includes(this.filterString.toLowerCase())
    );
  }

  getPaginatedServices(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.getFilteredServices().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  updateServiceById(id_service: string) {
    // console.log("ao am update =>"+id_service);
    this.salonService.updateService(id_service, this.serviceById).subscribe(
      () => {
        this.socket.emit("updateServiceById");
        this.services.forEach((service, i) => {
          if (service._id === id_service) {
            this.services[i] = this.serviceById;
          }
        });
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }

  deleteServiceById(id_service: string) {
    this.salonService.deleteService(id_service).subscribe(
      (res) => {
        // console.log("Service supprimé avec succès :", res);
        this.socket.emit("deleteServiceById");
        this.services = this.services.filter(
          (service) => service._id !== id_service
        );
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      },
      (error) => {
        console.error("Erreur lors de la suppression du service :", error);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 10000);
      }
    );
  }
}
