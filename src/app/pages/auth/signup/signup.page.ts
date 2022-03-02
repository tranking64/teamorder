/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { EnumerationDataService } from 'src/app/services/api/enumeration-data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  countries;
  genders;

  formattedDate = '';

  // signup data
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  cPassword = '';
  gender = '';
  country = '';
  birthDate = format(new Date(), 'yyyy-MM-dd');
  maxDate = new Date().toISOString();

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private auth: AuthService,
    private enumData: EnumerationDataService,
    private alert: AlertService,
    private loading: LoadingService,
    private toast: ToastService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getCountries();
    this.getGenders();
  }

  getBack() {
    this.navCtrl.back();
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
    // check if everything is filled
    if (this.firstName === '' || this.lastName === '' || this.email === '' || this.password === '' ||
        this.cPassword === '' || this.gender === '' || this.country === '' || this.formattedDate === '') {
          this.alert.presentSimpleAlert('Bitte fülle alle Eingabefelder aus!');
        }

    // check for valid email
    else if (!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alert.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }

    else if (this.password.length < 8 && this.cPassword.length < 8) {
      this.alert.presentSimpleAlert('Passwörter müssen mindestens 8 Zeichen haben!');
    }

    // check if passwords match
    else if (this.password !== this.cPassword) {
      this.alert.presentSimpleAlert('Die eingegebenen Passwörter stimmen nicht überrein!');
    }

    // passed all tests
    else {
      this.loading.presentLoading();

      this.auth.signup(this.firstName, this.lastName, this.birthDate,
        this.email, this.password, this.country, this.gender)
        .subscribe(
          data => {
            this.loading.dismissLoading();
            this.router.navigate(['/login']);
            this.toast.presentSimpleToast('Konto wurde erfolgreich erstellt. Du erhaltest in Kürze eine Verifizierungsmail!');
          },
          error => {
            this.loading.dismissLoading();

            if (error.error.status === 'email') {
              this.alert.presentSimpleAlert('Diese E-Mail-Adresse ist bereits vergeben!');
            }
            else {
              // check http code and handle error
              // but actually should never happen except the server is down
              this.alert.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

  getCountries = () => this.enumData.fetchCountries().subscribe(
    (data) => this.countries = data.data
  );

  getGenders = () => this.enumData.fetchGenders().subscribe(
    (data) => this.genders = data.data
  );

  // Example: HELLO WORLD --> Hello World
  toTitleCase = (phrase) =>
    phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

}
