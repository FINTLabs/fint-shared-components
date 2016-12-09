import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as D3 from '../../d3.bundle';
import { each, map } from 'lodash';
import { IEvent, IEvents } from '../model';

@Component({
  selector: 'fint-event-flow',
  templateUrl: './event-flow.component.html',
  styleUrls: ['./event-flow.component.scss']
})
export class EventFlowComponent implements OnInit, AfterViewInit {
  @Input() event: IEvents;
  @Output() onOpen: EventEmitter<{ eventDetail: IEvent, event: IEvents }> = new EventEmitter<{ eventDetail: IEvent, event: IEvents }>();
  @ViewChild('svg') svg: ElementRef;
  private host;
  private pathFunction;
  private lineFunction;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let me = this;
    let width = 610;
    let height = 570;
    this.host = D3.select(this.svg.nativeElement);
    this.host.attr('viewBox', '0.0 0.0 ' + width + ' ' + height);
    this.pathFunction = D3.line().x(d => d[0]).y(d => d[1]).curve(D3.curveLinearClosed);
    this.lineFunction = D3.line().x(d => d[0]).y(d => d[1]).curve(D3.curveLinear);

    let eventConfig = {
      downstream: [
        { id: 'NEW', type: 'stream', x: 219, y: 69 },
        { id: 'CACHE', type: 'stream', x: 219, y: 230 },
        {
          id: 'DOWNSTREAM_QUEUE', type: 'stream', x: 144, y: 230, linkTo: {
            ids: ['UNABLE_TO_DELIVER'], descission: [-10, 43],
            path: [[-5, 43], [-40, 43], [-40, 310], [363, 310], [363, 60], [310, 60]]
          }
        },
        {
          id: 'DELIVERED_TO_PROVIDER', type: 'stream', x: 144, y: 310, linkTo: {
            ids: ['NO_RESPONSE_FOR_PROVIDER', 'PROVIDER_REJECTED', 'PROVIDER_NOT_CONFIRMED'], descission: [-10, 43],
            path: [[-5, 43], [-40, 43], [-40, 230], [363, 230], [363, -20], [310, -20]]
          }
        },
        { id: 'PROVIDER_ACCEPTED', type: 'stream', x: 144, y: 393 },
        { id: 'PROVIDER_RESPONSE_ORPHAN', type: 'error', x: 80, y: 393 },
      ],
      upstream: [
        {
          id: 'PROVIDER_RESPONSE', type: 'stream', arrowType: 'long', x: 412, y: 350, linkTo: {
            ids: ['PROVIDER_RESPONSE_ORPHAN'], descission: [50, 90],
            path: [[55, 90], [95, 90], [95, 190], [-307, 190], [-307, 118]]
          }
        },
        { id: 'NO_RESPONSE_FOR_PROVIDER', type: 'error', x: 482, y: 343 },
        { id: 'PROVIDER_REJECTED', type: 'error', x: 482, y: 343 },
        { id: 'PROVIDER_NOT_CONFIRMED', type: 'error', x: 482, y: 343 },
        { id: 'UNABLE_TO_DELIVER', type: 'error', x: 482, y: 343 },
        { id: 'UPSTREAM_QUEUE', type: 'stream', arrowType: 'long', x: 412, y: 230 },
        { id: 'CACHE_RESPONSE', type: 'stream', x: 325, y: 230 },
        { id: 'SENT_TO_CLIENT', type: 'stream', x: 325, y: 69 },
      ]
    };

    // Create defs
    this.host.append('defs')
      .selectAll('path')
      .data([
        { id: 'downstream_arrow', d: this.pathFunction([[0, 0], [0, 50], [30, 80], [60, 50], [60, 0]]) },
        { id: 'downstream_error', d: this.pathFunction([[0, 0], [0, 50], [25, 80], [50, 50], [50, 0]]) },
        { id: 'upstream_arrow', d: this.pathFunction([[0, 30], [0, 80], [60, 80], [60, 30], [30, 0]]) },
        { id: 'upstream_error', d: this.pathFunction([[0, 30], [0, 80], [50, 80], [50, 30], [25, 0]]) },
        { id: 'upstream_long_arrow', d: this.pathFunction([[0, 30], [0, 120], [60, 120], [60, 30], [30, 0]]) },
        { id: 'descission', d: 'm0 0l27 -16l27 16l-27 16z' },
        { id: 'descission_small', d: 'm0 0l12 -9l12 9l-12 9z' }
      ])
      .enter()
      .append('path')
      .attrs({ id: p => p.id, d: p => p.d });

    // Create main canvas
    let container = this.host.append('g');

    // Create up-/down stream arrow paths
    let aw = 60; let ah = 570; let p = 15;
    let downstreamArrow = me.createGroup(container, 'downstream_direction', 0, 0);
    me.createPath(downstreamArrow, [[p, 0], [aw - p, 0], [aw - p, ah - 30], [aw, ah - 30], [(aw / 2), ah], [0, ah - 30], [p, ah - 30]]);
    downstreamArrow.append('text').attrs({ x: 160, y: -25 }).text('Downstream');

    let upstreamArrow = me.createGroup(container, 'upstream_direction', (width - 60), 0);
    me.createPath(upstreamArrow, [[(aw / 2), 0], [aw, 30], [aw - p, 30], [aw - p, ah], [p, ah], [p, 30], [0, 30]]);
    upstreamArrow.append('text').attrs({ x: -305, y: 35 }).text('Upstream');

    // Client / provider boxes
    let boxWidth = 365; let boxHeight = 44;
    let clientCacheService = me.createGroup(container, 'Client_CacheService', ((width - boxWidth) / 2), 0);
    clientCacheService.append('rect').attrs({ 'width': boxWidth, 'height': boxHeight, 'fill': '#ff9900' });
    me.centerText(clientCacheService, 'Client: ' + me.event.event.client, 2.2);

    let providerService = me.createGroup(container, 'Provider', ((width - boxWidth) / 2), (height - (boxHeight * 2)));
    providerService.append('rect').attrs({ 'width': boxWidth, 'height': boxHeight, 'fill': '#666666' });
    me.centerText(providerService, 'Provider', 2.2).attr('style', 'fill: #d9d9d9');

    // Cache DB
    let cacheDBWidth = 141;
    let cacheDB = me.createGroup(container, 'Cache_DB', ((width - cacheDBWidth) / 2), 345)
      .attr('class', me.isActive(['CACHE', 'CACHE_RESPONSE']) ? 'active' : '');
    cacheDB.append('path').attrs({ fill: '#b7b7b7', d: 'm0 0l0 0c0 -12 32 -22 72 -22c40 0 72 10 72 22l0 90c0 12 -32 22 -72 22c-40 0 -72 -10 -72 -22z' });
    cacheDB.append('path').attrs({
      stroke: '#efefef', 'stroke-width': 1.0, 'stroke-linejoin': 'round', 'stroke-linecap': 'butt',
      d: 'm144 0l0 0c0 12 -32 22 -72 22c-40 0 -72 -10 -72 -22'
    });
    me.centerText(cacheDB, 'Cache', 2.4);

    // Render downstream
    let downstream = me.createGroup(container, 'downstream', 0, 0);
    let downPath = me.createGroup(downstream, null, 165, 0).attr('class', 'pathLink');
    downPath.append('path')
      .attrs({ d: me.isActive(['NEW', 'CACHE'], true) ? 'm84 147l0 85' : 'm84 147l0 44l-75 0l0 40', class: 'link' });
    downPath.append('use').attrs({
      id: 'decide_NEW__CACHE-DOWNSTREAM_QUEUE', 'xlink:href': '#descission', class: 'descission', x: 56, y: 191
    });
    each(eventConfig.downstream, state => me.renderStreamGroup(downstream, 'downstream', state, 6));

    // Render upstream
    let upstream = me.createGroup(container, 'upstream', 0, 0);
    let upPath = me.createGroup(upstream, null, 275, 0).attr('class', 'pathLink');
    upPath.append('path')
      .attrs({ d: me.isActive(['CACHE_RESPONSE', 'SENT_TO_CLIENT'], true) ? 'm80 147l0 83' : 'm80 147l0 44l87 0l0 41', class: 'link' });
    upPath.append('use').attrs({
      id: 'decide_CACHE_RESPONSE__UPSTREAM_QUEUE-SENT_TO_CLIENT', 'xlink:href': '#descission', class: 'descission', x: 54, y: 191
    });
    each(eventConfig.upstream, state => me.renderStreamGroup(upstream, 'upstream', state, 4));
  }

  private renderStreamGroup(container, direction: string, state, lineHeight: number) {
    let stateGroup = this.createGroup(container, state.id, state.x, state.y)
      .attr('class', state.type + (this.isActive([state.id], true) ? ' active' : ''));
    stateGroup.append('use').attr('xlink:href', this.getXLinkType(direction, state));
    this.centerText(stateGroup, state.id, lineHeight).call(this.wrap, (state.type === 'stream' ? 60 : 50), true);
    stateGroup.on('click', evt => this.showDetail(state.id));

    // Render links if present and active
    if (state.linkTo && this.isActive(state.linkTo.ids, true)) {
      let errorLink = stateGroup.append('g').attrs({ class: 'errorLink' });
      errorLink.append('path').attrs({ d: this.lineFunction(state.linkTo.path), class: 'link' });
      errorLink.append('use').attrs({
        'xlink:href': '#descission_small',
        class: 'descission',
        x: state.linkTo.descission[0], y: state.linkTo.descission[1]
      });
    }
  }

  private getXLinkType(direction: string, state) {
    return '#' + direction
      + (state.arrowType ? '_' + state.arrowType : '')
      + (state.type === 'stream' ? '_arrow' : '_error');
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
      let len = this.getComputedTextLength();
      if (len < width) {
        return (width - len) / 2;
      }
      return 0;
    }
    textElm.each(function () {
      let text = D3.select(this);
      let words = text.text().split(/_/);
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
    let details = this.getDetail(status);
    return (requireAll ? details.length === status.length : details.length);
  }

  getDetail(status: string[]): IEvent[] {
    status = map(status, state => state.toLowerCase());
    return this.event.events.filter((e: IEvent) => status.indexOf(e.status.toLowerCase()) > -1);
  }

  showDetail(name: string) {
    let activeEvent = this.getDetail([name]);
    if (activeEvent.length) {
      this.onOpen.emit({ eventDetail: this.getDetail([name])[0], event: this.event });
    }
  }
}
