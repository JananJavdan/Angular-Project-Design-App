import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DesignToolComponent } from './components/design-tool/design-tool.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'designs', component: DesignToolComponent },
  { path: '', redirectTo: '/design-tool', pathMatch: 'full' },
  { path: 'orders', component: OrderListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm', component: ConfirmationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
