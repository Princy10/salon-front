import { Component, OnInit } from '@angular/core';
import { SalonService } from 'src/app/modules/services/salon/salon.service';
import { Router } from '@angular/router';
import { io, Socket} from 'socket.io-client';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  //services: any[] = []
  serviceData = {
    titre: '',
    prix: 0,
    durer: 0,
    commission: 0,
    imageURL: ''
  };
  socket!: Socket;

  constructor(
    private serciceSalon: SalonService,
    private router: Router) {}

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    this.socket.on('addService', () => {});
  }

  ajout_service() {
    this.serciceSalon.createService(this.serviceData).subscribe(response => {
      // console.log('Insertion réussie', response);
      this.socket.emit('addService');
      this.router.navigate(['/list-service']);
    }, error => {
      console.error('Erreur lors de l\'insertion', error);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
        this.uploadImage(file);
    }
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    this.serciceSalon.uploadImage(formData).subscribe(
      (response) => {
        console.log("Image téléchargée avec succès : ", response);
        console.log("bla bla",response.imageName);
        
        this.serviceData.imageURL = response.imageName;
      },
      (error) => {
        console.error("Erreur lors du téléchargement de l'image : ", error);
      }
    );
  }
}