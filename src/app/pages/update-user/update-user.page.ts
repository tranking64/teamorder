import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {

  formattedDate = '';

  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  birthDate = format(new Date(), 'yyyy-MM-dd');

  constructor(private service: ApiService, private router: Router) { }

  ionViewWillEnter() {
    this.getData();
  }

  // set current user data, for form
  async getData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.service.getCurrUserData(accessToken.value)
      .subscribe(
        (data) => {
          this.firstName = data.firstname;
          this.lastName = data.lastname;
          this.email = data.email;
          this.formattedDate = format(parseISO(data.date_of_birth), 'dd MMM yyyy');
          this.birthDate = data.date_of_birth;

          // NOT IMPLEMENTED
          this.country = 'AUSTRIA';
          this.gender = 'MALE';
        },
        (error) => {
          console.log(error);
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

    this.service.updateUser(this.firstName, this.lastName, this.email, this.birthDate, this.country, this.gender, accessToken.value)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/tabs/tab4']);
          // TODO: implement toast
        },
        (error) => console.log(error)
      );
  }

}
