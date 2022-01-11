import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-pw',
  templateUrl: './new-pw.page.html',
  styleUrls: ['./new-pw.page.scss'],
})
export class NewPwPage implements OnInit {

  code: string;
  password: string;
  cPassword: string;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
  }

  resetPassword() {
    if (this.password === this.cPassword) {
      this.service.resetPassword(this.code, this.password)
        .subscribe(
          (data) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    else {
      // TODO: implement alert
    }
  }

}
