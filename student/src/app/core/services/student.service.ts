import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Student,
  Catalog,
  ResponseStudent,
  Programation,
  CreateStudent,
} from '../enum/models/student.model';
import { ApiResponse } from '../enum/response/api-response.model';
import { enviroments } from '../../core/environments/enviroments';
import { EndPointRoute } from '../../core/enum/models/endPoints/endPoint.enum';

@Injectable({ providedIn: 'root' })
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(page: number, pageSize: number, search?: string) {
    return this.http.get<ApiResponse<ResponseStudent>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.ALL_STUDENTS}?search=${search}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          urlpath: `${EndPointRoute.ALL_STUDENTS}?search=${search}&page=${page}&pageSize=${pageSize}`,
        },
      },
    );
  }

  getProgramation() {
    return this.http.get<ApiResponse<Programation[]>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.ALL_PROGRAMATION}`,
      {
        headers: {
          urlpath: `${EndPointRoute.ALL_PROGRAMATION}`,
        },
      },
    );
  }

  // Insert or Update Catalogs
  upsertDynamicStudent(payload: CreateStudent) {
    return this.http.post<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPSERT_STUDENTS}`,
      payload,
    );
  }

  //  Update Catalogs
  updateDynamicStudent(payload: CreateStudent) {
    return this.http.put<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPDATE_STUDENTS}/${payload.studentId}`,
      payload,
    );
  }
}
