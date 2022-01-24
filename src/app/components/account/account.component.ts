import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { ListenerService } from '../../services/listener.service';
import { ROUTES } from './account.constant';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  itemPage = NAVIGATION;
  routes = ROUTES;
  sideboardName = "Quản lý tài khoản"
  activePage = '';

  constructor(private listenerService: ListenerService) {}

  ngOnInit(): void {
    this.activePage = 'Thông tin cá nhân';
    this.getPage();
  }

  getPage() {
    this.listenerService.titleHeader.subscribe((data) => {
      this.activePage = data;
    });
  }
}
