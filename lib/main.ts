import { LibSharedModule } from './shared/shared.module';
import { EventFilterPipe } from './events/events-filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventModule } from './events/events.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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

export * from './events';
export * from './shared';
