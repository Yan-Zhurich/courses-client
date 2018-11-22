import { Component, OnInit, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { MessageServcie } from '../../service/message.service';
import { Message } from '../../entity/message';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('exists', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class MessageComponent {

  message: Message;
  @Output() close = new EventEmitter();

  constructor() {}

  private onClose = () => {
    this.close.emit();
  }

}
