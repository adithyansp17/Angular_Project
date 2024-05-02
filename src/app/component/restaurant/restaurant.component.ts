import { Component } from '@angular/core';
import { Resturants } from '../../models/restaurant';
import { Dishes } from '../../models/dishes';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurantService';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent {
  // rName: string= "KFC"
  // Resturants:string[]=["KFC", "BR", "Chaithanya", "Cafe Coffee"]
  arrRes: Resturants[] = [];
  ROpen: boolean = false;

  constructor(private router: Router, private rs: RestaurantService) {
    this.rs.getRestaurant().subscribe((data) => {
      this.arrRes = data;
      console.log(this.arrRes);
    });
  }

  disp(id: string) {
    console.log(id);
    // this.router.navigate(['restaurantdetails/' , id])
    this.router.navigate(['/restaurant', id, { showButton: 'true' }]);
  }
}
