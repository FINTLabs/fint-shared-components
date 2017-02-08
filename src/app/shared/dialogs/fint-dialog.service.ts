import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ErrorComponent } from './error/error.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Injectable()
export class FintDialogService {

  constructor(private dialog: MdDialog) { }

  displayHttpError(error: Response): MdDialogRef<ErrorComponent> {
    const body = error.json() || '';
    const err = body.message || JSON.stringify(body);
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

  confirmDelete(): MdDialogRef<ConfirmDeleteComponent> {
    return this.dialog.open(ConfirmDeleteComponent, {
      disableClose: false
    });
  }
}
