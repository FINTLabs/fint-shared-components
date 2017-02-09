import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as D3 from '../../d3.bundle';
import { IEvent, IEventGroup, IEvents } from '../model';

export interface FlowEvent {
  detail: IEvents;
  eventGroup: IEventGroup;
}

export interface LinkState {
  ids: string[];
  descission: number[];
  path: [[number, number]];
}
export interface EventState {
  id: string;
  alias?: string;
  code: string;
  aliasCode?: string;
  type: string;
  x: number;
  y: number;
  linkTo?: LinkState;
  arrowType?: string;
}

@Component({
  selector: 'fint-event-flow',
  templateUrl: './event-flow.component.html',
  styleUrls: ['./event-flow.component.scss']
})
export class EventFlowComponent implements OnInit, AfterViewInit {
  @Input() eventGroup: IEventGroup;
  @Output() onOpen: EventEmitter<FlowEvent> = new EventEmitter<FlowEvent>();
  @ViewChild('svg') svg: ElementRef;
  private host;
  private pathFunction;
  private lineFunction;
  private paths;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const me = this;
    const width = 610;
    const height = 570;
    this.host = D3.select(this.svg.nativeElement);
    this.host.attr('viewBox', '0.0 0.0 ' + width + ' ' + height);
    this.pathFunction = D3.line().x(d => d[0]).y(d => d[1]).curve(D3.curveLinearClosed);
    this.lineFunction = D3.line().x(d => d[0]).y(d => d[1]).curve(D3.curveLinear);
    this.paths = {
      downstream: {
        stream: this.pathFunction([[0, 0], [0, 50], [30, 80], [60, 50], [60, 0]]),
        error: this.pathFunction([[0, 0], [0, 50], [25, 80], [50, 50], [50, 0]])
      },
      upstream: {
        stream: this.pathFunction([[0, 30], [0, 80], [60, 80], [60, 30], [30, 0]]),
        error: this.pathFunction([[0, 30], [0, 80], [50, 80], [50, 30], [25, 0]]),
        long: this.pathFunction([[0, 30], [0, 120], [60, 120], [60, 30], [30, 0]])
      }
    };
    const eventConfig = {
      downstream: <EventState[]>[
        { id: 'NEW', code: '10', type: 'stream', x: 219, y: 69 },
        { id: 'CACHE', code: '50', type: 'stream', x: 219, y: 230 },
        {
          id: 'DOWNSTREAM_QUEUE', code: '11', type: 'stream', x: 144, y: 230, linkTo: {
            ids: ['UNABLE_TO_DELIVER'], descission: [-10, 43],
            path: [[-5, 43], [-40, 43], [-40, 310], [363, 310], [363, 60], [310, 60]]
          }
        },
        {
          id: 'DELIVERED_TO_PROVIDER', code: '12', type: 'stream', x: 144, y: 310, linkTo: {
            ids: ['NO_RESPONSE_FOR_PROVIDER', 'PROVIDER_REJECTED', 'PROVIDER_NOT_CONFIRMED'], descission: [-10, 43],
            path: [[-5, 43], [-40, 43], [-40, 230], [363, 230], [363, -20], [310, -20]]
          }
        },
        { id: 'PROVIDER_ACCEPTED', code: '13', type: 'stream', x: 144, y: 393 },
        { id: 'PROVIDER_RESPONSE_ORPHAN', code: '100', type: 'error', x: 80, y: 393 },
      ],
      upstream: <EventState[]>[
        {
          id: 'PROVIDER_RESPONSE', code: '14', type: 'stream', arrowType: 'long', x: 412, y: 350, linkTo: {
            ids: ['PROVIDER_RESPONSE_ORPHAN'], descission: [50, 90],
            path: [[55, 90], [95, 90], [95, 190], [-307, 190], [-307, 118]]
          }
        },
        { id: 'NO_RESPONSE_FOR_PROVIDER', code: '101', type: 'error', x: 482, y: 343 },
        { id: 'PROVIDER_REJECTED', code: '102', type: 'error', x: 482, y: 343 },
        { id: 'PROVIDER_NOT_CONFIRMED', code: '103', type: 'error', x: 482, y: 343 },
        { id: 'UNABLE_TO_DELIVER', code: '104', type: 'error', x: 482, y: 343 },
        { id: 'UPSTREAM_QUEUE', code: '15', alias: 'TEMP_UPSTREAM_QUEUE', aliasCode: '16', type: 'stream', arrowType: 'long', x: 412, y: 230 },
        { id: 'CACHE_RESPONSE', code: '51', type: 'stream', x: 325, y: 230 },
        { id: 'SENT_TO_CLIENT', code: '49', type: 'stream', x: 325, y: 69 },
      ]
    };

    // Create defs
    this.host.append('defs')
      .selectAll('path')
      .data([
        { id: 'downstream_arrow', d: this.paths.downstream.stream },
        { id: 'downstream_error', d: this.paths.downstream.error },
        { id: 'upstream_arrow', d: this.paths.upstream.stream },
        { id: 'upstream_error', d: this.paths.upstream.error },
        { id: 'upstream_long_arrow', d: this.paths.upstream.long },
        { id: 'descission', d: 'm0 0l27 -16l27 16l-27 16z' },
        { id: 'descission_small', d: 'm0 0l12 -9l12 9l-12 9z' }
      ])
      .enter()
      .append('path')
      .attrs({ id: p => p.id, d: p => p.d });

    // Create main canvas
    const container = this.host.append('g');

    // Create up-/down stream arrow paths
    const aw = 60, ah = 570, p = 15;
    const downstreamArrow = this.createGroup(container, 'downstream_direction', 0, 0);
    this.createPath(downstreamArrow, [[p, 0], [aw - p, 0], [aw - p, ah - 30], [aw, ah - 30], [(aw / 2), ah], [0, ah - 30], [p, ah - 30]]);
    downstreamArrow.append('text').attrs({ x: 160, y: -25 }).text('Downstream');

    const upstreamArrow = this.createGroup(container, 'upstream_direction', (width - 60), 0);
    this.createPath(upstreamArrow, [[(aw / 2), 0], [aw, 30], [aw - p, 30], [aw - p, ah], [p, ah], [p, 30], [0, 30]]);
    upstreamArrow.append('text').attrs({ x: -305, y: 35 }).text('Upstream');

    // Client / provider boxes
    const boxWidth = 365, boxHeight = 44;
    const clientCacheService = this.createGroup(container, 'Client_CacheService', ((width - boxWidth) / 2), 0);
    clientCacheService.append('rect').attrs({ 'width': boxWidth, 'height': boxHeight, 'fill': '#ff9900' });
    this.centerText(clientCacheService, 'Client: ' + this.eventGroup.currentEvent.client, 2.2);

    const providerService = this.createGroup(container, 'Provider', ((width - boxWidth) / 2), (height - (boxHeight * 2)));
    providerService.append('rect').attrs({ 'width': boxWidth, 'height': boxHeight, 'fill': '#666666' });
    this.centerText(providerService, 'Provider', 2.2).attr('style', 'fill: #d9d9d9');

    // Cache DB
    const cacheDBWidth = 141;
    const cacheDB = this.createGroup(container, 'Cache_DB', ((width - cacheDBWidth) / 2), 345)
      .attr('class', this.isActive(['CACHE', 'CACHE_RESPONSE']) ? 'active' : '');
    cacheDB.append('path').attrs({ fill: '#b7b7b7', d: 'm0 0l0 0c0 -12 32 -22 72 -22c40 0 72 10 72 22l0 90c0 12 -32 22 -72 22c-40 0 -72 -10 -72 -22z' });
    cacheDB.append('path').attrs({
      stroke: '#efefef', 'stroke-width': 1.0, 'stroke-linejoin': 'round', 'stroke-linecap': 'butt',
      d: 'm144 0l0 0c0 12 -32 22 -72 22c-40 0 -72 -10 -72 -22'
    });
    this.centerText(cacheDB, 'Cache', 2.4);

    // Render downstream
    const downstream = this.createGroup(container, 'downstream', 0, 0);
    const downPath = this.createGroup(downstream, null, 165, 0).attr('class', 'pathLink');
    downPath.append('path')
      .attrs({ d: this.isActive(['NEW', 'CACHE'], true) ? 'm84 147l0 85' : 'm84 147l0 44l-75 0l0 40', class: 'link' });
    downPath.append('use').attrs({
      id: 'decide_NEW__CACHE-DOWNSTREAM_QUEUE', 'xlink:href': '#descission', class: 'descission', x: 56, y: 191
    });
    eventConfig.downstream.forEach(state => this.renderStreamGroup(downstream, 'downstream', state, 6));

    // Render upstream
    const upstream = this.createGroup(container, 'upstream', 0, 0);
    const upPath = this.createGroup(upstream, null, 275, 0).attr('class', 'pathLink');
    upPath.append('path')
      .attrs({ d: this.isActive(['CACHE_RESPONSE', 'SENT_TO_CLIENT'], true) ? 'm80 147l0 83' : 'm80 147l0 44l87 0l0 41', class: 'link' });
    upPath.append('use').attrs({
      id: 'decide_CACHE_RESPONSE__UPSTREAM_QUEUE-SENT_TO_CLIENT', 'xlink:href': '#descission', class: 'descission', x: 54, y: 191
    });
    eventConfig.upstream.forEach(state => this.renderStreamGroup(upstream, 'upstream', state, 4));
  }

  private renderStreamGroup(container, direction: string, state: EventState, lineHeight: number) {
    const stateGroup = this.createGroup(container, state.id, state.x, state.y)
      .attr('class', state.type + (this.isActive([state.id, state.alias]) ? ' active' : ''));
    // stateGroup.append('use').attr('xlink:href', this.getXLinkType(direction, state));
    stateGroup.append('path').attr('d', this.getXLinkType(direction, state));
    const text = `${state.id}_(${state.code})` + (state.alias ? `_/_${state.alias}_(${state.aliasCode})` : '');
    this.centerText(stateGroup, text, lineHeight).call(this.wrap, (state.type === 'stream' ? 60 : 50), true);
    stateGroup.on('click', evt => this.showDetail(state));

    // Render links if present and active
    if (state.linkTo && this.isActive(state.linkTo.ids, true)) {
      const errorLink = stateGroup.append('g').attrs({ class: 'errorLink' });
      errorLink.append('path').attrs({ d: this.lineFunction(state.linkTo.path), class: 'link' });
      errorLink.append('use').attrs({
        'xlink:href': '#descission_small',
        class: 'descission',
        x: state.linkTo.descission[0], y: state.linkTo.descission[1]
      });
    }
  }

  private getXLinkType(direction: string, state) {
    return this.paths[direction][(state.arrowType ? state.arrowType : state.type)];
  }

  private createGroup(elm, id, x, y) {
    return elm.append('g').attrs({ id: id, 'transform': 'translate(' + x + ',' + y + ')' });
  }

  private createPath(elm, pathArray) {
    return elm.append('path').attr('d', this.pathFunction(pathArray));
  }

  private centerText(elm, text, lineHeight) {
    return elm.append('text').text(text).attrs({
      x: function (d) {
        return (elm.node().getBBox().width - this.getComputedTextLength()) / 2;
      },
      y: function (d) {
        return (elm.node().getBBox().height / lineHeight);
      }
    });
  }

  private wrap(textElm, width, center: boolean) {
    function calcCenter(d) {
      const len = this.getComputedTextLength();
      if (len < width) {
        return (width - len) / 2;
      }
      return 0;
    }
    textElm.each(function () {
      const text = D3.select(this);
      const words = text.text().split(/_/);
      let lineNumber = 0;
      text.text(null).selectAll('tspan')
        .data(words)
        .enter()
        .append('tspan')
        .text(d => d)
        .attrs({ x: calcCenter, y: text.attr('y'), dy: d => (++lineNumber * 1.1) + 'em' });
    });
  }

  isActive(status: string[], requireAll?: boolean) {
    const details = this.getDetail(status);
    return (requireAll ? details.length === status.length : details.length);
  }

  getDetail(status: string[]): IEvents[] {
    status = status
      .filter(state => state != null)
      .map(state => state.toLowerCase());
    return this.eventGroup.events.filter((e: IEvents) => {
      return status.indexOf(e.event.status.toLowerCase()) > -1;
    });
  }

  showDetail(state: EventState) {
    const activeEvent = this.getDetail([state.id, state.alias]);
    if (activeEvent.length) {
      this.onOpen.emit({ detail: activeEvent[0], eventGroup: this.eventGroup });
    }
  }
}
