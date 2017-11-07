import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FintDialogService } from '../shared';
import { IEventsHALPage } from './model';

@Injectable()
export class EventService {
  constructor(private http: Http, private fintDialog: FintDialogService) { }

  all(page: number = 1, pageSize: number = 10, search?: string) {
    let url = 'https://api.felleskomponent.no/audit/events';
    // let url = 'http://localhost:8080/audit/events';
    if (search) { url = `${url}/search/${search}?page=${page}&pageSize=${pageSize}`; }
    else { url = `${url}?page=${page}&pageSize=${pageSize}`; }
    return this.http
      .get(url)
      .debounceTime(3000)
      .distinctUntilChanged()
      .map((res: Response) => res.json() as IEventsHALPage)
      .share()
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}
