import { Component } from '@angular/core';
import { GroupService } from '../services/api/group.service';
import { Storage } from '@capacitor/storage';
import { NavigationExtras, Router } from '@angular/router';
import { SettingsService } from '../services/api/settings.service';

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
    private router: Router,
    private settings: SettingsService,
    ) { }

  ionViewWillEnter() {
    this.getInitialData();
  }

  async getInitialData() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getCreatorGroups(accessToken.value)
      .subscribe(
        data => this.creatorGroups = data.data
      );

    this.groupService.getOtherGroups(accessToken.value)
      .subscribe(
        data => this.otherGroups = data.data
      );

    this.groupService.getInvitations(accessToken.value)
      .subscribe(
        data => this.invitations = data.data
      );
  }

  async acceptInvite(group) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.acceptInvitation(accessToken.value, group.group_id)
      .subscribe(
        () => this.router.navigate(['/tabs']).then(() => this.router.navigate(['tabs/tab2']))
      );
  }

  async declineInvite(group) {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.declineInvitation(accessToken.value, group.group_id)
      .subscribe(
        () => this.invitations = this.invitations.filter(elem => elem !== group)
      );
  }

  async detailView(group) {

    const accessToken = await Storage.get({ key: 'access_token' });

    this.groupService.getSpecificGroup(accessToken.value, group.group_id)
      .subscribe(
        data => this.getMyUser(accessToken, data.data.users, group)
      );
  }

  getMyUser(accessToken, myUsers, group) {

    this.settings.getCurrUserData(accessToken.value)
    .subscribe(
      data => {
        myUsers.forEach(user => {
          if (data.user_id === user.user_id) {

            const navExtras: NavigationExtras = {
              state: {
                users: myUsers,
                currentGroup: group,
                myUser: user
              }
            };

            this.router.navigate(['detail-group-page'], navExtras);
          }
        });
      }
    );
  }

}
