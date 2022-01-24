import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { ListenerService } from '../../services/listener.service';
import { ROUTES, RouteInfo } from './store.constant';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  itemPage = NAVIGATION;
  finalRoutes: RouteInfo[] = [];
  routes = ROUTES;
  sideboardName = 'Quản lý cửa hàng';
  activePage = '';
  isNewLoadPage = true;
  storeId = '';

  constructor(
    private listenerService: ListenerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPage();
    this.storeId = this.activatedRoute.snapshot.params['id'];
    this.routes.forEach((item) => {
      this.finalRoutes.push({
        path: item.path + this.storeId + item.endPath,
        class: item.class,
        endPath: item.endPath,
        icon: item.icon,
        title: item.title,
      });
    });
    switch (this.router.url) {
      case this.finalRoutes[0].path:
        this.activePage = this.routes[0].title;
        break;
      case this.finalRoutes[1].path:
        this.activePage = this.routes[1].title;
        break;
      case this.finalRoutes[3].path:
        this.activePage = this.routes[3].title;
        break;
      case this.finalRoutes[2].path:
        this.activePage = this.routes[2].title;
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
