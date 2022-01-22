import { Component, OnInit } from '@angular/core';
import { NAVIGATION } from '../../constants/variables.contants';
import { StoreService } from '../../services/store.service';
import { Product, Store } from '../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit {
  store!: Store;
  storeID = '';
  dataP: Array<Product> = [];
  constructor(private storeService: StoreService,private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.storeID=this.route.snapshot.params['id'];
   this.getStore(this.storeID);
   this.productService.getProductByStoreID(this.storeID).subscribe((originalData: Array<Product>)=>{
     this.dataP=originalData;
     console.log(this.dataP);
   })
  }

  getStore(storeID:string) {
    this.storeService.getStoreById(storeID).subscribe((data) => {
      this.store = data;
      console.log(typeof (this.store));
    });
  }
  public horizontal = true;
}
