import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListenerService } from '../../services/listener.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/manage/store/certificate',
    title: 'Chứng nhận',
    icon: 'verified_user',
    class: '',
  },
  {
    path: '/manage/store/analytics',
    title: 'Phân tích',
    icon: 'analytics',
    class: '',
  },
  {
    path: '/manage/store/products',
    title: 'Sản phẩm',
    icon: 'store',
    class: '',
  },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  {
    path: '/notifications',
    title: 'Notifications',
    icon: 'notifications',
    class: '',
  },
];

@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.scss'],
})
export class SideboardComponent implements OnInit {
  menuItems!: any[];

  constructor(private router: Router, private listenerService: ListenerService) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  getRouter(title: string) {
    this.listenerService.getTitleHeader(title);
  }
}
