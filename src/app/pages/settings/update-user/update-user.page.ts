import { Component, OnInit } from '@angular/core';
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
  maxDate = new Date().toISOString();

  constructor(
    private settingsService: SettingsService,
    private loadingService: LoadingService,
    private enumDataService: EnumerationDataService,
    private alertService: AlertService,
    private toastService: ToastService,
    private navCtrl: NavController) { }

  ionViewWillEnter() {
    this.loadingService.presentLoading();
    this.getInitialData();
  }

  getBack() {
    this.navCtrl.back();
  }

  // transform string
  toTitleCase = (phrase) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  async getInitialData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.settingsService.getCurrUserData(accessToken.value)
    .subscribe(
      (data) => {
        this.loadingService.dismissLoading();

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
        this.loadingService.dismissLoading();

        this.alertService.presentSimpleAlert(error.error.message);
      }
    );

    this.enumDataService.fetchCountries().subscribe(
      data => this.countries = data.data
    );

    this.enumDataService.fetchGenders().subscribe(
      (data) => this.genders = data.data
    );

  }

  ngOnInit() {
  }

  // case another date was selected
  dateChanged(value) {
    this.birthDate = value;

    // value used in input field
    this.formattedDate = format(parseISO(value), 'dd MMM yyyy');
  }

  async update() {
    const accessToken = await Storage.get({ key: 'access_token' });

    if (!this.email.match(
      // eslint-disable-next-line max-len
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      this.alertService.presentSimpleAlert('Gebe bitte eine gültige E-Mail-Adresse ein!');
    }
    else {
      this.loadingService.presentLoading();

      // eslint-disable-next-line max-len
      this.settingsService.updateUser(this.firstName, this.lastName, this.email, this.birthDate, this.country, this.gender, accessToken.value)
      .subscribe(
        data => {
          this.loadingService.dismissLoading();
          this.getBack();
          this.toastService.presentSimpleToast('Kontodaten wurden erfolgreich geändert!');
        },
        error => {
          this.loadingService.dismissLoading();

          // check error type
          if (error.status === 400) {
            this.alertService.presentSimpleAlert('Fülle bitte alle Eingabefelder aus!');
          }
          else {
            this.alertService.presentSimpleAlert(error.error.message);
          }
        }
      );
    }
  }

}
