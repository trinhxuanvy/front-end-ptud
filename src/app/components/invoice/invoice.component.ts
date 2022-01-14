import { Component, NgModule, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  dataSource = new MatTableDataSource<InvoiceTable>();
  originalData: Array<InvoiceTable> = [];
  rowSpanData: Array<number> = [];
  isHistorical: boolean = false;
  isHistoricalv2: any;

  displayedColumns: string[] = [
    'invoiceID',
    'timeOrder',
    'product',
    'price',
    'numOfElement',
    'unit',
    'total',
    'status',
    'action',
  ];
  displayedColumnsHistorical: string[] = [
    'timeOrder',
    'product',
    'price',
    'numOfElement',
    'unit',
    'total',
    'status',
  ];
  customerID = '61b76361241874f48b599885';

  constructor(private invoice: InvoiceService) {}

  ClickCheckbox(): void {
    this.isHistorical = this.isHistorical ? false : true;
  }

  CancelInvoice(data: any): void {
    this.invoice.CancelInvoice(data.invoiceID).subscribe(() => {
      this.originalData = [];
      this.UpdateInvoice(this.customerID);
    });
  }
  UpdateInvoice(cusID: string) {
    this.invoice
      .GetInfOfInvoicesByCus(cusID)
      .subscribe((originalData: Array<Invoice>) => {
        originalData.forEach((row) => {
          this.rowSpanData[row.id] = row.invoiceDetail.length;
          row.invoiceDetail.forEach((invoiceDetail, index) => {
            if (index === 0) {
              this.originalData.push({
                id: row.id,
                invoiceID: row.invoiceID,
                timeOrder: row.timeOrder,
                product: invoiceDetail.product,
                price: invoiceDetail.price,
                numOfElement: invoiceDetail.numOfElement,
                unit: invoiceDetail.unit,
                total: row.total,
                status: row.status,
                action: row.action,
              });
            } else {
              this.originalData.push({
                id: -1,
                invoiceID: '',
                timeOrder: '',
                product: invoiceDetail.product,
                price: invoiceDetail.price,
                numOfElement: invoiceDetail.numOfElement,
                unit: invoiceDetail.unit,
                total: -1,
                status: '',
                action: false,
              });
            }
          });
        });
        this.dataSource.data = this.originalData;
      });
  }

  ngOnInit(): void {
    this.UpdateInvoice(this.customerID);
  }
}

export interface InvoiceDetail {
  product: string;
  price: number;
  numOfElement: number;
  unit: string;
}
export interface Invoice {
  id: number;
  invoiceID: string;
  timeOrder: string;
  invoiceDetail: InvoiceDetail[];
  total: number;
  status: string;
  action: boolean;
}
export interface InvoiceTable {
  id: number;
  invoiceID: string;
  timeOrder: string;
  product: string;
  price: number;
  numOfElement: number;
  unit: string;
  total: number;
  status: string;
  action: boolean;
}
