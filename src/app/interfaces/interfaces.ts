declare interface Store {
  id: string;
  chuCuaHang: string;
  diaChi: string;
  giayChungNhanAnToan: string;
  giayPhepKinhDoanh: string;
  maSoThue: string;
  tenCuaHang: string;
  trangThai: number;
  doUyTin: number;
  anhDaiDien: string;
}

declare interface Shipper {
  _id: string;
  cmnd: string;
  gioiTinh: string;
  hinhAnh: string;
  hinhAnhCMNDMatSau: string;
  hinhAnhCMNDMatTruoc: string;
  hoTen: string;
  matKhau: string;
  ngaySinh: string;
  sdt: string;
  doUyTin: number;
  email: string;
  diaChi: string;
  ViTri: object;
  phieuXetNghiem: PhieuXetNghiem;
  tiemNgua: TiemNgua;
  trangThaiHoatDong: number;
}
declare interface ShipperVanDon {
  _id: string;
  vandonid: string;
  shipper: string;
  khoangcach: number;
  trangthai: string;
}
declare interface Location {
  id: string;
  latitude: number;
  longtitude: number;
  objectId: string;
}

declare interface Product {
  id: string;
  tenSanPham: string;
  xuatXu: string;
  giaTien: number;
  hanSuDung: Date;
  cuaHang: string;
  loaiHang: string;
  hinhAnh: string;
  thietYeu: boolean;
  tenCuaHang: string;
  tenLoaiHang: string;
  donViTinh: string;
}

declare interface ProductOfStore {
  store: Store;
  products: Product[];
  distance: number;
}

declare interface NearestShipper {
  shipper: Shipper;
  distance: number;
}

declare interface PhieuXetNghiem {
  hinhAnhPhieu: string;
  diaChiLayMau: string;
  chuanDoan: string;
  hanDung: string;
}
declare interface TiemNgua {
  hinhAnhXacMinh: string;
  thoiGianTiem: string;
  tenVacxin: string;
}

declare interface Detail {
  id: string;
  danhGia: string;
  donHang: string;
  sanPham: string;
  soLuong: number;
  phanHoi: string;
}

declare interface Response {
  id: string;
  danhGia: string;
  phanHoi: string;
  tenKhachHang: string;
  maKhachHang: string;
}


export {
  Store,
  Location,
  Product,
  ProductOfStore,
  Shipper,
  NearestShipper,
  Detail,
  ShipperVanDon,
  Response
};
