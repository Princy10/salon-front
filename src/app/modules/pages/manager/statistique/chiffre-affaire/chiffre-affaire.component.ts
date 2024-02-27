import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/modules/services/statistique/stat.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styleUrls: ['./chiffre-affaire.component.css']
})
export class ChiffreAffaireComponent implements OnInit {

  constructor(private statService: StatService) {}

  statChiffreAffaires: any;
  displayMode: 'daily' | 'monthly' = 'daily';

  ngOnInit(): void {
    this.getStatChiffreAffaires();
  }

  getStatChiffreAffaires() {
    this.statService.getStatChiffreAffaire().subscribe((data: any) => {
      this.statChiffreAffaires = data;
      this.renderChart(data);
    });
  }

  toggleDisplayMode() {
    this.displayMode = this.displayMode === 'daily' ? 'monthly' : 'daily';
    this.renderChart(this.statChiffreAffaires);
  }

  renderChart(data: any) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let labels: string[] = [];
    let values: number[] = [];
  
    if (this.displayMode === 'monthly') {
      const monthlyStatsByMonth: { [key: string]: number } = {};
  
      data.monthlyStats.forEach((stat: any) => {
        const monthYear = `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}`;
        monthlyStatsByMonth[monthYear] = 0;
      });
  
      data.dailyStats.forEach((stat: any) => {
        const monthYear = `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}`;
        monthlyStatsByMonth[monthYear] += stat.totalAmount;
      });
  
      labels = Object.keys(monthlyStatsByMonth);
      values = Object.values(monthlyStatsByMonth);
    } else {
      labels = data.dailyStats.map((stat: any) => `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}-${stat._id.day.toString().padStart(2, '0')}`);
      values = data.dailyStats.map((stat: any) => stat.totalAmount);
    }
  
    Chart.getChart(ctx)?.destroy();
  
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Chiffre d\'affaires',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
}