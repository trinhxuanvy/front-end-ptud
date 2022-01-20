import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent implements OnInit {
  submitted = false;
  isAgree = false;
  currentUser: any;
  customerID = '';
  myData: any;
  paymentType = '';
  handler: any = null;
  postData: any = {};
  postInvoiceDetail: any = {};

  hiddenSuccessPaymentDisplay = true;

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
    private router: Router,
    private auth: AuthService
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }
  ChooseOption(event: any): void {
    this.paymentType = event?.value;
  }

  onSubmit(): void {
    this.submitted = true;
    if (
      this.formGroup.invalid ||
      !this.isAgree ||
      this.paymentType == '' ||
      this.paymentType == null
    ) {
      return;
    }

    if (this.paymentType == 'Online') {
      console.log('--------------------------');
      this.checkoutService.goToStripe().subscribe((data) => {
        console.log(data);
      });
    } else {
      this.makeResult();
    }
  }

  makeResult(): void {
    var now = new Date();
    this.postData.tinhTrang = 'Đóng gói';
    this.postData.thoiGianDat = now;
    this.postData.nguoiMua = this.customerID;
    this.postData.phuongThucThanhToan = this.paymentType;
    this.postData.cuaHang = this.myData.store;
    this.postData.tongTien = this.myData.total;
    this.postData.tinhTrangCu = '';

    this.checkoutService.makeInvoice(this.postData).subscribe((data: any) => {
      this.myData.product.forEach((element: any) => {
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
  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    this.checkoutService.getInformation(this.customerID).subscribe((data) => {
      this.myData = data;
      this.formGroup.controls['phoneNumber'].setValue(this.myData.phoneNumber);
      this.formGroup.controls['address'].setValue(this.myData.address);
      this.formGroup.controls['firstName'].setValue(this.myData.firstName);
      this.formGroup.controls['lastName'].setValue(this.myData.lastName);
    });
  }
}
