import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-with-orderings-detail',
  templateUrl: './with-orderings-detail.page.html',
  styleUrls: ['./with-orderings-detail.page.scss'],
})
export class WithOrderingsDetailPage implements OnInit {

  currData;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.currData = routerState;
  }

}
