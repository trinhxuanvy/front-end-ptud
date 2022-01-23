import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly apiUrl = 'https://localhost:44349/api/location';

  constructor(private http: HttpClient) {}

  getLocationStore(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + '/cuahang');
  }

  //------------------------------------THINH----------------------------------------------
  // //C#
  // getLocationOneStore(id: string): Observable<Location> {
  //   return this.http.get<Location>(
  //     `https://localhost:44349/api/location/cuahang/${id}`
  //   );
  // }

  // getLocationShipper(): Observable<Location[]> {
  //   return this.http.get<Location[]>(this.apiUrl + '/shipper');
  // }
  //Java
  getLocationOneStore(id: string): Observable<Location> {
    return this.http.get<Location>(`http://localhost:8080/api/location/cuahang/${id}`);
  }
  
  getLocationShipper(): Observable<Location[]> {
    return this.http.get<Location[]>('http://localhost:8080/api/location/shipper');
  }
  //----------------------------------------------------------------------------------
  getLocationCustomer(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl + '/khachhang');
  }
}
