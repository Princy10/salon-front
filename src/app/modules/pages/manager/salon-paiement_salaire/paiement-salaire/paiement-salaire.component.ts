import { Component } from '@angular/core';
import { JournalCaisseService } from 'src/app/modules/services/journal_caisse/journal-caisse.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paiement-salaire',
  templateUrl: './paiement-salaire.component.html',
  styleUrls: ['./paiement-salaire.component.css']
})
export class PaiementSalaireComponent {

  montant: string = '';
  employer: string= '';
  listEmployer: any[] = [];

  showAlert: boolean = false;
  showSuccessAlert: boolean = false;
  
  constructor(
   private journalCaisseService: JournalCaisseService,
   private userService: UserService,
   private router: Router,
   private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getListEmployer();
  }

  getListEmployer(): void {
    this.spinner.show('spinR');
    this.userService.getListEmployer().subscribe(
      (data) => {
        this.listEmployer = data;
        this.spinner.hide('spinR');
      },
      (error) => {
        console.error(error);
        this.spinner.hide('spinR');
      }
    );
  }

  PaiementSalaire(): void {

      const montant = this.montant;
      const id_employer = this.employer;


      const depenseData = {
        id_individu: id_employer,
        type_mouvement: 'Débit',
        date_heure: new Date(),
        montant: montant,
        libeller_journal: 'paiment salaire employer',
      };

      this.journalCaisseService.paiementSalaire(depenseData).subscribe(
        (response) => {
          console.log('salaire payer avec succes ');
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
          this.router.navigate(['/list-journal']);
        },
        (error) => {
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 10000);
          console.error('salaire erreur', error);
        }
      );
    
  }

}
