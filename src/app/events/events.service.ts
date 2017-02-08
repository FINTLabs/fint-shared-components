import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map, groupBy } from 'lodash';

import { FintDialogService } from '../shared';
import { IEventsHALPage } from './model';

@Injectable()
export class EventService {
  constructor(private http: Http, private fintDialog: FintDialogService) { }

  all(page: number = 1, search?: string): Observable<IEventsHALPage> {
    return this.http
      .get(`https://api.felleskomponent.no/audit/events?page=${page}&pageSize=10`)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}
