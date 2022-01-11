import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/interfaces/login-data';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const loginData: LoginData = {
      email: this.email,
      password: this.password
    };

    this.service.login(loginData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/tabs/tab1']);
    },
    (error) => {
      console.log(error);
    });
  }

}
