import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent implements OnInit {
  submitted = false;
  isAgree = false;
  customerID = '61b76361241874f48b599885';
  myData: any;
  paymentType = '';
  handler: any = null;
  postData: any = {};
  postInvoiceDetail: any = {};

  formGroup = this.formBuilder.group({
    firstName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    lastName: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    phoneNumber: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    address: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }
  ChooseOption(event: any): void {
    this.paymentType = event?.value;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formGroup.invalid || !this.isAgree) {
      return;
    }

    if (this.paymentType == 'Tiền mặt') {
      console.log(this.checkoutService.doSomeThingWithPaymentByHand());
    } else {
      if (this.paymentType == 'Online') {
        this.pay(this.myData?.total / 23000);
      } else {
        console.log(this.checkoutService.doSomeThingWithPaymentByHand());
      }
    }
    //this.formGroup.reset();
    //this.isAgree = false;

    this.postData.tinhTrang = 'Đóng gói';
    var now = new Date();
    this.postData.thoiGianDat = now;
    this.postData.nguoiMua = this.customerID;
    this.postData.phuongThucThanhToan = this.paymentType;
    this.postData.cuaHang = this.myData.store;
    this.postData.tongTien = this.myData.total;
    this.postData.tinhTrangCu = '';

    this.checkoutService.makeInvoice(this.postData).subscribe((data) => {
      this.myData.product.forEach((element: any) => {
        this.postInvoiceDetail = {
          sanPham: element.productid,
          soLuong: element.numOfElement,
          donHang: data.id,
        };
        this.checkoutService
          .makeInvoiceDetails(this.postInvoiceDetail)
          .subscribe((result) => {});
      });
      this.checkoutService.clearCart(this.customerID).subscribe(() => {
        this.router.navigate(['/invoice']);
      });
    });
  }

  ngOnInit(): void {
    this.loadStripe();
    this.checkoutService.getInformation(this.customerID).subscribe((data) => {
      this.myData = data;
      this.formGroup.controls['phoneNumber'].setValue(this.myData.phoneNumber);
      this.formGroup.controls['address'].setValue(this.myData.address);
      this.formGroup.controls['firstName'].setValue(this.myData.firstName);
      this.formGroup.controls['lastName'].setValue(this.myData.lastName);
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KIOLjHfeS4VmIfgULaQTOWsNTY9TXcP0X3oFKdvIB9x6Zpa14sbx8ae6o7UNhvrJ4LZS9AWrJom05KwNJU993Zn000djcF9ll',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KIOLjHfeS4VmIfgULaQTOWsNTY9TXcP0X3oFKdvIB9x6Zpa14sbx8ae6o7UNhvrJ4LZS9AWrJom05KwNJU993Zn000djcF9ll',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
      },
    });

    handler.open({
      name: 'Thanh toán giỏ hàng',
      description: '',
      amount: amount * 100,
    });
  }
}
