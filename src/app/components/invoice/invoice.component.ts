import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  data: Array<Invoice> = [];
  datashow: Array<Boolean> = [];
  currentUser: any;
  customerID = '';
  myCheckoutData: any;
  postData: any = {};
  postInvoiceDetail: any = {};

  constructor(
    private checkoutService: CheckoutService,
    private invoice: InvoiceService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}
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

    this.checkoutService
      .getInformation(this.customerID)
      .subscribe((checkoutdata) => {
        this.myCheckoutData = checkoutdata;

        this.activatedRoute.queryParams.subscribe((testdata: any) => {
          //console.log(testdata?.success);
          if (testdata?.success == 'true') {
            this.makeResult(true);
          } else {
            if (testdata?.success == 'false') {
              this.makeResult(false);
            }
          }
          this.UpdateInvoice(this.customerID);
        });
        //this.UpdateInvoice(this.customerID);
      });
  }
  clickShow(id: any) {
    this.datashow[id] = this.datashow[id] ? false : true;
  }

  CancelInvoice(data: any): void {
    this.invoice.CancelInvoice(data).subscribe(() => {
      this.UpdateInvoice(this.customerID);
    });
  }
  makeResult(option: boolean): void {
    var now = new Date();
    if (option) {
      this.postData.tinhTrang = 'Đóng gói';
    } else {
      this.postData.tinhTrang = 'Thanh toán thất bại';
    }
    this.postData.thoiGianDat = now;
    this.postData.nguoiMua = this.customerID;
    this.postData.phuongThucThanhToan = 'Online';
    this.postData.cuaHang = this.myCheckoutData.store;
    this.postData.tongTien = this.myCheckoutData.total;
    this.postData.tinhTrangCu = '';

    this.checkoutService.makeInvoice(this.postData).subscribe((data: any) => {
      console.log('data');
      console.log(data);
      this.myCheckoutData.product.forEach((element: any) => {
        this.postInvoiceDetail = {
          sanPham: element.productid,
          soLuong: element.numOfElement,
          donHang: data.id,
        };
        this.checkoutService
          .makeInvoiceDetails(this.postInvoiceDetail)
          .subscribe((result: any) => {});
      });
      this.checkoutService.clearCart(this.customerID).subscribe(() => {
        this.router.navigate(['/invoice']);
      });
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
