// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { EventRoutes } from './events.routes';
import { EventService } from './events.service';

// Components
import { EventsComponent } from './events.component';
import { EventFilterPipe } from './events-filter.pipe';

@NgModule({
  declarations: [
    EventsComponent,
    EventFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([...EventRoutes])
  ],
  providers: [EventService]
})
export class EventModule { }
