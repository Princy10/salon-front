import { Component, OnInit } from "@angular/core";
import { SalonService } from "src/app/modules/services/salon/salon.service";
import { io, Socket } from "socket.io-client";
//import * as $ from 'jquery';

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
  itemsPerPage = 3;
  filterString = "";

  constructor(private salonService: SalonService) {}

  ngOnInit(): void {
    this.getServices();
    this.socket = io("http://localhost:3000");
    this.socket.on("updateServiceById", () => {
      this.getServices();
    });

    this.socket.on("deleteServiceById", () => {
      this.getServices();
    });
  }

  getServices(): void {
    this.salonService.getServices().subscribe(
      (data) => {
        this.services = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
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
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du service :", error);
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
      },
      (error) => {
        console.error("Erreur lors de la suppression du service :", error);
      }
    );
  }
}
