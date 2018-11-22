import { Directive, Input, OnInit, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core'

@Directive({
  selector: '[appFreshCourse]'
})
export class FreshCourseDirective implements OnInit{
  
  @Input('appFreshCourse') date: Date;

  @Input() views: number;

  constructor(private element: ElementRef, private renderer: Renderer2) {        
    
  }

  ngOnInit(){
    this.applyCousreFreshStatus();
    this.applyCourseTopRatedStatus();
  }

  private applyCousreFreshStatus(){
    let now = new Date();
    if(this.date && (now.valueOf() < this.date.valueOf())) {     
      this.renderElement('assets/img/course-item-list/soon.png', 'Coming soon', 'Coming soon');
    }else {
      this.renderElement('assets/img/course-item-list/new.png','New', 'New');
    }
  }

  private applyCourseTopRatedStatus(){
    if(this.views > 3){
      this.renderElement('assets/img/course-item-list/favorite.png','Top rated', 'Top rated');
    }
  }

  private renderElement(url: string, alt: string, title: string){
    let figure = this.renderer.createElement('figure');
    this.renderer.addClass(figure, 'status-icons__item')
    let img = this.renderer.createElement('img');
    this.renderer.addClass(img,'status-icons__image');
    this.renderer.setAttribute(img,'alt', alt);
    this.renderer.setAttribute(img,'title',title);
    this.renderer.setAttribute(img,'src', url);
    this.renderer.appendChild(figure, img);
    this.renderer.appendChild(this.element.nativeElement, figure);
  }

}
