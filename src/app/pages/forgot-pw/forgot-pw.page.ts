import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.page.html',
  styleUrls: ['./forgot-pw.page.scss'],
})
export class ForgotPwPage implements OnInit {

  email: string;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
  }

  sendLink() {
    this.service.forgotPasswort(this.email)
    .subscribe(
      (data) => {
        console.log(data.message);
        this.router.navigate(['/new-pw']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
