import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  tongTienHoaHong(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/donhang/tinhtoantienhoahong', {responseType: 'text'});
  }
}
