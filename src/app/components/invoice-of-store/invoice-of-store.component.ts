import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/share/auth/auth.service';
import { Invoice } from '../invoice/invoice.component';

@Component({
  selector: 'app-invoice-of-store',
  templateUrl: './invoice-of-store.component.html',
  styleUrls: ['./invoice-of-store.component.scss']
})
export class InvoiceOfStoreComponent implements OnInit {
  currentUser: any;
  data: Array<Invoice> = [];
  datashow: Array<Boolean> = [];
  storeID = '';

  constructor(private invoice: InvoiceService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private storeService: StoreService
  ) { }
  UpdateInvoice(storeID: string) {
    this.invoice
      .GetInfOfInvoicesByStore(storeID)
      .subscribe((originalData: Array<Invoice>) => {
        this.data = originalData;
        for (var i = 0; i < this.data.length; i++) {
          this.datashow.push(true);
        }
      });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    // this.storeID = this.route.snapshot.params['id'];
    this.storeService.getStoreByOwner(this.currentUser.id).subscribe(data => {
      this.storeID = data.id;
      this.UpdateInvoice(this.storeID);
    });
  }
  clickShow(id: any) {
    this.datashow[id] = this.datashow[id] ? false : true;
  }

  CancelInvoice(data: any): void {
    this.invoice.CancelInvoice(data).subscribe(() => {
      this.UpdateInvoice(this.storeID);
    });
  }
}
