import { Component, Input, Output, EventEmitter } from '@angular/core';
import { range } from 'lodash';

@Component({
  selector: 'fint-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent  {
  _total: number;
  @Input()
  get total(): number { return this._total; }
  set total(value: number) {
    this._total = value;
  }

  _page: number;
  @Input()
  get page(): number { return this._page; }
  set page(value: number) {
    if (value != this._page) {
      if (value < 0) { value = 0; }
      if (this._total && value > this._total) { value = this._total; }
      this._page = value;
      this.pageChange.emit(value);
    }
  }
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  goto(what: string | number) {
    if (typeof (what) === 'string') {
      switch (what) {
        case 'start': this.page = 0; break;
        case 'end': this.page = this.total; break;
        case 'forward': this.page = this.page + 1; break;
        case 'backward': this.page = this.page - 1; break;
      }
    } else {
      this.page = what;
    }
  }
}
