import { Subject, Observable } from "rxjs";
import { Message } from "../entity/message";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MessageServcie{

    private subject: Subject<any>;

    constructor(){
        this.subject = new Subject<any>();
    }
 
    public sendMessage(message: Message) {       
        this.subject.next(message);
    }
 
    public getMessage(): Observable<any> {
        return this.subject;
    }


    public sendNotAuthorizedErrorMessage() {
        this.sendMessage({
            header: 'Not authorized',
            severity: 'Warning',
            text: 'You are not authorized to complete this action.'
        });
    }

    public sendWrongCredentialsErrorMessage() {
        this.sendMessage({
            header: 'Wrong Credentials',
            severity: 'error',
            text: 'Credentials are invalid. Please retry'
        });
    }

    public sendServerErrorMessage() {
        this.sendMessage({
            header: 'Server error',
            severity: 'error',
            text: 'Unexpected server error.'
        });
    }

    public sendUnexpectedError() {
        this.sendMessage({
            header: 'Unexpected error',
            severity: 'error',
            text: 'Unexpected problem occured, please find shelter as soon as possible. Apocalypse is imminent'
        });
    }
    
}