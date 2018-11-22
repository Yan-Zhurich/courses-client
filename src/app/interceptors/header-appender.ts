import { Injectable, OnDestroy } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { BaseService } from "../service/base.service";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers/auth";

@Injectable()
export class HeaderAppender implements HttpInterceptor, OnDestroy {
    
    private authorizationToken: string = null;
    private storeSubscription: Subscription;

    constructor(private store: Store<AppState>) {
        this.storeSubscription = store.select('auth').subscribe((data: AppState) => {
            this.authorizationToken = data.token;
        });
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();    
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authorizationToken) {
            let clone =  req.clone({
                    headers: new HttpHeaders({
                        'Authorization' : this.authorizationToken
                    })
                });
            return next.handle(clone);
        }
        return next.handle(req);
    }

}