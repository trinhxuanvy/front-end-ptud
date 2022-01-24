import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-account-invoice',
  templateUrl: './account-invoice.component.html',
  styleUrls: ['./account-invoice.component.scss'],
})
export class AccountInvoiceComponent implements OnInit {
  data: Array<Invoice> = [];
  datashow: Array<Boolean> = [];
  currentUser: any;
  customerID = '';
  myCheckoutData: any;
  postData: any = {};
  postInvoiceDetail: any = {};

  constructor(private invoice: InvoiceService, private auth: AuthService) {}
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
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
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
  idInvoiceDetail: string;
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
  payment: string;
  action: boolean;
}
