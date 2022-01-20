import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FortestService {
  
  constructor(private httpClient: HttpClient) { }
  
  goToStripe(): Observable<any> {
    const body = { title: 'GoToStripe' };
    return this.httpClient.post(`http://localhost:44349/online`, body);
  }
}
