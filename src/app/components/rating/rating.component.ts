import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  idInvoiceDetail = "";

  constructor(
    private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idInvoiceDetail = data?.id;
  }

  ngOnInit(): void {}

  rating() {
    console.log('oke', this.idInvoiceDetail);
  }
}
