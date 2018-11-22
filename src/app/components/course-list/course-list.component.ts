import { Component, OnInit, OnChanges, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef, OnDestroy } from '@angular/core';
import { Course } from '../../entity/course';
import { CourseService } from '../../service/course.service';
import { Response } from '../../entity/response/response';
import { Observable } from 'rxjs/internal/Observable';
import { MessageServcie } from '../../service/message.service';
import { NewCourseComponent } from '../new-course/new-course.component';
import { DeleteByIdRequest } from '../../entity/request/delete.byid.request';
import { GetCourseListRequest } from '../../entity/request/get.course.list.request';
import { CreateCourseResponse } from '../../entity/response/create.course.response';
import { HttpErrorResponse } from '@angular/common/http';
import { GetCourseListResponse } from '../../entity/response/get.course.list.response';
import { DeleteByIdResponse } from '../../entity/response/delete.byid.response';
import { BaseService } from '../../service/base.service';
import { Subscription } from 'rxjs';

const perAddMoreCourses = 3;
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy{

  @ViewChild('addcourse', {read: ViewContainerRef}) entry: ViewContainerRef;
  searchFieldText: string = 'type something to search';
  courses: Course[] = [];

  private getCourseListResponseSubscription: Subscription;
  private deleteByIdResponseSubscription: Subscription;

  constructor(
    private baseService: BaseService,
    private courseService: CourseService,
    private messageService: MessageServcie,
    private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.onLoadMore();
  }

  ngOnDestroy() {
    if(this.getCourseListResponseSubscription) {
      this.getCourseListResponseSubscription.unsubscribe();
    }
    if(this.deleteByIdResponseSubscription) {
      this.deleteByIdResponseSubscription.unsubscribe();
    }
  }

  public onSearch(){
    alert(this.searchFieldText + Math.random);
  }

  public onDelete(course: Course){
    let request: DeleteByIdRequest = {
      'id': course.id
    };
    this.deleteByIdResponseSubscription = this.courseService.removeItem(request).subscribe((response: DeleteByIdResponse) => {
      if(this.baseService.checkErrors(response)) {
        this.baseService.sendErrorMessage(response);
        return;
      }
      this.onDeleteSuccess(response, course);
    });
  }

  public onLoadMore(){
    let request: GetCourseListRequest = {
      "limit" : perAddMoreCourses,
      "offset" : this.courses.length
    };
    this.getCourseListResponseSubscription = this.courseService.getList(request).subscribe((response: GetCourseListResponse) => {
      this.baseService.processSuccessResponseDefault(
        response,
        this.onLoadMoreSuccess
      );
    });
  }

  public onAdd(){ 
    this.entry.clear();
    let factory = this.componentFactoryResolver.resolveComponentFactory(NewCourseComponent);
    let component = this.entry.createComponent(factory);
    component.instance.cancel.subscribe(() => {
      this.entry.clear()
    });
    component.instance.save.subscribe((course: Course) => {
      this.entry.clear();
      this.courses.push(course);
    });
  }

  private onLoadMoreSuccess = (response: GetCourseListResponse) => {
    response.clientCourseList.forEach((course: Course) => {
      this.courses.push(course);
    });
  }

  private onDeleteSuccess = (response: DeleteByIdResponse, course: Course) => {
    this.messageService.sendMessage({
      header: 'Deletion success',
      severity: response.status,
      text: 'Course deletion completed successfully'
    });
    this.courses.forEach((item, index) => {
      if(item === course) this.courses.splice(index, 1);
    });
  }
  
}
