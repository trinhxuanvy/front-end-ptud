import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
@Component({
  selector: 'app-fortest',
  templateUrl: './fortest.component.html',
  styleUrls: ['./fortest.component.scss'],
})
export class FortestComponent implements OnInit {
  formGroup = this.formBuilder.group({
    email: new FormControl('test@gmail.com', [Validators.required]),
    cardNumber: new FormControl('4242424242424242', [Validators.required]),
    mm: new FormControl('12', [Validators.required]),
    cvv: new FormControl('123', [Validators.required]),
    yy: new FormControl('22', [Validators.required]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {}

  getCartToken() {
    (<any>window).Stripe.card.createToken(
      {
        number: this.formGroup.value.cardNumber,
        exp_month: this.formGroup.value.mm,
        exp_year: this.formGroup.value.yy,
        cvc: this.formGroup.value.cvv,
      },
      (status: number, response: any) => {
        console.log(response);
      }
    );
  }

  doTest(): void {
    this.checkoutService.goToStrip1e().subscribe(()=>{});
  }
}
