import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worklog } from '../models/Worklog';
import { environment } from '@env/environment';

@Injectable()
export class WorklogService {
  constructor(private httpClient: HttpClient) {}

  getWorklogs(user?: number, month?: number, date?: string): Observable<Worklog[]> {
    let userParam = null;
    let monthParam = null;
    let dateParam = null;

    if (user) {
      userParam = user.toString();
    }

    if (month) {
      monthParam = month.toString();
    }

    if (date) {
      dateParam = date.toString();
    }

    const params = new HttpParams()
      .set('user', userParam)
      .set('month', monthParam)
      .set('date', dateParam);
    return this.httpClient.get<Worklog[]>(`${environment.server}worklog`, { params: params });
  }

  post(worklog: Worklog): Observable<Worklog> {
    return this.httpClient.post<Worklog>(`${environment.server}worklog`, worklog);
  }

  patch(worklog: Worklog): Observable<Worklog> {
    return this.httpClient.patch<Worklog>(`${environment.server}worklog/`, worklog);
  }

  delete(worklogId: number): Observable<Worklog> {
    return this.httpClient.delete<Worklog>(`${environment.server}worklog/` + worklogId);
  }
}
