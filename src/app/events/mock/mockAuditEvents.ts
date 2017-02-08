export let mockEvent = {
  corrId: '', verb: 'GET_ALL_EMPLOYEES', status: '', time: 12341234123, orgId: 'rogfk.no', source: 'Arbeidstaker', client: 'VFS', data: ['', '']
};

export let mockAuditEvent = {
  corrId: '', source: 'Arbeidstaker', orgId: 'rogfk.no', timestamp: 12341234123, event: mockEvent,
  events: [mockEvent]
};

export let mockAuditEvents = {
  totalItems: 1, page: 1, pageCount: 1, pageSize: 10, data: [mockAuditEvent]
};
