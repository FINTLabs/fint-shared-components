import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer, ViewChild } from '@angular/core';

enum SIDES {
  FRONT,
  BACK
}


@Component({
  selector: 'fint-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit, AfterViewInit {
  @Input() axis: string = 'Y';
  @Input() duration: number = 800;
  @ViewChild('frontside') _front: ElementRef;
  @ViewChild('backside') _back: ElementRef;

  _locked: boolean = false;
  _side = SIDES.FRONT;

  constructor(private elm: ElementRef, private renderer: Renderer) { }

  ngOnInit() { }

  ngAfterViewInit() {
    let frontHeight = this._front.nativeElement.firstElementChild ? this._front.nativeElement.firstElementChild.offsetHeight : 0;
    let backHeight = this._back.nativeElement.firstElementChild ? this._back.nativeElement.firstElementChild.offsetHeight : 0;
    let height = Math.max(frontHeight, backHeight) + 20;
    this.renderer.setElementStyle(this.elm.nativeElement, 'min-height', height + 'px'); //this._front.offsetHeight);
  }

  canAnimate() {
    return this._front.nativeElement.animate != null;
  }

  onFlip() {
    if (this._locked) {
      return;
    }

    this._locked = true;

    const scale = (500 + 200) / 500;
    const sideOne = [
      { transform: `translateZ(-200px) rotate${this.axis}(0deg) scale(${scale})` },
      { transform: `translateZ(-100px) rotate${this.axis}(0deg) scale(${scale})`, offset: 0.15 },
      { transform: `translateZ(-100px) rotate${this.axis}(180deg) scale(${scale})`, offset: 0.65 },
      { transform: `translateZ(-200px) rotate${this.axis}(180deg) scale(${scale})` }
    ];

    const sideTwo = [
      { transform: `translateZ(-200px) rotate${this.axis}(180deg) scale(${scale})` },
      { transform: `translateZ(-100px) rotate${this.axis}(180deg) scale(${scale})`, offset: 0.15 },
      { transform: `translateZ(-100px) rotate${this.axis}(360deg) scale(${scale})`, offset: 0.65 },
      { transform: `translateZ(-200px) rotate${this.axis}(360deg) scale(${scale})` }
    ];

    const timing = {
      duration: this.duration,
      iterations: 1,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

    switch (this._side) {
      case SIDES.FRONT:
        this._front.nativeElement.animate(sideOne, timing);
        this._back.nativeElement.animate(sideTwo, timing).onfinish = _ => this.onFlipFinish();

        this._back.nativeElement.focus();
        break;

      case SIDES.BACK:
        this._front.nativeElement.animate(sideTwo, timing);
        this._back.nativeElement.animate(sideOne, timing).onfinish = _ => this.onFlipFinish();

        this._front.nativeElement.focus();
        break;

      default:
        throw new Error('Unknown side');
    }
  }

  onFlipFinish() {
    this._locked = false;
    this._side = (this._side === SIDES.FRONT) ? SIDES.BACK : SIDES.FRONT;
  };
}
