import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../interfaces/login-data';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  forgotPasswort(currEmail: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/forgot', {email: currEmail}, {headers})
      .pipe(catchError(this.handleError));
  }

  resetPassword(code: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/reset', {token: code, password: newPassword}, {headers})
      .pipe(catchError(this.handleError));
  }

  login(loginData: LoginData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/login', JSON.stringify(loginData), {headers})
      .pipe(catchError(this.handleError));
  }

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
      {headers})
        .pipe(catchError(this.handleError));
  }

  getCurrUserData(accessToken: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/user/get', {headers})
      .pipe(catchError(this.handleError));
  }

  logout(lEmail: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/logout', {email: lEmail}, {headers})
      .pipe(catchError(this.handleError));
  }

  // Observable<any> needed to get object back from any type --> JSON example: data.data.error.....
  rememberLogin(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post('https://diplom2021.itkaufmann.cloud/api/auth/refresh', {refresh_token: refreshToken} ,{headers})
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    return throwError(error);
  }
}
