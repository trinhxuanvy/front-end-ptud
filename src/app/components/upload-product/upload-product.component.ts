import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/share/auth/auth.service';
import {
  Store,
  Product,
} from '../../interfaces/interfaces';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  storeID='';
  store:any;
  currentUser: any;
  listProduct: Product[] = [];
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private storeService: StoreService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
  }
  onImport(){
    this.storeID = this.activatedRoute.snapshot.params['id'];
    if(this.storeID){
    let formdata=new FormData();
    formdata.append('upload', this.fileInput.nativeElement.files[0]);
    this.productService.upLoadProductsByExcel(formdata,this.storeID).subscribe((data)=>{
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
