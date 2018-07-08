import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TokenInterceptor } from './interceptors/token.interceptor';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ToastComponent } from './components/toast/toast.component';
import { PollComponent } from './components/poll/poll.component';
import { CreatePollComponent } from './components/create-poll/create-poll.component';
import { NavComponent } from './components/nav/nav.component';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { ToastService } from './services/toast.service';
import { ApiService } from './services/api.service';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'poll/:id',
    component: PollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createpoll',
    component: CreatePollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'polls',
    component: PollListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'hh',
    component: UpdateUserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    OverviewComponent,
    ToastComponent,
    PollComponent,
    PollListComponent,
    CreatePollComponent,
    NavComponent,
    CreatePollComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ToastService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
