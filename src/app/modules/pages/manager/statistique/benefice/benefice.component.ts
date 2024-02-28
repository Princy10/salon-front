import { Component, OnInit } from "@angular/core";
import { StatService } from "src/app/modules/services/statistique/stat.service";
import Chart from "chart.js/auto";

@Component({
  selector: "app-benefice",
  templateUrl: "./benefice.component.html",
  styleUrls: ["./benefice.component.css"],
})
export class BeneficeComponent implements OnInit {
  monthlyCredit: any;
  monthlyDebit: any;

  constructor(private statService: StatService) {}

  ngOnInit(): void {
    this.getStatBenefice();
  }

  getStatBenefice() {
    this.statService.getStatBenefice().subscribe((data: any) => {
      this.monthlyCredit = data.monthlyCreditStats;
      this.monthlyDebit = data.monthlyDebitStats;
      // console.log(this.monthlyCredit + "  " + this.monthlyDebit);
      this.renderChart();
    });
  }

  renderChart() {
    if (!this.monthlyCredit || !this.monthlyDebit) {
      console.error("Monthly credit or debit data is not available.");
      return;
    }

    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    const creditData = this.monthlyCredit.map((stat: any) => stat.totalCredit);
    const debitData = this.monthlyDebit.map((stat: any) => stat.totalDebit);
    const netData = creditData.map(
      (value: number, index: number) => value - debitData[index]
    );

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.monthlyCredit.map(
          (stat: any) => `${stat._id.month}/${stat._id.year}`
        ),
        datasets: [
          {
            label: "Crédit",
            data: creditData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Débit",
            data: debitData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Resultat",
            data: netData,
            type: "line",
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
