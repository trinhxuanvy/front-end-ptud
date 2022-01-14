import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator } from '@angular/forms';
import { FortestService } from '../../services/fortest.service';
@Component({
  selector: 'app-fortest',
  templateUrl: './fortest.component.html',
  styleUrls: ['./fortest.component.scss'],
})
export class FortestComponent implements OnInit {
  items = this.fortestService.getItems();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private fortestService: FortestService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    // Process checkout data here
    this.items = this.fortestService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
  ngOnInit(): void {}
}
