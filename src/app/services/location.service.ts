import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  readonly apiUrl = "https://localhost:44349/api/location"

  constructor(private http: HttpClient) { }

  getLocationStore(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + "/cuahang");
  }

  getLocationCustomer(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + "/khachhang");
  }

  getLocationShipper(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + "/shipper");
  }
}
