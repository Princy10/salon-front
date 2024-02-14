import { Component, OnInit } from '@angular/core';
import { SalonService } from 'src/app/modules/services/salon/salon.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/modules/services/user/user.service';

@Component({
  selector: 'app-prise-rdv',
  templateUrl: './prise-rdv.component.html',
  styleUrls: ['./prise-rdv.component.css']
})
export class PriseRdvComponent implements OnInit {
  services: any[] = [];
  listChoixServices: any[] = [];

  listEmployer: any [] = []

  constructor(
    private salonService: SalonService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getServices();
    this.getListEmployer();
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

  getListEmployer(): void {
    this.userService.getListEmployer().subscribe((data) => {
      this.listEmployer = data;
    }, (error) => {
      console.error(error);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    console.log("services ty =>", this.services);
    console.log("choix services ty =>", this.listChoixServices);
  }
  
  
}
