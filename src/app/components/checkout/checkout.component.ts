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

  formGroup = this.formBuilder.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formGroup.invalid || !this.isAgree) {
      return;
    }
    
    this.isAgree = false;
    this.formGroup.reset();
  }

  ngOnInit(): void {
    this.checkoutService.getInformation(this.customerID).subscribe((data) => {
      this.myData = data;
      //console.log(this.myData);
      this.formGroup.controls['phoneNumber'].setValue(this.myData.phoneNumber);
      this.formGroup.controls['address'].setValue(this.myData.address);
      this.formGroup.controls['firstName'].setValue(this.myData.firstName);
      this.formGroup.controls['lastName'].setValue(this.myData.lastName);
    });
  }
}

