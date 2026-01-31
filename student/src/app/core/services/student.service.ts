import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, Catalog } from '../enum/models/student.model';
import { ApiResponse } from '../enum/response/api-response.model';
import { enviroments } from '../../core/environments/enviroments';
import { EndPointRoute } from '../../core/enum/models/endPoints/endPoint.enum';

@Injectable({ providedIn: 'root' })
export class StudentService {

  constructor(private http: HttpClient) {}

  getStudents(page: number, pageSize: number, search?: string) {
    return this.http.get<ApiResponse<Catalog[]>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.ALL_CATALOGS_FILTER}`,
      {
        headers: {
          urlpath: `${EndPointRoute.ALL_CATALOGS_FILTER}?nameCatalog=${search}`,
        },
      },
    );
  }
}
