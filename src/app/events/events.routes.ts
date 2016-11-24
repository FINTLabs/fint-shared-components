import { Routes } from '@angular/router';

import { EventsComponent } from './events.component';

export const EventRoutes: Routes = [
  {
    path: 'events', data: { label: 'Hendelser', icon: 'calendar' }, children: [
      { path: '', redirectTo: '/events/', pathMatch: 'full' },
      { path: ':search?', component: EventsComponent, pathMatch: 'full' }
    ]
  }
];
