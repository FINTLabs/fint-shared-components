// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadComponent } from './typeahead';
import { FlipCardComponent } from './flip-card/flip-card.component';

// Components
import { PagerComponent } from './pager/pager.component';
import { FaStackComponent } from './fontawesome/fa-stack.component';
import { FaComponent } from './fontawesome/fa.component';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { ErrorComponent } from './dialogs/error/error.component';
import { FintDialogService } from './dialogs/fint-dialog.service';

// Pipes
import { UtcDatePipe } from './pipes/utc-date.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    FaComponent,
    FaStackComponent,
    PagerComponent,
    FlipCardComponent,
    TypeaheadComponent,

    ConfirmDeleteComponent,
    ErrorComponent,

    // Pipes
    HighlightPipe,
    UtcDatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  exports: [
    FaComponent,
    FaStackComponent,
    PagerComponent,
    FlipCardComponent,
    TypeaheadComponent,

    // Pipes
    HighlightPipe,
    UtcDatePipe
  ],
  entryComponents: [ConfirmDeleteComponent, ErrorComponent],
  providers: [FintDialogService]
})
export class LibSharedModule {}
