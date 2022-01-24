import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.page.html',
  styleUrls: ['./delete-acc.page.scss'],
})
export class DeleteAccPage implements OnInit {

  password: string;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async delete() {
    const accessToken = await Storage.get({key: 'access_token'});

    console.log(this.password);
    console.log(accessToken.value);

    this.service.deleteUser(this.password, accessToken.value)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/login']);
        },
        (error) => console.log(error)
      );
  }

}
