import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  constructor(
    private http: HttpClient
  ) { }

  getCreditors(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/payments/get/debts', {headers});
  }

  getDebtors(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/payments/get/creditor', {headers});
  }

  removeDebtor(accessToken, debtorId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post('https://diplom2021.itkaufmann.cloud/api/payments/create', {debtor_id: debtorId}, {headers});
  }
}
