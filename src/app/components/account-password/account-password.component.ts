import { Router} from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from 'src/app/share/auth/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MatSnackBar]
})
export class AccountPasswordComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  submitted = false;
  isAgree = false;
  currentUser: any;
  customerID = '';
  myData: any;
  isActive = true;
  isRunning = false;
  paymentType = '';
  handler: any = null;
  postData: any = {};
  postInvoiceDetail: any = {};
  postPw: any;
  postRetypePw: any;

  hiddenSuccessPaymentDisplay = true;

  formGroup = this.formBuilder.group({
    newpassword: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    retypepass: new FormControl({ value: '', disabled: false}, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),

  });

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }
  ChooseOption(event: any): void {
    this.paymentType = event?.value;
  }

  onSubmit(): void {
    this.isActive=false;
    this.postPw=this.formGroup.get('newpassword');
    this.postRetypePw=this.formGroup.get('retypepass');
    if(this.postPw.value !== this.postRetypePw.value){
      this.isActive = true;
    this._snackBar.open(
      'Mật khẩu không trùng khớp!',
      'Đóng',
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      }
    )
    } else if(this.postPw.value === this.postRetypePw.value)
      this.auth.changePassword(this.customerID, this.postPw.value).subscribe((data)=>{
    });
    //console.log(this.customerID);
  }
  CheckRetype(): void {
    this.postPw.value = this.formGroup.get('retypepass')?.value ? false : true;
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
    this.postPw=this.formGroup.get('newpassword');
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    console.log(this.customerID);
    this.checkoutService.getInformation(this.customerID).subscribe((data) => {
      this.myData = data;
      // this.formGroup.controls['phoneNumber'].setValue(this.myData.phoneNumber);
      // this.formGroup.controls['address'].setValue(this.myData.address);
      // this.formGroup.controls['firstName'].setValue(this.myData.firstName);
      // this.formGroup.controls['lastName'].setValue(this.myData.lastName);
    });
  }
}
