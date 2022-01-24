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
  posLoading: Array<boolean> = [];
  pageSize = 8;
  length = 100;
  pageSizeOptions = [10, 20, 30];
  pageEvent!: PageEvent;
  isLoading = true;
  storeId = "";
  responseTemp: Response[] = [];
  error: Array<boolean> = [];
  saveRes: Array<string> = [];

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
        data.forEach(item => {
          this.posLoading.push(false);
          this.error.push(false);
          this.saveRes.push(item.phanHoi);
        });
      });

    console.log(this.pageEvent);
  }

  changeInput(event: any, id: string) {
    console.log(id);
    let index = this.listResponse.findIndex((response) => response.id == id);
    this.listResponse[index].phanHoi = event.target.value;
  }

  feedBack(index: number, response: Response) {
    this.posLoading[index] = true;

    let detail: Detail = {
      id: response.id,
      danhGia: "",
      donHang: "",
      sanPham: "",
      soLuong: 0,
      phanHoi: response.phanHoi
    }
    this.invoiceDetailService.updateResponse(detail).subscribe(data => {
      if (!data) {
        this.error[index] = true;
        this.listResponse[index].phanHoi = this.saveRes[index];
      }
      this.posLoading[index] = false;
    })
  }

  getPage(page: PageEvent) {
    this.pageSize = page.pageSize;
    this.listDisplay = this.listResponse.slice(
      page.pageIndex * this.pageSize,
      (page.pageIndex + 1) * this.pageSize
    );
  }
}
