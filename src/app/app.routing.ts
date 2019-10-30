import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {SystemComponent} from './components/system/system.component';
// import {LoginComponent} from './components/login/login.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'system', component: SystemComponent},
  // {path: 'login', component: LoginComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes, {
  scrollPositionRestoration: 'enabled'
});
