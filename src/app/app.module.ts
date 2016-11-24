import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { LibSharedModule } from './shared/shared.module';
import { EventModule } from './events/events.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule, //.forRoot(),

    EventModule,
    LibSharedModule
  ],
  declarations: [
  ],
  exports: [
    EventModule,
    LibSharedModule
  ]
})
export class LibModule { }
