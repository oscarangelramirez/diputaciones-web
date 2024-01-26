import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MaterialModule } from './comun/modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ],
  exports :[
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
