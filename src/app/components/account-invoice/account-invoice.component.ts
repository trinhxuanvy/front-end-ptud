import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { AuthService } from 'src/app/share/auth/auth.service';
import { StoreService } from 'src/app/services/store.service';

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
  typeUser: number = 0;
  storeID: string = '';
  isLoading = true;

  constructor(
    private invoice: InvoiceService,
    private auth: AuthService,
    private storeService: StoreService
  ) {}
  UpdateInvoice(cusID: string, storeID: string) {
    if (this.typeUser === 1) {
      this.invoice
        .GetInfOfInvoicesByCus(cusID)
        .subscribe((originalData: Array<Invoice>) => {
          this.data = originalData;
          for (var i = 0; i < this.data.length; i++) {
            this.datashow.push(true);
          }
          this.isLoading = false;
        });
    } else if (this.typeUser === 2) {
      this.invoice
        .GetInfOfInvoicesByStore(storeID)
        .subscribe((originalData: Array<Invoice>) => {
          this.data = originalData;
          for (var i = 0; i < this.data.length; i++) {
            this.datashow.push(true);
          }
          this.isLoading = false;
        });
    }
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.typeUser = this.currentUser.loaiND;
    this.customerID = this.currentUser.id;
    if (this.typeUser === 1) this.UpdateInvoice(this.customerID, '');
    else if (this.typeUser === 2) {
      this.storeService
        .getStoreByOwner(this.currentUser.id)
        .subscribe((data) => {
          this.storeID = data.id;
          this.isLoading = false;
          this.UpdateInvoice('', this.storeID);
        });
    }
  }
  clickShow(id: any) {
    this.datashow[id] = this.datashow[id] ? false : true;
  }

  CancelInvoice(data: any): void {
    this.invoice.CancelInvoice(data).subscribe(() => {
      this.UpdateInvoice(this.customerID, '');
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
