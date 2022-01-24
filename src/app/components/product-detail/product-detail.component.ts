import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailService } from '../../services/invoice-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private invoiceDetailService: InvoiceDetailService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((id) => {
      let productId = id['id'].toString();
      this.productService.getProductById2(productId).subscribe((data) => {
        this.product = data[0];
      });
    });
  }
}
