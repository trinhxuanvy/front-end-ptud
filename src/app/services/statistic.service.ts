import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private readonly apiURL = 'https://localhost:44349/api/statistic';

  constructor(private http: HttpClient) {}

  getDataWithDay(
    storeId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.http.get(
      this.apiURL + `/day/${storeId}/${startDate}/${endDate}`
    );
  }

  getDataWithMonth(
    storeId: string,
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: String
  ): Observable<any> {
    return this.http.get(
      this.apiURL +
        `/month/${storeId}/${startMonth}/${startYear}/${endMonth}/${endYear}`
    );
  }

  getDataWithYear(
    storeId: string,
    startYear: string,
    endYear: string
  ): Observable<any> {
    return this.http.get(
      this.apiURL + `/year/${storeId}/${startYear}/${endYear}`
    );
  }
}
