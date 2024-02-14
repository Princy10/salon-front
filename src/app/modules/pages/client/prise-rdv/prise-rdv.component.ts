import { Component, OnInit } from "@angular/core";
import { SalonService } from "src/app/modules/services/salon/salon.service";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { UserService } from "src/app/modules/services/user/user.service";
import { RdvService } from "src/app/modules/services/rdv/rdv.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-prise-rdv",
  templateUrl: "./prise-rdv.component.html",
  styleUrls: ["./prise-rdv.component.css"],
})
export class PriseRdvComponent implements OnInit {
  services: any[] = [];
  listChoixServices: any[] = [];
  listEmployer: any[] = [];

  selectedEmployerId: string = "";
  selectedDate: string = "";

  constructor(
    private salonService: SalonService,
    private userService: UserService,
    private rdvService: RdvService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getServices();
    this.getListEmployer();
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

  getListEmployer(): void {
    this.userService.getListEmployer().subscribe(
      (data) => {
        this.listEmployer = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // console.log("services ty =>", this.services);
    // console.log("choix services ty =>", this.listChoixServices);
  }

  sendRdvAndServices(): void {
    const currentUserString = localStorage.getItem("currentUser");

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const userId = currentUser._id;

      const idIndividuEmpl = this.selectedEmployerId;
      const dateHeure = this.selectedDate;
      const etat = "Planifié";
      const services = this.listChoixServices.map((service) => service._id);

      const rdvData = {
        id_individu_client: userId,
        id_individu_empl: idIndividuEmpl,
        date_heure: dateHeure,
        etat: etat,
        services: services,
      };
      // console.log("====>", rdvData);

      this.rdvService.insererRdvEtServices(rdvData).subscribe(
        (response) => {
          console.log('Rendez-vous et services enregistrés avec succès');
  
          this.selectedEmployerId = '';
          this.selectedDate = '';
          this.listChoixServices = [];

          this.router.navigate(['/historique']);
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du rendez-vous et des services', error);
        }
      );
    }
  }
}
