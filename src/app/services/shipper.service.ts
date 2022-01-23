import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipper } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ShipperService {
  private readonly apiURL = 'https://localhost:44349/api/shipper';

  constructor(private http: HttpClient) {}

  getShipperById(id: string): Observable<Shipper> {
    return this.http.get<Shipper>(this.apiURL + `/${id}`);
  }

  //------------------------------------THINH----------------------------------------------
  // //C#
  // getAllShipper(): Observable<Shipper[]> {
  //   return this.http.get<Shipper[]>('https://localhost:44349/api/shipper');
  // }

  //Java
  getAllShipper(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>('http://localhost:8080/api/shipper');
  }
  //----------------------------------------------------------------------------------
}
