import { Pipe, PipeTransform } from '@angular/core';
import { Resturants } from '../models/restaurant';

@Pipe({
  name: 'openRestaurants',
  pure: false, 
})
export class OpenRestaurantsPipe implements PipeTransform {
  transform(restaurants: Resturants[]): Resturants[] {
    return restaurants.filter((restaurant) => restaurant.ROpen);
  }
}
