import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getCurrUserData(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/user/get', {headers});
  }

  updateUser(uFirstName, uLastName, uEmail, uBirthDate, uCountry, uGender, accessToken): Observable<any> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', accessToken);

    return this.http.put('https://diplom2021.itkaufmann.cloud/api/user/update',
      {
        firstname: uFirstName,
        lastname: uLastName,
        email: uEmail,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        date_of_birth: uBirthDate,
        country: uCountry,
        gender: uGender
      },
      {headers});
  }

  changePassword(oldPassword, newPassword, accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.put('https://diplom2021.itkaufmann.cloud/api/user/password',
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        old_password: oldPassword,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        new_password: newPassword
      },
      {headers});
  }

  deleteAccount(dPassword, accessToken) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    const body = { password: dPassword };

    return this.http.request('delete', 'https://diplom2021.itkaufmann.cloud/api/user/delete', {headers, body});
  }

}
