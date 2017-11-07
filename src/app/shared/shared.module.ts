// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { MatDialogModule, MatButtonModule, MatListModule } from '@angular/material';

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
    BrowserAnimationsModule,
    HttpModule,
    AngularFontAwesomeModule,

    MatDialogModule,
    MatButtonModule,
    MatListModule,
  ],
  exports: [
    CommonModule,
    FlipCardComponent,

    // Pipes
    HighlightPipe,
    UtcDatePipe
  ],
  entryComponents: [ConfirmDeleteComponent, ErrorComponent],
  providers: [FintDialogService]
})
export class LibSharedModule {}
