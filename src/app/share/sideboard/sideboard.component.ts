import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListenerService } from '../../services/listener.service';
import { RouteInfo } from '../../components/store/store.constant';

declare const $: any;

@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.scss'],
})
export class SideboardComponent implements OnInit {
  @Input() routes: any;
  @Input() sideboardName: any;

  menuItems!: any[];
  finalRoutes: RouteInfo[] = [];
  storeId = '';

  constructor(
    private router: Router,
    private listenerService: ListenerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.storeId = this.activatedRoute.snapshot.params['id'];
    this.menuItems = this.routes.filter((menuItem: any) => menuItem);
    if (this.router.url.indexOf('/manage/account/') < 0) {
      this.menuItems.forEach((item) => {
        this.finalRoutes.push({
          path: item.path + this.storeId + item.endPath,
          class: item.class,
          endPath: item.endPath,
          icon: item.icon,
          title: item.title,
        });
      });
    } else {
      this.finalRoutes = this.menuItems;
    }
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
