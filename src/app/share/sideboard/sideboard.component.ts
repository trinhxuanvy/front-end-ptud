import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListenerService } from '../../services/listener.service';

declare const $: any;

@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.scss'],
})
export class SideboardComponent implements OnInit {
  menuItems!: any[];
  @Input() routes: any;
  @Input() sideboardName: any;
  constructor(private router: Router, private listenerService: ListenerService) {}

  ngOnInit(): void {
    this.menuItems = this.routes.filter((menuItem:any) => menuItem);
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
