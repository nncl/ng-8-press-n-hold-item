import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

@Directive({
  selector: '[appPressHold]'
})
export class PressHoldDirective {
  @Output() holdTime: EventEmitter<number | string> = new EventEmitter();
  state: Subject<string> = new Subject();
  cancel: Observable<string>;

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => v === 'cancel'),
      tap(v => {
        console.log('%c stopped hold', 'color: red');
        this.holdTime.emit('cancel');
      })
    );
  }

  @HostListener('touchend', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

  @HostListener('touchstart', ['$event'])
  onHold() {
    console.log('%c started hold', 'color: green');
    this.state.next('start');
    const n = 100;
    interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap(v => {
          this.holdTime.emit(v * n + 1);
        })
      )
      .subscribe();
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove($event: TouchEvent): void {
    console.log('moved', $event);
    this.holdTime.emit('cancel');
  }
}
