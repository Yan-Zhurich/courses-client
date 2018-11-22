import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipePipe implements PipeTransform {

  private MINUTES_IN_HOUR = 60;

  transform(value: any, args?: any): any {
    let duration = value;
    if(duration > this.MINUTES_IN_HOUR){
      return Math.floor(duration / this.MINUTES_IN_HOUR) + 'h ' + duration % this.MINUTES_IN_HOUR + 'min';
    }
    return duration % this.MINUTES_IN_HOUR + 'min';
  }

}
