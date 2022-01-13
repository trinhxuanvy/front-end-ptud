import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'order--row',
  templateUrl: './order--row.component.html',
  styleUrls: ['./order--row.component.css']
})
export class OrderRowComponent implements OnInit {

  constructor() { }

  @Input() maDonHang = '';
  @Input() maNguoiMua = '';
  @Input() tinhTrang = '';
  @Input() thoiGianDat = '';
  @Input() phuongThucThanhToan = '';
  @Input() shipper = '';
  @Input() maCuaHang = '';
  @Input() kHDanhGia = 0;
  @Input() cHDanhGia = 0;
  @Input() tongTien = 0;

  ngOnInit(): void {

  }

}
