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

export { Store, Location }