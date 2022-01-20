import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly apiURL = 'https://localhost:44349/api/cuahang';

  constructor(private http: HttpClient) {}

  getStoreById(id: string): Observable<Store> {
    return this.http.get<Store>(this.apiURL + `/${id}`);
  }

  getAllStore(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiURL);
  }

  getStoreByOwner(id: string): Observable<any> {
    return this.http.get(
      `https://localhost:44349/api/cuahang/owner/${id}`
    );
  }
}
