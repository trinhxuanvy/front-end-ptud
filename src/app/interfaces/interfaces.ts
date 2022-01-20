declare interface Store {
    id: string,
    chuCuaHang: string,
    diaChi: string,
    giayChungNhanAnToan: string,
    giayPhepKinhDoanh: string,
    maSoThue: string,
    tenCuaHang: string,
    trangThai: number,
    doUyTin: number
}

declare interface Location {
    id: string,
    latitude: number,
    longtitude: number,
    objectId: string
}

declare interface Product {
    id: string,
    tenSanPham: string,
    xuatXu: string,
    giaTien: number,
    hanSuDung: Date,
    cuaHang: string,
    loaiHang: string,
    hinhAnh: string,
    thietYeu: boolean,
    tenCuaHang: string,
    tenLoaiHang: string,
    donviTinh: string,
}

declare interface ProductOfStore {
    store: Store,
    products: Product[],
    distance: number
}

export { Store, Location, Product, ProductOfStore }