import { Component, OnInit } from '@angular/core';
import { ListenerService } from '../../services/listener.service';

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.scss']
})
export class HeaderStoreComponent implements OnInit {
  titleHeader = "";

  constructor(private listenerService: ListenerService) { }

  ngOnInit(): void {
    this.listenerService.titleHeader.subscribe((data) => {
      this.titleHeader = data;
    })
  }
}
