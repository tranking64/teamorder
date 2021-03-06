import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/api/order.service';
import { Storage } from '@capacitor/storage';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-order-with',
  templateUrl: './order-with.page.html',
  styleUrls: ['./order-with.page.scss'],
})
export class OrderWithPage implements OnInit {

  initialOrderData;
  orderContent;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private navCtrl: NavController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    // get passed data
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.initialOrderData = routerState;
  }

  getBack() {
    // bypass loading bug
    this.navCtrl.navigateBack(['/tabs/tab4']).then(() => this.router.navigate(['/tabs/tab1']));
  }

  async send() {
    const accessToken = await Storage.get({ key: 'access_token' });

    this.loadingService.presentLoading();

    this.orderService.orderWith(
      accessToken.value,
      this.orderContent,
      this.initialOrderData.group_id,
      this.initialOrderData.initial_order_id
    ).subscribe(data => {
      this.loadingService.dismissLoading();
      this.getBack();
    });
  }

}
