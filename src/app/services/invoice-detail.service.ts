import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Invoice,
  InvoiceDetail,
} from '../components/invoice/invoice.component';
import { Detail, Response } from '../interfaces/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailService {
  private readonly apiUrl = 'https://localhost:44349/api/ChiTietDonHang';

  constructor(private httpClient: HttpClient) {}
  GetInvoiceDetail(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(
      `https://localhost:44349/api/ChiTietDonHang/getHaveName/${id}`
    );
  }

  getInvoiceDetailByInvoice(id: string): Observable<Detail[]> {
    return this.httpClient.get<Detail[]>(this.apiUrl + '/' + id);
  }

  getAllInvoiceOfStore(id: string): Observable<Response[]> {
    return this.httpClient.get<Response[]>(this.apiUrl + '/store/' + id);
  }

  updateReview(response: Detail): Observable<Detail> {
    return this.httpClient.put<Detail>(
      'http://localhost:8080/api/chitietdonhang/review/' + response.id,
      response.danhGia,
      { headers: httpOptions.headers }
    );
  }

  updateResponse(response: Detail): Observable<Detail> {
    return this.httpClient.put<Detail>(
      'http://localhost:8080/api/chitietdonhang/response/' + response.id,
      response.phanHoi,
      { headers: httpOptions.headers }
    );
  }
}
