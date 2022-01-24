import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { ListenerService } from '../../services/listener.service';
import { ROUTES } from './account.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  itemPage = NAVIGATION;
  routes = ROUTES;
  sideboardName = 'Quản lý tài khoản';
  activePage = '';

  constructor(
    private listenerService: ListenerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activePage = 'Thông tin cá nhân';
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
        this.activePage = this.routes[3].title;
        break;
      case this.routes[4].path:
        this.activePage = this.routes[4].title;
        break;
      case this.routes[5].path:
        this.activePage = this.routes[5].title;
        break;
      default:
        this.activePage = this.routes[0].title;
        break;
    }
  }

  getPage() {
    this.listenerService.titleHeader.subscribe((data) => {
      this.activePage = data;
    });
  }
}
