export interface IEvent {
  corrId: string;
  action: string;
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
}

export interface IEventGroup {
  corrId: string;
  currentEvent: IEvent;
  events: IEvents[];
  isOpen?: boolean;
  showDetail?: boolean;
}

export interface IEventsHALPage {
  totalItems: number;
  page: number;
  pageCount: number;
  pageSize: number;
  data: IEventGroup[]
}
