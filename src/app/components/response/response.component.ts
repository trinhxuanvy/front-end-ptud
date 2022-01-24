import { Component, OnInit } from '@angular/core';
import { InvoiceDetailService } from 'src/app/services/invoice-detail.service';
import { Detail, Response } from '../../interfaces/interfaces';
import { AuthService } from 'src/app/share/auth/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnInit {
  currentUser: any;
  listResponse: Response[] = [];
  listDisplay: Response[] = [];
  posLoading = '';
  pageSize = 8;
  length = 100;
  pageSizeOptions = [10, 20, 30];
  pageEvent!: PageEvent;
  isLoading = true;
  storeId = "";

  constructor(
    private invoiceDetailService: InvoiceDetailService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.storeId = this.activatedRoute.snapshot.params['id'];
    this.currentUser = this.auth.getUser();
    this.invoiceDetailService
      .getAllInvoiceOfStore(this.storeId)
      .subscribe((data) => {
        this.listResponse = data.filter(l => l.danhGia);
        this.listDisplay = this.listResponse.slice(0, 8);
        this.length = this.listResponse.length;
        this.isLoading = false;
      });

    console.log(this.pageEvent);
  }

  changeInput(event: any, id: string) {
    console.log(id);
    let index = this.listResponse.findIndex((response) => response.id == id);
    this.listResponse[index].phanHoi = event.target.value;
  }

  feedBack(id: string) {
    this.posLoading = id;
  }

  getPage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.listDisplay = this.listResponse.slice(
      page.pageIndex * this.pageSize,
      (page.pageIndex + 1) * this.pageSize
    );
  }
}
