import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from '../../service/course.service';
import { CreateCourseRequest } from '../../entity/request/create.course.request';
import { Response } from '../../entity/response/response';
import { CreateCourseResponse } from '../../entity/response/create.course.response';
import { Course } from '../../entity/course';
import { MessageServcie } from '../../service/message.service';
import { Message } from '../../entity/message';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BaseService } from '../../service/base.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
  animations: [
    trigger('exists', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class NewCourseComponent implements OnDestroy {

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<Course>();

  private createCourseResponseSubsctiption: Subscription;

  course = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    date: new FormControl(),
    duration: new FormControl()
  })
  
  constructor(
    private baseService: BaseService,
    private courseService: CourseService,
    private messageService: MessageServcie) { }

  ngOnDestroy() {
    if(this.createCourseResponseSubsctiption) {
      this.createCourseResponseSubsctiption.unsubscribe();
    }
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onSave() {
    let createCourseRequest: CreateCourseRequest = {
      title: this.course.get('title').value,
      description: this.course.get('description').value,
      creationDate: this.course.get('date').value, 
      duration: this.course.get('duration').value
    }
    this.createCourseResponseSubsctiption = this.courseService.createCourse(createCourseRequest).subscribe((response: CreateCourseResponse) => {
      this.baseService.processSuccessResponseDefault(
        response,
        this.onSuccess
      )
    });
  }

  private onSuccess = (response: CreateCourseResponse) => {
    this.messageService.sendMessage({
      header: "Course creation success",
      severity: response.status,
      text: 'Course added successfully !'
    });
    this.save.emit(response.clientCourse);
  }
}
