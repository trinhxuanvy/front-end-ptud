import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product, Detail, Response } from '../../interfaces/interfaces';
import { InvoiceDetailService } from '../../services/invoice-detail.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  idInvoiceDetail = '';
  isRating = false;
  product!: Product;
  productId = '';
  image = '';

  constructor(
    private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private invoiceDetailService: InvoiceDetailService
  ) {
    this.idInvoiceDetail = data?.id;
    this.productId = data?.productId;
  }

  ngOnInit(): void {
    this.productService.getProductById2(this.productId).subscribe((data) => {
      this.image = data[0].hinhAnh;
    });
  }

  setRating(value: string) {
    this.isRating = true;
    let detail: Detail = {
      id: this.idInvoiceDetail,
      danhGia: value,
      phanHoi: '',
      sanPham: '',
      donHang: '',
      soLuong: 0,
    };
    this.invoiceDetailService.updateReview(detail).subscribe((data) => {
      if (data) {
        this.dialogRef.close(data.danhGia);
      } else {
        this.dialogRef.close("");
      }
      this.isRating = false;
    });
  }
}
