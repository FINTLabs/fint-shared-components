import { LibSharedModule } from '../shared/shared.module';
// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { EventRoutes } from './events.routes';
import { EventService } from './events.service';

// Components
import { EventsComponent } from './events.component';
import { EventFlowComponent } from './event-flow/event-flow.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventFlowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LibSharedModule,
    RouterModule.forChild([...EventRoutes])
  ],
  providers: [EventService]
})
export class EventModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EventModule,
      providers: [EventService]
    }
  }
}
