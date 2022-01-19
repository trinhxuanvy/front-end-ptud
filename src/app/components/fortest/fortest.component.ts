import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-fortest',
  templateUrl: './fortest.component.html',
  styleUrls: ['./fortest.component.scss'],
})
export class FortestComponent implements OnInit {
  data: Array<Invoice> = [];
  datashow: Array<Boolean> = [];
  customerID = '61b76361241874f48b599885';

  constructor(private invoice: InvoiceService) {}
  UpdateInvoice(cusID: string) {
    this.invoice
      .GetInfOfInvoicesByCus(cusID)
      .subscribe((originalData: Array<Invoice>) => {
        this.data = originalData;
        for (var i = 0; i < this.data.length; i++) {
          this.datashow.push(true);
        }
      });
  }

  ngOnInit(): void {
    this.UpdateInvoice(this.customerID);
  }
  clickShow(id: any) {
    this.datashow[id] = this.datashow[id] ? false : true;
  }

  CancelInvoice(data: any): void {
    this.invoice.CancelInvoice(data).subscribe(() => {
      this.UpdateInvoice(this.customerID);
    });
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
  oldStatus: string;
  action: boolean;
}
