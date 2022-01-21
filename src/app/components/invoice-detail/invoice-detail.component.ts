import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailService } from 'src/app/services/invoice-detail.service';

export interface DetailInvoice {
  product: string;
  price: number;
  numOfElement: number;
  unit: string;
}

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  DetailInvoiceData: DetailInvoice[] = [];
  dataSource = this.DetailInvoiceData;
  displayedColumns: string[] = ['product', 'price', 'numOfElement', 'unit'];
  invoice: string = '';
  totalPrice: number = 0;
  constructor(private invoiceDetailService: InvoiceDetailService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.invoice = this.route.snapshot.params['id'];
    this.invoiceDetailService.GetInvoiceDetail(this.invoice).subscribe(data => {
      this.DetailInvoiceData = data;
      this.dataSource = this.DetailInvoiceData;
      for(let i = 0; i < this.DetailInvoiceData.length; i++){
        this.totalPrice += this.DetailInvoiceData[i].numOfElement * this.DetailInvoiceData[i].price;
      }
    });
  }
}
