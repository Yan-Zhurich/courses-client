import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { Course } from '../entity/course';
import { CreateCourseRequest } from '../entity/request/create.course.request';
import { DeleteByIdRequest } from '../entity/request/delete.byid.request';
import { catchError } from 'rxjs/operators'
import { MessageServcie } from './message.service';
import { GetCourseListRequest } from '../entity/request/get.course.list.request';
import { CreateCourseResponse } from '../entity/response/create.course.response';
import { BaseService } from './base.service';

const SERVICE_URI = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService) { 
  }

  public getList(getCourseListRequest: GetCourseListRequest): Observable<Object> {
     return this.http.post(SERVICE_URI + '/courses', getCourseListRequest)
      .pipe(
        catchError((err) =>
          this.baseService.handleError(err))
      );
  }

  public getItemById(id: number) {
    return this.http.get(SERVICE_URI + '/courses/' + id)
    .pipe(
      catchError((err) =>
        this.baseService.handleError(err))
    );
  }

  public updateItem(course: Course, id: number){
    return this.http.patch(SERVICE_URI + '/courses' + id, course)
    .pipe(
      catchError((err) =>
        this.baseService.handleError(err))
    );
  }

  public removeItem(deleteByIdRequest: DeleteByIdRequest){
    return this.http.post(SERVICE_URI + '/courses/deleteById', deleteByIdRequest)
    .pipe(
      catchError((err) =>
        this.baseService.handleError(err))
    );
  }

  public createCourse(createCourseRequest: CreateCourseRequest): Observable<any> {
    return this.http.post(SERVICE_URI + '/courses/create', createCourseRequest)
    .pipe(
      catchError((err) =>
        this.baseService.handleError(err))
    );
  }

}
