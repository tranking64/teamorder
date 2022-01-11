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

  handleError(error) {
    return throwError(error.error.error);
  }
}
