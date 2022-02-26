import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { SettingsService } from 'src/app/services/api/settings.service';
import { Storage } from '@capacitor/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { EnumerationDataService } from 'src/app/services/api/enumeration-data.service';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  countries;
  genders;

  formattedDate = '';

  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  birthDate = format(new Date(), 'yyyy-MM-dd');

  constructor(
    private settings: SettingsService,
    private router: Router,
    private loading: LoadingService,
    private enumData: EnumerationDataService,
    private alert: AlertService,
    private toast: ToastService,
    private navCtrl: NavController) { }

  ionViewWillEnter() {
    this.loading.presentLoading();
    this.getInitialData();
  }

  getBack() {
    this.navCtrl.back();
  }

  toTitleCase = (phrase) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // set current user data, for form
  async getInitialData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.enumData.fetchCountries().subscribe(
      data => this.countries = data.data
    );

    this.enumData.fetchGenders().subscribe(
      (data) => this.genders = data.data
    );

    this.settings.getCurrUserData(accessToken.value)
      .subscribe(
        (data) => {
          this.loading.dismissLoading();

          // set data
          this.firstName = data.firstname;
          this.lastName = data.lastname;
          this.email = data.email;
          this.formattedDate = format(parseISO(data.date_of_birth), 'dd MMM yyyy');
          this.birthDate = data.date_of_birth;
          this.country = data.country.country_type;
          this.gender = data.gender.gender_type;
        },
        (error) => {
          this.loading.dismissLoading();

          this.alert.presentSimpleAlert(error.error.message);
        }
      );
  }

  ngOnInit() {
  }

  dateChanged(value) {
    this.birthDate = value;
    this.formattedDate = format(parseISO(value), 'dd MMM yyyy');
  }

  async update() {

    const accessToken = await Storage.get({ key: 'access_token' });

    if (!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alert.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }
    else {
      this.loading.presentLoading();

      this.settings.updateUser(this.firstName, this.lastName, this.email, this.birthDate, this.country, this.gender, accessToken.value)
      .subscribe(
        data => {
          this.loading.dismissLoading();
          this.router.navigate(['/tabs/tab4']);
          this.toast.presentSimpleToast('Kontodaten wurden erfolgreich geändert!');
        },
        error => {
          this.loading.dismissLoading();

          if (error.status === 400) {
            this.alert.presentSimpleAlert('Fülle bitte alle Eingabefelder aus!');
          }
          else {
            this.alert.presentSimpleAlert(error.error.message);
          }
        }
      );
    }
  }

}
