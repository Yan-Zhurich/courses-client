import { Pipe, PipeTransform, Input } from '@angular/core';
import { Course } from '../entity/course';

@Pipe({
  name: 'courseOrderPipe'
})
export class CourseOrderPipePipe implements PipeTransform {

  @Input() courses: Course[];

  transform(value: any, args?: any): any {
    return this.courses.sort(
      (a: Course, b: Course) => a.creationDate.getMilliseconds() - b.creationDate.getMilliseconds());
  }

}
