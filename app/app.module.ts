import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './app.shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CustomMatPaginatorIntl } from './comun/utils/CustomMatPaginatorIntl';
import { MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot()

  ],
  exports:[
    HttpClientModule
  ],
  providers: [{
    provide: MatPaginatorIntl, 
    useClass: CustomMatPaginatorIntl
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
