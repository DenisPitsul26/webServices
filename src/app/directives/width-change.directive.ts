import {Directive, ElementRef, OnChanges, OnInit} from '@angular/core';

@Directive({
  selector: '[appWidthChange]'
})
export class WidthChangeDirective implements OnInit, OnChanges {
  constructor(public el: ElementRef) {}

  ngOnChanges() {
    setTimeout(() => {
      console.log(this.el.nativeElement.style.width);
    });
  }

  ngOnInit() {
    console.log(this.el.nativeElement.style.width);
    // this.el.nativeElement.style.width = '200px';
    console.log(this.el.nativeElement.style.width);
  }
}
