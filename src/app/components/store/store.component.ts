import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { ListenerService } from '../../services/listener.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  itemPage = NAVIGATION;
  activePage = '';

  constructor(private listenerService: ListenerService) {}

  ngOnInit(): void {
    this.activePage = 'Chứng nhận';
    this.getPage();
  }

  getPage() {
    this.listenerService.titleHeader.subscribe((data) => {
      this.activePage = data;
      console.log(data);
    });
  }
}
