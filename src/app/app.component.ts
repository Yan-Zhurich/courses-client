import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MessageServcie } from './service/message.service';
import { Message } from './entity/message';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{  

  message: string;
  private socket: WebSocket;
  private messageSubscription: Subscription;

  @ViewChild('message', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private messageService: MessageServcie,
    private componentFactoryResolver: ComponentFactoryResolver){
    this.messageService.getMessage().subscribe(this.handleMessage);
  }

  ngOnDestroy() {
    if(this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
  
  private handleMessage = (message: Message) => {
    this.entry.clear();
    let factory = this.componentFactoryResolver.resolveComponentFactory(MessageComponent);
    let component = this.entry.createComponent(factory);
    component.instance.message = message; 
    component.instance.close.subscribe(() => {
        component.destroy();
    });
  }

  private magicWithChat() {
    this.socket = new WebSocket("ws://localhost:8080/greeting");
    this.socket.onopen = (event) => {
      console.log('connection opened' + event);
      this.socket.send('message send to server !');
    };
    this.socket.onclose = (event) => {
      console.log('connection closed' + event);
    }
    this.socket.onmessage = (event) => {
      console.log('message received' + event);
    }
    
  }

  public initiate() {
    console.log("off");
    this.socket.send("from client");
  }
}
