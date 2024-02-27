import { Component } from '@angular/core';
import { JournalCaisseService } from 'src/app/modules/services/journal_caisse/journal-caisse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-journal-caisse',
  templateUrl: './list-journal-caisse.component.html',
  styleUrls: ['./list-journal-caisse.component.css']
})
export class ListJournalCaisseComponent {
  journalCaisse: any[] = []
  datedebut: string = "";
  datefin: string = "";

  totalDepense: string = "";
  totalGain: string = "";
  beneficePerte: string = "";

  rechercheEnCours: boolean = false;

  constructor(
    private journalCaisseService: JournalCaisseService,
    private router: Router,
   ) {}

   ngOnInit(): void {
    this.getAllJournal();
  }

  getAllJournal(): void {
    this.journalCaisseService.getJournalCaisse().subscribe(
      (data) => {
        this.journalCaisse = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  formatDate(date: any): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
}


calculerBeneficePerte(): void {
  this.rechercheEnCours = true;
  this.journalCaisseService.BeneficePerte(this.datedebut, this.datefin)
      .subscribe(data => {
          this.totalDepense = data.totalDepense;
          this.totalGain = data.totalGain;
          this.beneficePerte = data.beneficePerte;
      }, error => {
          console.error(error);
      });
}
}
