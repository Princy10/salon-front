import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/modules/services/statistique/stat.service';
import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-temps-moyen-travail',
  templateUrl: './temps-moyen-travail.component.html',
  styleUrls: ['./temps-moyen-travail.component.css']
})
export class TempsMoyenTravailComponent implements OnInit {
  travauxData: any[] = [];
  showDetails: boolean = false;

  constructor(private statService: StatService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.spinner.show('spinR');
    this.statService.getStatMoyenTravail().subscribe(data => {
      this.travauxData = data;
      this.createChart(data);
      this.spinner.hide('spinR');
    });
  }
  createChart(data: any): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item: any) => item.nom + ' ' + item.prenom),
        datasets: [{
          label: 'Temps moyen de travail (en minutes)',
          data: data.map((item: any) => item.tempsMoyen),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}