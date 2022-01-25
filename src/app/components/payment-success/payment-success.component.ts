import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from 'src/app/share/auth/auth.service';
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
})
export class PaymentSuccessComponent implements OnInit {
  currentUser: any;
  customerID = '';
  myCheckoutData: any;
  postData: any = {};
  postInvoiceDetail: any = {};
  constructor(
    private auth: AuthService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;

    this.checkoutService
      .getInformation(this.customerID)
      .subscribe((checkoutdata) => {
        this.myCheckoutData = checkoutdata;
        this.makeResult(true);
      });
  }

  makeResult(option: boolean): void {
    var now = new Date();
    if (option) {
      this.postData.tinhTrang = 'Mới tạo';
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
      this.checkoutService.clearCart(this.customerID).subscribe(() => {});
    });
  }
}
