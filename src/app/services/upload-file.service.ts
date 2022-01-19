import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private readonly apiURL = 'https://localhost:44349/api/upload';

  constructor(private http: HttpClient) { }

  uploadFile(file: FormData): Observable<any> {
    return this.http.post(this.apiURL, file, { reportProgress: true, observe: "events" });
  }
}
