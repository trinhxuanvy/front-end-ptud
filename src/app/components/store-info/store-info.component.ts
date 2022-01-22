import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit {
  store!: Store;
  storeID = '';
  constructor(private storeService: StoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.storeID=this.route.snapshot.params['id'];
   this.getStore(this.storeID);
   console.log(this.store.trangThai);
  }

  getStore(storeID:string) {
    this.storeService.getStoreById(storeID).subscribe((data) => {
      console.log(data);
      this.store = data;
      console.log(typeof (this.store));
    });
  }
  public horizontal = true;
}
