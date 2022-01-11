import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formattedDate = '';

  // signup data
  firstName: string;
  lastName: string;
  email: string;
  password = '';
  cPassword = '';
  gender: string;
  country: string;
  birthDate = format(new Date(), 'yyyy-MM-dd');

  constructor(private alertCtrl: AlertController, private service: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async presentInvalidInputAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Ungültige Eingabe!',
      message: 'Einer deiner Eingaben ist ungültig. Bitte überprüfe diese!',
      buttons: ['OK']
    });

    await alert.present();
  }

  dateChanged(value) {
    this.birthDate = value;
    this.formattedDate = format(parseISO(value), 'dd MMM yyyy');
  }

  create() {
    if(this.password === this.cPassword && this.password !== '' && this.cPassword !== '') {
      this.service.signup(this.firstName, this.lastName, this.birthDate,
        this.email, this.password, this.country, this.gender)
        .subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/login']);
            // show Toast
          },
          (error) => {
            console.log(error);
          }
        );
    }
    else {
      this.presentInvalidInputAlert();
    }
  }

}
