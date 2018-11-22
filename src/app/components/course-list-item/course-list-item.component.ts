import { Component, OnInit } from '@angular/core';
import { Course } from '../../entity/course';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DeleteByIdRequest } from '../../entity/request/delete.byid.request';
import { DeleteByIdResponse } from '../../entity/response/delete.byid.response';
import { CourseService } from '../../service/course.service';
import { MessageServcie } from '../../service/message.service';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent{
    
  @Input() course: Course;
  @Output() delete = new EventEmitter();

  constructor(
    private courseService: CourseService,
    private messageService: MessageServcie) { }

  onDelete(){
    this.delete.emit(this.course);
  }

}
