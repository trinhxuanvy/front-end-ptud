import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FortestService {
  constructor(private httpClient: HttpClient) {}

  getStoreByOwner(id: string): Observable<any> {
    return this.httpClient.get(
      `https://localhost:44349/api/cuahang/owner/${id}`
    );
  }
}
