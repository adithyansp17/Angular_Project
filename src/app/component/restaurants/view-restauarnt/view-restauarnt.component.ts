import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef } from '@angular/core';
import { Resturants } from '../../../models/restaurant';
import { RestaurantService } from '../../../services/restaurantService';
import { Router } from '@angular/router';
import { RestaurantDetailComponent } from '../../restaurant-detail/restaurant-detail.component';

@Component({
  selector: 'app-view-restauarnt',
  templateUrl: './view-restauarnt.component.html',
  styleUrls: ['./view-restauarnt.component.scss']
})
export class ViewRestauarntComponent {
  arrRes: Resturants[] = [];
  selectedUser:number = 0

  showOverlay: boolean = false;
  toggleOverlay(state: boolean) {
    this.showOverlay = state;
  }
  constructor(private router: Router, private rs: RestaurantService,private resolver: ComponentFactoryResolver) {
    this.rs.getRestaurant().subscribe(data => {
      this.arrRes = data;
      console.log('ArrRes:', this.arrRes);
    });
  }

  deleteRest(id: string) {
    this.rs.deleteRestaurant(id).subscribe(
      deletedRestaurant => {
        this.arrRes = this.arrRes.filter(restaurant => restaurant.id !== id);
        console.log('Restaurant deleted:', deletedRestaurant);
      },
      error => {
        console.error('Failed to delete restaurant:', error);
      }
    );
  }
  SelectId(id:string){
    console.log("here")
    this.router.navigate(['/restaurant', id, { showButton: 'false' }]);
  }

}






  



