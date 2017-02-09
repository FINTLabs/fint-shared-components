import { IEvent, IEvents, IEventGroup, IEventsHALPage } from '../model';

export let mockEvent: IEvent = {
  corrId: '', action: 'GET_ALL_EMPLOYEES', status: '', time: 12341234123, orgId: 'rogfk.no', source: 'Arbeidstaker', client: 'VFS', data: ['', '']
};

export let mockAuditEvent: IEvents = {
  corrId: '', timestamp: 12341234123, orgId: 'rogfk.no', source: 'Arbeidstaker', event: mockEvent
};

export let mockAuditEventGroup: IEventGroup {
  corrId: '', currentEvent: mockEvent, events: [mockAuditEvent]
}

export let mockAuditEvents: IEventsHALPage = {
  totalItems: 1, page: 1, pageCount: 1, pageSize: 10, data: [mockAuditEventGroup]
};
