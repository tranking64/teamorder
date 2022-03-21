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
    private router: Router,
    private authService: AuthService,
    private enumDataService: EnumerationDataService,
    private alertHelper: AlertService,
    private loadingHelper: LoadingService,
    private toastHelper: ToastService,
    private navCtrl: NavController) { }

  // fetching data for selections
  ngOnInit() {
    this.getCountries();
    this.getGenders();
  }

  getBack() {
    this.navCtrl.back();
  }

  // triggered when the date value is changed in the picker
  dateChanged(value) {
    this.birthDate = value;
    this.formattedDate = format(parseISO(value), 'dd MMM yyyy');
  }

  create() {
    // check if every field input is filled
    if (this.firstName === '' || this.lastName === '' || this.email === '' || this.password === '' ||
        this.cPassword === '' || this.gender === '' || this.country === '' || this.formattedDate === '') {
          this.alertHelper.presentSimpleAlert('Bitte fülle alle Eingabefelder aus!');
        }

    // check for valid email by using regex
    else if (!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alertHelper.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }

    // to pass backend password min length error
    else if (this.password.length < 8 && this.cPassword.length < 8) {
      this.alertHelper.presentSimpleAlert('Passwörter müssen mindestens 8 Zeichen haben!');
    }

    // check if passwords match
    else if (this.password !== this.cPassword) {
      this.alertHelper.presentSimpleAlert('Die eingegebenen Passwörter stimmen nicht überrein!');
    }

    // passed all tests
    else {
      // showing a loading indicator, so that the user knows that the app is working
      this.loadingHelper.presentLoading();

      this.authService.signup(this.firstName, this.lastName, this.birthDate,
        this.email, this.password, this.country, this.gender)
        .subscribe(
          data => {
            // remove the loading indicator, since http req. is done
            this.loadingHelper.dismissLoading();
            this.router.navigate(['/login']);
            this.toastHelper.presentSimpleToast('Konto wurde erfolgreich erstellt. Du erhaltest in Kürze eine Verifizierungsmail!');
          },
          // catch an http error
          error => {
            this.loadingHelper.dismissLoading();

            if (error.error.status === 'email') {
              this.alertHelper.presentSimpleAlert('Diese E-Mail-Adresse ist bereits vergeben!');
            }
            // in case any other unknown error occurs
            else {
              this.alertHelper.presentSimpleAlert(error.error.message);
            }
          }
        );
    }
  }

  getCountries = () => this.enumDataService.fetchCountries().subscribe(
    (data) => this.countries = data.data
  );

  getGenders = () => this.enumDataService.fetchGenders().subscribe(
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
