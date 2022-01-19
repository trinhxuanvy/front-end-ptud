import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly apiURL = 'https://localhost:44349/api/cuahang';

  constructor(private http: HttpClient) { }

  getStoreById(id: string): Observable<any> {
    return this.http.get(this.apiURL + `/${id}`);
  }
}
