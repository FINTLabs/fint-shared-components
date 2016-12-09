import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map, groupBy } from 'lodash';
import { IEvents } from './model';

@Injectable()
export class EventService {
  constructor(private http: Http) { }

  all(): Observable<IEvents[]> {
    return this.http
      .get('https://api.felleskomponent.no/audit/events?pageSize=999999')
      .map((res: Response) => {
        let result = res.json();
        let eventList = result._embedded.mongoAuditEventList;
        return map(groupBy(eventList, (event: IEvents) => event.corrId), corr => {
          let events = map(corr, (e: IEvents) => e.event);
          return {
            corrId: corr[0].corrId,
            orgId: corr[0].orgId,
            source: corr[0].source,
            timestamp: corr[0].timestamp,
            event: events[events.length - 1], // Last event is active
            events: events
          };
        });
      })
      .catch(this.handleError);
  }

  protected handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
