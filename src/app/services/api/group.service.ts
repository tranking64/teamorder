/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getCreatorGroups(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/group/get/creator', {headers});
  }

  getSpecificGroup(accessToken, id): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/group/get/' + id, {headers});
  }

  createGroup(accessToken, groupName, description): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.post('https://diplom2021.itkaufmann.cloud/api/group/create', {group_name: groupName, group_description: description}, {headers});
  }

  updateGroup(accessToken, groupName, description, id): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/group/update/' + id, {group_name: groupName, group_description: description}, {headers});
  }

  changeRole(accessToken, groupId, userId, roleType): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/group/changeRole', {group_id: groupId, user_id: userId, role: roleType}, {headers});
  }

  removeUser(accessToken, groupId, userId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/group/removeUser', {group_id: groupId, user_id: userId}, {headers});
  }

  deleteGroup(accessToken, id) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', accessToken);

    return this.http.request('delete', 'https://diplom2021.itkaufmann.cloud/api/group/delete/' + id, {headers});
  }

  inviteToGroup(accessToken, groupId, email) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/group/addUser', { group_id: groupId, user_mail: email}, {headers});
  }

  leaveGroup(accessToken, groupId) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.http.put('https://diplom2021.itkaufmann.cloud/api/group/leave', { group_id: groupId}, {headers});
  }

  getInvitations(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/group/get/invites',  {headers});
  }

  acceptInvitation(accessToken, groupId): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

      return this.http.put('https://diplom2021.itkaufmann.cloud/api/group/accept/' + groupId, {}, {headers});
  }

  declineInvitation(accessToken, groupId): Observable<any> {
    const headers = new HttpHeaders()
      //.set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.delete('https://diplom2021.itkaufmann.cloud/api/group/decline/' + groupId, {headers});
  }

  getOtherGroups(accessToken): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', accessToken);

    return this.http.get('https://diplom2021.itkaufmann.cloud/api/group/get/all', {headers});
  }

}
