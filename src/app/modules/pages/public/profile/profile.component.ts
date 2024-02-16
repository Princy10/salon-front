import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/modules/services/user/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  new_password: string = "";

  ngOnInit(): void {
    this.getInfoUser();
  }

  constructor(private userService: UserService) {}

  getInfoUser() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      this.user = userData;
    }
  }

  updateUser() {
    const data = {
      id: this.user._id, 
      username: this.user.username,
      currentPassword: this.user.password,
      newPassword: this.new_password,
      
      nom: this.user.individu.nom,
      prenom: this.user.individu.prenom,
      mail: this.user.individu.mail,
      date_naissance: this.user.individu.date_naissance,
      cin: this.user.individu.cin,
      adresse: this.user.individu.adresse,
      contact: this.user.individu.contact
    };
    console.log(data);
    
    this.userService.updateUser(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
