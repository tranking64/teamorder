import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(sFirstName, sLastName, sBirthDate, sEmail, sPassword, sCountry, sGender): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/register',
      {
        firstname: sFirstName,
        lastname: sLastName,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        date_of_birth: sBirthDate,
        email: sEmail,
        password: sPassword,
        country: sCountry,
        gender: sGender
      },
      {headers}
      );
  }

  login(lEmail, lPassword): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/login', {email: lEmail, password: lPassword}, {headers});
  }

  // Observable<any> needed to get object back from any type --> JSON example: data.data.error.....
  rememberLogin(refreshToken): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/refresh', {refresh_token: refreshToken}, {headers});
  }

  forgotPasswort(fEmail): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/forgot', {email: fEmail}, {headers});
  }

  resetPassword(code, newPassword): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/reset', {token: code, password: newPassword}, {headers});
  }

  logout(lEmail, accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/logout', {email: lEmail}, {headers});
  }
}
