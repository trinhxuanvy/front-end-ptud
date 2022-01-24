import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShipperVanDon } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindShipperService {
  constructor(private httpClient: HttpClient) {}

  //------------------------------------THINH----------------------------------------------
  //C#
  MakeShipperVanDon(data: ShipperVanDon): Observable<any> {
    return this.httpClient.post(
      `https://localhost:44349/api/shippervandon`,
      data
    );
  }
  //----------------------------------------------------------------------------------
}
