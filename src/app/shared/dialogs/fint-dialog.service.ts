import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ErrorComponent } from './error/error.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Injectable()
export class FintDialogService {

  constructor(private dialog: MatDialog) { }

  displayHttpError(error: Response): MatDialogRef<ErrorComponent> {
    let body; let err;
    try {
      body = error.json();
      err = body.message;
    } catch (ex) {
      body = error.text();
      err = body;
    }
    const errorDialogRef = this.dialog.open(ErrorComponent);
    errorDialogRef.componentInstance.errorSubtitle = `${error.status} ${'- ' + error.statusText || ''}`;
    errorDialogRef.componentInstance.path = body.path;
    errorDialogRef.componentInstance.errorMessage = err;
    return errorDialogRef;
  }

  displayError(subtitle: string, message: string) {
    const errorDialogRef = this.dialog.open(ErrorComponent);
    errorDialogRef.componentInstance.errorSubtitle = subtitle;
    errorDialogRef.componentInstance.errorMessage = message;
    return errorDialogRef;
  }

  confirmDelete(): MatDialogRef<ConfirmDeleteComponent> {
    return this.dialog.open(ConfirmDeleteComponent, {
      disableClose: false
    });
  }
}
