import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { range } from 'lodash';

@Component({
  selector: 'lib-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input() total: number;
  @Input() itemsPerPage: number = 10;

  get totalPages() { return Math.floor(this.total / this.itemsPerPage); }

  _start: number;
  @Input()
  get start(): number { return this._start; }
  set start(value: number) {
    if (value < 0) { value = 0; }
    this._start = value;
    this.startChange.emit(value);
  }
  @Output() startChange: EventEmitter<number> = new EventEmitter<number>();

  _end: number;
  @Input()
  get end(): number { return this._end; }
  set end(value: number) {
    if ((value - this.itemsPerPage) < 0) { value = this.itemsPerPage; }
    this._end = value;
    this.endChange.emit(value);
  }
  @Output() endChange: EventEmitter<number> = new EventEmitter<number>();

  _current: number = 0;
  @Input()
  get current() { return this._current; }
  set current(value) {
    if (value < 0) { value = 0; }
    if (value > this.totalPages) { value = this.totalPages; }
    this._current = value;
    this.start = value * this.itemsPerPage;
    this.end = this.start + this.itemsPerPage;
    this.currentChange.emit(value);
  };
  @Output() currentChange: EventEmitter<number> = new EventEmitter<number>();

  get sequence(): string[] {
    return range(1).map((x, i) => `${(this.start / this.itemsPerPage) + i}`);
  }

  constructor() { }

  ngOnInit() {

  }

  goto(what: string | number) {
    if (typeof (what) === 'string') {
      switch (what) {
        case 'start': this.current = 0; break;
        case 'end': this.current = this.totalPages; break;
        case 'forward': this.current = this.current + 1; break;
        case 'backward': this.current = this.current - 1; break;
      }
    } else {
      this.current = what;
    }
  }
}
