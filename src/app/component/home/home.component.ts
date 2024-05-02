import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   //r = new RestaurantComponent()
constructor(private route:Router){

}
   navigate(){
    this.route.navigate(['/restaurant'])
   }
}
