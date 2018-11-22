import { Injectable } from '@angular/core'
import { Response } from '../entity/response/response';
import { MessageServcie } from './message.service';
import { EMPTY, Observable, throwError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private messageService: MessageServcie,
    private router: Router
  ) { }

  /**
   * Callback that is used to process onNext() of observable, useful becasue even success responses may contain custom errors
   * which are needed to be properly processed
   * @param response main argument
   * @param successCallback function that will be called if  is false
   * @param errorCallback function that will be called if  is true
   * @param predicate determines which callback is to be triggered
   */
  
  public processSuccessResponse(
    response: Response,
    successCallback: (response: Response) => any,
    errorCallback: (response: Response) => any,
    predicate: (response: Response) => boolean) {
      if(predicate(response)) {
        errorCallback(response);  
        return;
      }
    successCallback(response);
  }

  public checkErrors(response: Response): boolean {
    if(response.status === 'error') {
      return true;
    }
    return false;
  }

  public sendErrorMessage(response : Response) {
    this.messageService.sendMessage({
      header: 'Error',
      severity: response.status,
      text: response.messages[0] || 'Unexpected server error'
    });
  }

  // handling onError() form HttpClient Observables
  public handleError(error : HttpErrorResponse) {
    if(error.error instanceof Event) {       
      this.messageService.sendUnexpectedError();
    }else {      
      // server error
      switch(error.status) {
        case 401: {
          this.messageService.sendWrongCredentialsErrorMessage();
          break;
        }
        case 403: {
          this.messageService.sendNotAuthorizedErrorMessage();
          this.router.navigate(['/not-authorized']);
          break;
        }
        case 500: {
          this.messageService.sendServerErrorMessage();
          break;
        }
        default: {
          this.messageService.sendUnexpectedError();
        }
      }
    }
    return EMPTY;
  }

  public processSuccessResponseDefault(response: Response, successCallback: (response: Response) => any) {
    this.processSuccessResponse(
      response,
      successCallback.bind(this,response),
      this.sendErrorMessage.bind(this,response),
      this.checkErrors.bind(this,response)
    );
  }
}
