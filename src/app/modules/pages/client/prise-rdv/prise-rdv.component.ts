import { Component, OnInit } from "@angular/core";
import { SalonService } from "src/app/modules/services/salon/salon.service";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { UserService } from "src/app/modules/services/user/user.service";
import { RdvService } from "src/app/modules/services/rdv/rdv.service";
import { Router } from "@angular/router";
import { PreferenceService } from 'src/app/modules/services/preference/preference.service';

@Component({
  selector: "app-prise-rdv",
  templateUrl: "./prise-rdv.component.html",
  styleUrls: ["./prise-rdv.component.css"],
})
export class PriseRdvComponent implements OnInit {
  user: any = [];
  services: any[] = [];
  listChoixServices: any[] = [];
  listEmployer: any[] = [];

  prefEmployer: any = {
  id_client: "",
  id_employer: { nom: "", prenom: "" },
  nombre_rdv: 0
};
  prefService: any = {
  id_client: "",
  id_service: { titre: "", prix: "" },
  nombre_rdv: 0
  };

  preferencesData = {
    preferences: [
      {
        _id: '',
        id_client: {
          _id: '',
          nom: '',
          prenom: '',
        },
        id_employer: {
          _id: "",
          nom: "",
          prenom: "",
        },
      },
    ],
    preferencesService: [
      {
        _id: '',
        id_client: {
          nom: '',
          prenom: '',
        },
        id_service: {
          _id: "",
          titre: "",
          prix: "",
        },
      },
    ],
  };

  selectedEmployerId: string = "";
  selectedDate: string = "";
  selectedDatePref: string = "";

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;

  constructor(
    private salonService: SalonService,
    private userService: UserService,
    private rdvService: RdvService,
    private preferenceService: PreferenceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getServices();
    this.getListEmployer();
    this.getPreferenceServiceById();
    this.getPreferenceEmployerById();
    this.getPreferenceById()
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
      const userId = currentUser;

      const idIndividuEmpl = this.selectedEmployerId;
      const dateHeure = this.selectedDate;
      const etat = "Planifié";
      const services = this.listChoixServices.map((service) => service._id);

      const rdvData = {
        id_individu_client: userId.individu._id,
        id_individu_empl: idIndividuEmpl,
        date_heure: dateHeure,
        etat: etat,
        services: services,
      };
      // console.log("====>", rdvData);

      this.rdvService.insererRdvEtServices(rdvData).subscribe(
        (response) => {
          console.log('Rendez-vous et services enregistrés avec succès');
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);

          this.selectedEmployerId = '';
          this.selectedDate = '';
          this.listChoixServices = [];

          this.router.navigate(['/list-rdv']);
        },
        (error) => {
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
          console.error('Erreur lors de l\'enregistrement du rendez-vous et des services', error);
        }
      );
    }
  }

  /////////////////// preference 

  getPreferenceEmployerById() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
        this.preferenceService.getPreferenceEmplById(this.user.individu._id).subscribe((res) => {
          this.prefEmployer = res as any;
          console.log("employer preferer",this.prefEmployer);
        })
  }
  }

  getPreferenceServiceById() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.preferenceService.getPreferenceServiceById(this.user.individu._id).subscribe((res) => {
        this.prefService = res as any;
        console.log("sevice preferer",this.prefService);
    })
  }
  }

  getPreferenceById() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
      this.preferenceService.getPreferenceById(this.user.individu._id).subscribe((res) => {
        this.preferencesData = res as any;
        console.log(" preferaka",this.preferencesData);
    })
  }
  }

  ajoutPreferenceRdv(): void {
    const currentUserString = localStorage.getItem("currentUser");
  
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const userId = currentUser;
  
      const dateHeure = this.selectedDatePref;
      const etat = "Planifié";
  
      this.preferenceService.getPreferenceById(userId.individu._id).subscribe((res) => {
        this.preferencesData = res as any;
  
        if (this.preferencesData && this.preferencesData.preferences && this.preferencesData.preferences.length > 0 &&
            this.preferencesData.preferencesService && this.preferencesData.preferencesService.length > 0) {
  
          const idEmploye = this.preferencesData.preferences[0].id_employer._id || '';
          const idService = this.preferencesData.preferencesService[0].id_service._id || '';
  
          const rdvData = {
            id_individu_client: userId.individu._id,
            id_individu_empl: idEmploye,
            date_heure: dateHeure,
            etat: etat,
            services: [idService], // Assurez-vous que services est un tableau
          };
  
          console.log("====>", rdvData);
  
          this.rdvService.insererPreferenceRdv(rdvData).subscribe(
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
        } else {
          console.error('Données de préférence incomplètes ou incorrectes');
        }
      });
    }
  }
}
