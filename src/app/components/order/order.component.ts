import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderModel } from './order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  constructor(private http: HttpClient) { }

  //donHang1 = {
  //  maDonHang: '1234'
  //};

  //donHang2 = {
  //  maDonHang: '2345'
  //}

  pad0(str : any, len : any) {
    var zeros = "00000000000000000000000000";
    if (str.length < len) {
      return zeros.substr(0, len - str.length) + str;
    }
    return str;
  }

  getId(mongoId : any) : string {
    var result =
      this.pad0(mongoId.timestamp.toString(16), 8) +
      this.pad0(mongoId.machine.toString(16), 6) +
      this.pad0(mongoId.pid.toString(16), 4) +
      this.pad0(mongoId.increment.toString(16), 6);
    return result;
  }

  donHangs: OrderModel[] = [];
  ngOnInit(): void {
    this.http.get<OrderModel[]>('https://localhost:44396/api/DonHang').subscribe(data => {
      this.donHangs = data;
      for (let donHang of this.donHangs) {
        donHang._id = this.getId(donHang._id);
        donHang.nguoiMua = this.getId(donHang.nguoiMua);
        donHang.thoiGianDat = new Date(donHang.thoiGianDat).toLocaleDateString("en-US");
        donHang.shipper = this.getId(donHang.shipper);
        donHang.cuaHang = this.getId(donHang.cuaHang);
      }
      console.log(this.donHangs);
    })
  }
}
