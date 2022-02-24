import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  creatorGroups = [];
  otherGroups = [];
  invitations = [];

  constructor(
    private groupService: GroupService,
    private router: Router
    ) { }

  ionViewWillEnter() {
    this.getCreatorGroups();
    this.getOtherGroups();
    this.getInvitations();
  }

  async getCreatorGroups() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getCreatorGroups(accessToken.value)
      .subscribe(
        data => this.creatorGroups = data.data,
        error => console.log(error)
      );
  }

  async getOtherGroups() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getOtherGroups(accessToken.value)
      .subscribe(
        data => this.otherGroups = data.data,
        error => console.log(error)
      );
  }

  async getInvitations() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getInvitations(accessToken.value)
      .subscribe(
        data => this.invitations = data.data
      );
  }

  async acceptInvite(group) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.acceptInvitation(accessToken.value, group.group_id)
      .subscribe(
        () => this.router.navigate(['/tabs']).then(() => this.router.navigate(['tabs/tab2'])),
        error => console.log(error)
      );
  }

  async declineInvite(group) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.declineInvitation(accessToken.value, group.group_id)
      .subscribe(
        () => this.invitations = this.invitations.filter(elem => elem !== group),
        //this.router.navigate(['/tabs']).then(() => this.router.navigate(['tabs/tab2'])),
        error => console.log(error)
      );
  }

  detailView(group) {
    const navExtras: NavigationExtras = {
      state: group
    };

    this.router.navigate(['detail-group-page'], navExtras);
  }

}
