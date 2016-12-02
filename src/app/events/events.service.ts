import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map, groupBy } from 'lodash';

export interface IEvent {
  corrId: string;
  verb: string;
  status: string;
  time: number;
  orgId: string;
  source: string;
  client: string;
  data: string[];
}
export interface IEvents {
  corrId: string;
  source: string;
  orgId: string;
  timestamp: number;
  event: IEvent;
  events?: IEvent[];
  isOpen?: boolean;
  showDetail?: boolean;
}

@Injectable()
export class EventService {
  constructor(private http: Http) { }

  all(): Observable<IEvents[]> {
    return this.http
      .get('https://api.felleskomponent.no/audit/events')
      .map((res: Response) => {
        return map(groupBy(res.json(), (event: IEvents) => event.corrId), corr => {
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
