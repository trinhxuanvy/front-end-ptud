import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
})
export class CheckoutComponent implements OnInit {
  items = this.checkoutService.getItems();
  loading = false;
  submitted = false;

  formGroup = this.formBuilder.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
  });

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {}
  test(event: any): void {
    this.submitted = true;
  }

  onSubmit(): void {
    this.submitted = true;
    this.items = this.checkoutService.clearCart();
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
    this.formGroup.reset();
    this.checkoutService.doSomething();
    console.log(this.formGroup);
  }

  ngOnInit(): void {}
}
