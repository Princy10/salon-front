import { Component } from '@angular/core';
import { NotificationService } from 'src/app/modules/services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifById: any = {
    "_id": "",
    "id_offre": {
        "_id": "",
        "id_service": {
            "_id": "",
            "titre": "",
            "prix": "",
            "durer": "",
            "commission": "",
        },
        "date_debut": "",
        "date_fin": "",
        "prix": "",
        "titre": "",
        "description": "",
    },
}

  constructor(private notifService: NotificationService, private router: ActivatedRoute, private spinner: NgxSpinnerService ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getNotifById(id);
      }
    });
  }

  getNotifById(id_notif: string) {
    this.spinner.show('spin');
    this.notifService.getNotifById(id_notif).subscribe((res) => {
      this.notifById = res as any;
      this.spinner.hide('spin');
    })
  }
}
