import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/reducers/auth';
import { Store } from '@ngrx/store';
import { AutheticationService } from 'src/app/service/authentication.service';
import { LoggedOutAction } from 'src/app/actions/auth';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  userFirstName: string;
  isLoggedIn: boolean;

  private storeSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private authenticationService: AutheticationService,
    private router: Router
  ) {
    this.storeSubscription = store.select('auth').subscribe((data: AppState) => {
      this.userFirstName = data.user.username;  
      this.isLoggedIn = data.isLoggedIn;
    });
  }

  ngOnDestroy() {
    if(this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  public onLogOut() {
    this.store.dispatch(new LoggedOutAction());
    this.router.navigate(['/not-authorized']);
  }

  public onLogIn() {
    this.router.navigate(['/login']);
  }

}
