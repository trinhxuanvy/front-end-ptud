import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-essential-product',
  templateUrl: './essential-product.component.html',
  styleUrls: ['./essential-product.component.scss']
})
export class EssentialProductComponent implements OnInit {
  dataP: Array<Product> = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.geEssentialProduct().subscribe((originalData: Array<Product>)=>{
      this.dataP=originalData;
    })
  }

}
