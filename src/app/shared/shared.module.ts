// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MatDialogModule, MatButtonModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { FlipCardComponent } from './flip-card/flip-card.component';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';
import { ErrorComponent } from './dialogs/error/error.component';
import { FintDialogService } from './dialogs/fint-dialog.service';

// Pipes
import { UtcDatePipe } from './pipes/utc-date.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [
    FlipCardComponent,
    ConfirmDeleteComponent,
    ErrorComponent,

    // Pipes
    HighlightPipe,
    UtcDatePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  exports: [
    FlipCardComponent,

    // Pipes
    HighlightPipe,
    UtcDatePipe
  ],
  entryComponents: [ConfirmDeleteComponent, ErrorComponent],
  providers: [FintDialogService]
})
export class LibSharedModule {}
