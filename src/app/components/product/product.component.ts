import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  Store,
  Product,
  ProductOfStore,
} from '../../interfaces/interfaces';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  customerID='';
  currentUser: any;
  isFinding = false;
  searchForm: FormGroup= new FormGroup({
    name:new FormControl(),
  });
  listProduct: Product[] = [];
  listStore: Store[] = [];
  listProductOfStore: ProductOfStore[] = [];
  carouselOption: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 24,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
        margin: 12,
      },
      600: {
        items: 2,
        margin: 12,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: false,
  };
  constructor(
    private storeSerive: StoreService,
    private productService: ProductService,
    private auth: AuthService,
    private customerService:CustomerService
  ) { }
  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    this.getListProduct();
    this.getListStore();
  }
  getListProduct() {
    this.productService.getAllProduct().subscribe((data) => {
      this.listProduct = data;
    });
  }
  getListStore() {
    this.storeSerive.getAllStore().subscribe((data) => {
      this.listStore = data;
    });
  }
  onSearch(){
    if(this.searchForm.value.name!=null)
    this.productService.getProductsByName(this.searchForm.value.name).subscribe((data)=>{
      this.listProduct=data;})
    }
    onFindEssential(){
      this.productService.geEssentialProduct().subscribe((data)=>{
        this.listProduct=data;
      })
  }
  onInsertCart(proid:String){
    if(this.currentUser!=null)
    this.customerService.insertProductToCart(proid,this.customerID).subscribe((data)=>{
      console.log("đã thêm vào giỏ hàng");
    })
  }
  
}
