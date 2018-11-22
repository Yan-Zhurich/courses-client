import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AutheticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/entity/request/login.requst';
import { SignUpRequest } from 'src/app/entity/request/signup.request';
import { BaseService } from 'src/app/service/base.service';
import { SignUpResponse } from 'src/app/entity/response/signup.response';
import { MessageServcie } from 'src/app/service/message.service';
import { Observable, Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('exists', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SignUpComponent implements OnDestroy {

  private signUpResponseSubscription: Subscription;
  private storeSubscription: Subscription;
  private authData: AppState;
  
  credentials = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    email: new FormControl()
  });
  
  constructor(
    private authenticationService: AutheticationService,
    private baseService: BaseService,
    private messageService : MessageServcie,
    private router: Router,
    private store: Store<AppState>) {
      this.storeSubscription = this.store.select('auth').subscribe((data: AppState) => {
        this.authData = data;
      })
     }

  ngOnDestroy() {
    if(this.signUpResponseSubscription) {
      this.signUpResponseSubscription.unsubscribe();
    }
    this.storeSubscription.unsubscribe();
  }

  private onLogIn = () => {
    this.router.navigate(['/login'])
  };

  private onSignUp = () => {
    let signUpRequest: SignUpRequest = {
      login: this.credentials.get('login').value,
      password: this.credentials.get('password').value,
      email: this.credentials.get('email').value
    };
    this.signUpResponseSubscription = this.authenticationService.signUp(signUpRequest).subscribe((signUpResponse: SignUpResponse) => {
      this.baseService.processSuccessResponseDefault(
        signUpResponse,
        this.onSignUpSuccess 
      );
    })
  };

  private onSignUpSuccess = () => {
    this.messageService.sendMessage({
      header: 'Sign Up Success',
      severity: 'success',
      text: 'You have been registered sucessfully !'
    });
    this.router.navigate(['/login']);
  }

  private onClose = () => {
    this.authData.isLoggedIn ? this.router.navigate(['/courses']) : this.router.navigate(['/not-authorized']);
  };

}
