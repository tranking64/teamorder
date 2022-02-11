import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumerationDataService {

  constructor(private http: HttpClient) { }

  fetchCountries(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/auth/countries', {headers});
  }

  fetchGenders(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/auth/genders', {headers});
  }
}
