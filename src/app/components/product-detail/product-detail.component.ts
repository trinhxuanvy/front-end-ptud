import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailService } from '../../services/invoice-detail.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  customerID='';
  currentUser: any;
  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private invoiceDetailService: InvoiceDetailService,
    private customerService: CustomerService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    this.activeRoute.params.subscribe((id) => {
      let productId = id['id'].toString();
      this.productService.getProductById2(productId).subscribe((data) => {
        this.product = data[0];
      });
    });
  }
  onInsertCart(proid:String){
    if(this.currentUser!=null)
    this.customerService.insertProductToCart(proid,this.customerID).subscribe((data)=>{
      console.log("đã thêm vào giỏ hàng");
    })
  }
}
