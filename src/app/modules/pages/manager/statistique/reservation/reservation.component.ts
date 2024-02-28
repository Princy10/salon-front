import { Component, OnInit } from '@angular/core';
import { StatService } from 'src/app/modules/services/statistique/stat.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  constructor(private statService: StatService) {}

  statReserv: any;
  displayMode: 'daily' | 'monthly' = 'daily';

  ngOnInit(): void {
    this.getStatReservation();
  }

  getStatReservation() {
    this.statService.getStatReservation().subscribe((data: any) => {
      this.statReserv = data;
      this.renderChart(data);
    });
  }

  toggleDisplayMode() {
    this.displayMode = this.displayMode === 'daily' ? 'monthly' : 'daily';
    this.renderChart(this.statReserv);
  }

  renderChart(data: any) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let labels: string[] = [];
    let values: number[] = [];
  
    if (this.displayMode === 'monthly') {
      const monthlyStatsByMonth: { [key: string]: number } = {};
  
      data.monthlyStats.forEach((stat: any) => {
        const monthYear = `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}`;
        monthlyStatsByMonth[monthYear] = stat.count;
      });
  
      labels = Object.keys(monthlyStatsByMonth);
      values = Object.values(monthlyStatsByMonth);
    } else {
      const dailyStatsByDate: { [key: string]: number } = {};
  
      data.dailyStats.forEach((stat: any) => {
        const date = `${stat._id.year}-${stat._id.month.toString().padStart(2, '0')}-${stat._id.day.toString().padStart(2, '0')}`;
        dailyStatsByDate[date] = stat.count;
      });
  
      labels = Object.keys(dailyStatsByDate);
      values = Object.values(dailyStatsByDate);
    }
  
    Chart.getChart(ctx)?.destroy();
  
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de réservations',
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