import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer } from '@angular/core';

export enum SIDES {
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

  _locked: boolean = false;
  _side = SIDES.FRONT;
  _front;
  _back;

  constructor(private elm: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this._front = this.elm.nativeElement.querySelector('.frontside');
    this._back = this.elm.nativeElement.querySelector('.backside');
  }

  ngAfterViewInit() {
    let frontHeight = this._front.firstElementChild.offsetHeight;
    let backHeight = this._back.firstElementChild.offsetHeight;
    let height = Math.max(frontHeight, backHeight) + 20;
    this.renderer.setElementStyle(this.elm.nativeElement, 'min-height', height + 'px'); //this._front.offsetHeight);
  }

  canAnimate() {
    return this._front.animate != null;
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
        this._front.animate(sideOne, timing);
        this._back.animate(sideTwo, timing).onfinish = _ => this.onFlipFinish();

        this._back.focus();
        break;

      case SIDES.BACK:
        this._front.animate(sideTwo, timing);
        this._back.animate(sideOne, timing).onfinish = _ => this.onFlipFinish();

        this._front.focus();
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
