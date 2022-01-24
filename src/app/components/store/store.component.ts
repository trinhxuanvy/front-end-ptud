import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { ListenerService } from '../../services/listener.service';
import { ROUTES } from './store.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  itemPage = NAVIGATION;
  routes = ROUTES;
  sideboardName = 'Quản lý cửa hàng';
  activePage = '';
  isNewLoadPage = true;

  constructor(
    private listenerService: ListenerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPage();
    switch (this.router.url) {
      case this.routes[0].path:
        this.activePage = this.routes[0].title;
        break;
      case this.routes[1].path:
        this.activePage = this.routes[1].title;
        break;
      case this.routes[2].path:
        this.activePage = this.routes[2].title;
        break;
      case this.routes[3].path:
        console.log(this.routes[3].title, 'dsdsadsdsa');
        this.activePage = this.routes[3].title;
        break;
      default:
        this.activePage = this.routes[0].title;
        break;
    }
  }

  getPage() {
    this.listenerService.titleHeader.subscribe((data) => {
      this.activePage = data;
      console.log(data);
    });
  }
}
