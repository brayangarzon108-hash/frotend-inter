import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Student,
  Catalog,
  ResponseStudent,
  Programation,
  CreateStudent,
  Subject,
  CreateSubjectStudent,
  ListStudentSubject,
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

  getStudentsSubjectName(page: number, pageSize: number, studentId: number, subjectId: number, search?: string) {
    return this.http.get<ApiResponse<ResponseStudent>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.ALL_STUDENTS_SUBJECT_NAME}?studentId=${studentId}&page=${page}&pageSize=${pageSize}&subjectId=${subjectId}&nameStudent=${search}`,
      {
        headers: {
          urlpath: `${EndPointRoute.ALL_STUDENTS_SUBJECT_NAME}?studentId=${studentId}&page=${page}&pageSize=${pageSize}&subjectId=${subjectId}&nameStudent=${search}`,
        },
      },
    );
  }

  getStudentsSubject(studentId: number) {
    return this.http.get<ApiResponse<ListStudentSubject[]>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.ALL_STUDENTS_SUBJECT}?studentId=${studentId}`,
      {
        headers: {
          urlpath: `${EndPointRoute.ALL_STUDENTS_SUBJECT}?studentId=${studentId}`,
        },
      },
    );
  }

  deleteStudentsSubject(studentId: number) {
    return this.http.delete<ApiResponse<ResponseStudent>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.DELETE_STUDENTS_SUBJECT}/${studentId}`,
      {
        headers: {
          urlpath: `${EndPointRoute.DELETE_STUDENTS_SUBJECT}/${studentId}`,
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

  getSubject() {
    return this.http.get<ApiResponse<Subject[]>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.ALL_SUBJECT}`,
      {
        headers: {
          urlpath: `${EndPointRoute.ALL_SUBJECT}`,
        },
      },
    );
  }

  // Insert or Update Student
  upsertDynamicStudent(payload: CreateStudent) {
    return this.http.post<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPSERT_STUDENTS}`,
      payload,
    );
  }

    // Insert or Update Student relation Subject
  upsertDynamicSubject(payload: CreateSubjectStudent) {
    return this.http.post<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPSERT_STUDENTS_SUBJECTS}`,
      payload,
    );
  }

  //  Update Student
  updateDynamicStudent(payload: CreateStudent) {
    return this.http.put<ApiResponse<string>>(
      `${enviroments.API_PUBLIC}${EndPointRoute.UPDATE_STUDENTS}/${payload.studentId}`,
      payload,
    );
  }
}
