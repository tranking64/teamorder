/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  createInitialOrder(accessToken, orderPlace, orderDeadline, orderGroupId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/orders/create',
      {
        place: orderPlace,
        order_deadline: orderDeadline,
        group_id: orderGroupId
      },
      {headers}
    );
  }

  orderWith(accessToken, orderContent, groupId, initialOrderId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.post('https://diplom2021.itkaufmann.cloud/api/orders/create/order',
      {
        order_content: orderContent,
        group_id: groupId,
        initial_order_id: initialOrderId
      },
      {headers}
    );
  }

  getOtherOrders(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/orders/get/initialOrders/others', {headers});
  }

  getInitialOrders(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/orders/get/initialOrders', {headers});
  }
}
