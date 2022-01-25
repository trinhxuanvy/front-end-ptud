import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  //------------------------------------THINH----------------------------------------------
  // //C#
  // GetInfOfInvoicesByCus(id: string): Observable<any> {
  //   return this.httpClient.get(
  //     `https://localhost:44349/api/donhang/nguoimua/${id}`
  //   );
  // }
  // CancelInvoice(id: string): Observable<any> {
  //   const body = { title: 'CancelInvoice' };
  //   return this.httpClient.put(
  //     `https://localhost:44349/api/donhang/huydonhang/${id}`,
  //     body
  //   );
  // }

  //Java
  GetInfOfInvoicesByCus(id: string): Observable<any> {
    return this.httpClient.get(
      `http://localhost:8080/api/donhang/nguoimua/${id}`
    );
  }
  CancelInvoice(id: string): Observable<any> {
    const body = { title: 'CancelInvoice' };
    return this.httpClient.put(
      `http://localhost:8080/api/donhang/huydonhang/${id}`,
      body
    );
  }

  //C#
  GetInfOfInvoicesById(id: string): Observable<any> {
    return this.httpClient.get(`https://localhost:44349/api/donhang/${id}`);
  }
  //----------------------------------------------------------------------------------

  GetInfOfInvoicesByStore(id: string): Observable<any> {
    return this.httpClient.get(
      `https://localhost:44349/api/donhang/cuahang/${id}`
    );
  }
  ChangeStatusToReceived(id: string): Observable<any> {
    const body = { tinhTrang: 'Đã nhận hàng' };
    return this.httpClient.put(
      `https://localhost:44349/api/donhang/doitrangthai/${id}`,
      body
    );
  }
  ChangeStatusToPrepared(id: string): Observable<any> {
    const body = { tinhTrang: 'Đóng gói' };
    return this.httpClient.put(
      `https://localhost:44349/api/donhang/doitrangthai/${id}`,
      body
    );
  }
}
