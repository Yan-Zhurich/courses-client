import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseListItemComponent } from './components/course-list-item/course-list-item.component';
import { FreshCourseDirective } from './directives/fresh-course.directive';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MessageComponent } from './components/message/message.component';
import { DurationPipePipe } from './pipes/duration-pipe.pipe';
import { CourseOrderPipePipe } from './pipes/course-order-pipe.pipe';
import { MessageSeverityDirective } from './directives/message-severity.directive';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderAppender } from './interceptors/header-appender';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducers/auth';
import { SignUpComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

const appRoutes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'not-authorized' , component: NotAuthorizedComponent },
  { path: '**', redirectTo: 'courses', pathMatch: 'full', }
];
@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseListItemComponent,
    FreshCourseDirective,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    MessageComponent,
    DurationPipePipe,
    CourseOrderPipePipe,
    MessageSeverityDirective,
    NewCourseComponent,
    LoginComponent,
    SignUpComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    StoreModule.provideStore({auth: authReducer}),
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderAppender,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewCourseComponent, MessageComponent, LoginComponent]
})
export class AppModule { }
