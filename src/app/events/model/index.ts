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

export interface IEventsHALPage {
  total_items: number;
  page: number;
  page_count: number;
  page_size: number;
  _embedded: {
    mongoAuditEventList: IEvents[]
  }
}
