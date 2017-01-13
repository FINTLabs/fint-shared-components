import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { LibSharedModule } from './shared/shared.module';
import { EventModule } from './events/events.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule, //.forRoot(),

    EventModule,
    LibSharedModule
  ],
  exports: [EventModule, LibSharedModule],
  providers: []
})
export class LibModule { }
