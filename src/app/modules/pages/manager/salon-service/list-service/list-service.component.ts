import { Component, OnInit } from '@angular/core';
import { SalonService } from 'src/app/modules/services/salon/salon.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {
  services: any[] = []
  serviceIDclicked: string = ""

  constructor(private salonService: SalonService) { }

  ngOnInit(): void {
    this.getServices();
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

  updateService(serviceId: string): void {
    console.log("ok =>"+serviceId)
    this.serviceIDclicked = serviceId
    const modalElement = document.getElementById('serviceModal');
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
      }
  }
}
