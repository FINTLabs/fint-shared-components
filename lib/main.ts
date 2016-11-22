import { EventFilterPipe } from './events/events-filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PagerComponent } from './pager/pager.component';
import { FaStackComponent } from './fontawesome/fa-stack.component';
import { FaComponent } from './fontawesome/fa.component';
import { EventModule } from './events/events.module';
import { EventService } from './events/events.service';

import { UtcDatePipe } from './pipes/utc-date.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EventModule
  ],
  declarations: [
    FaComponent,
    FaStackComponent,
    PagerComponent,

    // Pipes
    EventFilterPipe,
    HighlightPipe,
    UtcDatePipe
  ],
  exports: [
    EventModule,
    FaComponent,
    FaStackComponent,
    PagerComponent,

    // Pipes
    EventFilterPipe,
    HighlightPipe,
    UtcDatePipe,

    // Services
    EventService
  ]
})
export class LibModule { }
