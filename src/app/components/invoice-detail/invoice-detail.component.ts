import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailService } from 'src/app/services/invoice-detail.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { AuthService } from 'src/app/share/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';
import { Detail } from '../../interfaces/interfaces';

export interface DetailInvoice {
  idInvoiceDetail: string;
  product: string;
  price: number;
  numOfElement: number;
  unit: string;
}

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit {
  invoice: any = {};
  currentUser: any;
  DetailInvoiceData: DetailInvoice[] = [];
  dataSource = this.DetailInvoiceData;
  displayedColumns: string[] = [
    'product',
    'price',
    'numOfElement',
    'unit',
    'rating',
  ];
  invoiceId: string = '';
  totalPrice: number = 0;
  detail: Detail[] = [];

  constructor(
    private invoiceDetailService: InvoiceDetailService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private invoiceService: InvoiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    console.log(this.currentUser);
    // get invoice information
    this.invoiceId = this.route.snapshot.params['id'];
    this.invoiceDetailService
      .GetInvoiceDetail(this.invoiceId)
      .subscribe((data) => {
        this.invoice = data;
        console.log(this.invoice);

        this.DetailInvoiceData = data.invoiceDetail;
        this.dataSource = this.DetailInvoiceData;
        for (let i = 0; i < this.DetailInvoiceData.length; i++) {
          this.totalPrice +=
            this.DetailInvoiceData[i].numOfElement *
            this.DetailInvoiceData[i].price;
        }
        // choose display column
        if (
          this.currentUser.loaiND === 1 &&
          (this.invoice.status === 'Đã giao' ||
            this.invoice.status === 'Đã nhận hàng')
        ) {
          this.displayedColumns = [
            'product',
            'price',
            'numOfElement',
            'unit',
            'rating',
          ];
        }
      });
    this.invoiceDetailService
      .getInvoiceDetailByInvoice(this.invoiceId)
      .subscribe((data) => {
        this.detail = data;
        console.log(this.detail);
      });
  }

  daNhanHang(id: any): void {
    console.log(id);
    this.invoiceService.ChangeStatusToReceived(id).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }

  daChuanBi(id: any): void {
    console.log(id);
    this.invoiceService.ChangeStatusToPrepared(id).subscribe((data) => {
      console.log(data);
      location.reload();
    });
  }

  setRating(id: string, productId: string) {
    console.log(id);
    const dialogRef = this.dialog.open(RatingComponent, {
      data: { id: id, productId: productId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        let index = this.dataSource.findIndex(
          (data) => data.idInvoiceDetail == id
        );
        this.detail[index].danhGia = result;
      }
    });
  }
}
