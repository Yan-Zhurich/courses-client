import { Directive, Input, OnInit, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appMessageSeverity]'
})
export class MessageSeverityDirective implements OnInit{  

  @Input('appMessageSeverity') severity: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
  }

  ngOnInit() {
    this.renderMessage();
  }

  private renderMessage(): void {
    let messageSeverityImage = this.elementRef.nativeElement.querySelector(".message-severity-image");
    let messageServerityBorder = this.elementRef.nativeElement.querySelector(".message-block");
    let messageHeader = this.elementRef.nativeElement.querySelector(".header");
    switch(this.severity){
      case 'error': {
        this.renderer.setStyle(messageServerityBorder, 'border-left', '5px solid #f15860');
        this.renderer.setAttribute(messageSeverityImage, 'src', 'assets/img/error.png');
        // this.renderer.createText('Error');
        break;
      }
      case 'warning': {
        this.renderer.setStyle(messageServerityBorder, 'border-left', '5px solid #FFF59D');
        this.renderer.setAttribute(messageSeverityImage, 'src', 'assets/img/warning.png');
        // this.renderer.createText('Warning');
        break;
      }
      case 'success': {
        this.renderer.setStyle(messageServerityBorder, 'border-left', '5px solid #08e2ab');
        this.renderer.setAttribute(messageSeverityImage, 'src', 'assets/img/success.png');
        // this.renderer.createText('Success');
      }
    }
  }

}
