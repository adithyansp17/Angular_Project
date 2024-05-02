import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Resturants } from '../models/restaurant';

@Directive({
  selector: '[appRestaurantIsOpen]',
})
export class RestaurantIsOpenDirective {
  @Input('appRestaurantIsOpen') restaurant!: Resturants;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.restaurant.ROpen === false) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'grey');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}
