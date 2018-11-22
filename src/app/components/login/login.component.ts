import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AutheticationService } from '../../service/authentication.service';
import { BaseService } from '../../service/base.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginResponse } from '../../entity/response/login.response';
import { HeaderAppender } from '../../interceptors/header-appender';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/auth';
import { AuthActionType, LoggedInAction, UserDataRetrievedAction } from 'src/app/actions/auth';
import { Subscription, Observable } from 'rxjs';
import { transition, style, animate, trigger } from '@angular/animations';
import { GetUserDataResponse } from 'src/app/entity/response/get.userdata.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('exists', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class LoginComponent implements OnDestroy {

  // @Output() authorized = new EventEmitter();
  private loginSubscription: Subscription;
  private storeSubscription: Subscription;
  private authData: AppState;

  credentials = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  constructor(
    private authenticationService: AutheticationService,
    private router: Router,
    private store: Store<AppState>,
    private baseService: BaseService
  ) {
    this.storeSubscription = store.select('auth').subscribe((data: AppState) => {
      this.authData = data;
    });
  }

  ngOnDestroy(){
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    this.storeSubscription.unsubscribe();
  }

  private onLogIn = () => {
    this.loginSubscription = this.authenticationService.login({
      username: this.credentials.get('login').value,
      password: this.credentials.get('password').value
    }).subscribe((loginResponse: HttpResponse<any>) => {
      this.store.dispatch(new LoggedInAction({
        token: loginResponse.headers.get('Authorization')
      }));
      this.router.navigate(['/courses'])
      // this.authorized.emit();
      // token-authentication passed, sending request for recieving user data;
      this.authenticationService.getUserData().subscribe(this.onGetUserData);
    })
  }

  private onSignUp = () => {
    this.router.navigate(['/signup']);
  }

  private onClose = () => {
    this.authData.isLoggedIn ? this.router.navigate(['/courses']) : this.router.navigate(['/not-authorized']);
  };

  private onGetUserData = (getUserDataResponse: GetUserDataResponse) => {
    this.baseService.processSuccessResponseDefault(
      getUserDataResponse,
      () => this.store.dispatch(new UserDataRetrievedAction(getUserDataResponse)
    ));
  }

}
