import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import { SystemComponent } from './components/system/system.component';
import {MatTreeModule} from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTreeComponent } from './components/my-tree/my-tree.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {CdkTreeModule} from '@angular/cdk/tree';
// import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import {MatSidenavModule} from '@angular/material';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SystemComponent,
    MyTreeComponent,
    ListItemsComponent,
    AddFormComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    MatTreeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    CdkTreeModule,
    FormsModule,
    SidebarModule.forRoot(),
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
