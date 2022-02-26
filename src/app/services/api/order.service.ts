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

  getSpecificOrders(accessToken, initialOrderId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/orders/get/initialOrders/' + initialOrderId, {headers});
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

  getWithOrderings(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/orders/get/orders', {headers});
  }

  finishOrder(accessToken, orderId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/orders/finished', {initial_order_id: orderId}, {headers});
  }

  updatePrice(accessToken, orderId, priceDebt): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/orders/update/price', {order_id: orderId, price: priceDebt}, {headers});
  }

  removeWithOrder(accessToken, orderId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.request('delete', 'https://diplom2021.itkaufmann.cloud/api/orders/delete/' + orderId, {headers});
  }
}
