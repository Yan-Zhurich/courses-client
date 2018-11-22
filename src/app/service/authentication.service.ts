import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoginRequest } from "../entity/request/login.requst";
import { BaseService } from "./base.service";
import { catchError, tap } from "rxjs/operators";
import { LoginResponse } from "../entity/response/login.response";
import { SignUpRequest } from "../entity/request/signup.request";

const SERVICE_URI = 'http://localhost:8080';
@Injectable({
    providedIn: 'root'
})
export class AutheticationService {

    constructor(
        private httpClient: HttpClient,
        private baseService: BaseService,
    ){}

    // need to return headers as well because of JWT token
    public login = (loginRequest : LoginRequest): Observable<HttpResponse<any>>  => {
        return this.httpClient.post<HttpResponse<any>>(SERVICE_URI + "/login", loginRequest, {observe: 'response'})
        .pipe(
            catchError((err) => this.baseService.handleError(err))
        )
    };

    public signUp = (sighUpRequest: SignUpRequest) => {
        return this.httpClient.post(SERVICE_URI + '/signup', sighUpRequest)
        .pipe(            
            catchError((err) => this.baseService.handleError(err))
        );
    };

    public getUserData = () => {
        return this.httpClient.get(SERVICE_URI + "/userdata")
        .pipe(
            catchError((err) => this.baseService.handleError(err))
        );
    };

}
