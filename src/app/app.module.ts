import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LibSharedModule } from './shared/shared.module';
import { EventModule } from './events/events.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,

    EventModule,
    LibSharedModule
  ],
  exports: [EventModule, LibSharedModule],
  providers: []
})
export class LibModule { }
