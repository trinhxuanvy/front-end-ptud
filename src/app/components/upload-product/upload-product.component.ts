import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { AuthService } from 'src/app/share/auth/auth.service';
import {
  Store,
  Product,
  ProductOfStore,
} from '../../interfaces/interfaces';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { isDefined } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.scss']
})
export class UploadProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  importForm:FormGroup=new FormGroup({
    file:new FormControl(),
  });
  customerID='';
  currentUser: any;
  store: Store | undefined;
  listProduct: Product[] = [];
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private storeService: StoreService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
  }
  onImport(){
    this.geStoreByOwner();
    if(this.store){
    let formdata=new FormData();
    formdata.append('upload', this.fileInput.nativeElement.files[0]);
    this.productService.upLoadProductsByExcel(formdata,this.store.id).subscribe((data)=>{
      this.listProduct=data;
    })
  }
  }
  geStoreByOwner(){
    this.storeService.getStoreByOwner(this.customerID).subscribe((data)=>{
      this.store=data;
    })
  }

}
