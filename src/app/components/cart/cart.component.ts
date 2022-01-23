import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/share/auth/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  customerID='';
  currentUser: any;
  listtotal:Array<number> | undefined;
  total:number | undefined;
  mycart: any;
  constructor(
    private auth: AuthService,
    private customerService:CustomerService ) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    this.getCartByID();
  }
  getCartByID(){
    if(this.customerID!='')
    return this.customerService.getCartById(this.customerID).subscribe((data)=>{
      this.mycart=data;
    });
    return;
  }

}
