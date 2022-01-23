import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  idInvoiceDetail = '';
  isRating = false;
  product!: Product;
  productId = "";
  image = "";

  constructor(
    private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {
    this.idInvoiceDetail = data?.id;
    this.productId = data?.productId;
  }

  ngOnInit(): void {
    this.productService.getProductById2(this.productId).subscribe(data => {
      this.image = data[0].hinhAnh;
    })
  }

  setRating(value: string) {
    this.isRating = true;
    setTimeout(() => {
      this.dialogRef.close(value);
      this.isRating = false;
    }, 5000);
  }
}
