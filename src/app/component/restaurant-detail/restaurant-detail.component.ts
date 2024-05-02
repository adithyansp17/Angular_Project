import { Component } from '@angular/core';
import { Resturants } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurantService';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Carts } from '../../models/cart';
import { Dishes } from '../../models/dishes';
import { AddToCartService } from '../../services/add-to-cart.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent {
  r: Resturants = new Resturants('', '', '', [], [], true);
  rdish: Resturants = new Resturants('', '', '', [], [], true);
  rId: string = "";
  id: string = "";
  flag: boolean = false;
  cart: Carts = new Carts('', 0, [], []);
  cartold: Carts = new Carts('', 0, [], []);
  buttonVisible: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rs: RestaurantService,
    private cs: AddToCartService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('Route Params:', params);
      console.log(this.r.id);
      var rid = params['id'];
      this.rId = rid;
      console.log('rid:', rid);
      if (rid) {
        this.rs.getRestById(rid).subscribe((data) => {
          this.r = data;
        });
      } else {
        this.router.navigate(['/**']);
      }
      const showButton = params['showButton'];
      if (showButton === 'true') {
        this.buttonVisible = true;
      } else {
        this.buttonVisible = false;
      }
    });
  }
  addToCart(did: string) {
    
    this.flag = false;
    this.id = (localStorage.getItem('userid')!);
    console.log(this.id);

    if (parseInt(this.id) > 0) {
      this.cs.getCartById(this.id).subscribe((data) => {
        this.cart = data;

        for (let i = 0; i < this.cart.arrDishes.length; i++) {
          if (this.cart.arrDishes[i].id == did) {
            this.cart.quantity[i]++;
            this.flag = true;
            console.log(this.cart);
            console.log('OUT');
          }
        }

        if (!this.flag) {
          this.rs.getRestById(this.rId).subscribe((data) => {
            this.rdish = data;

            for (let i = 0; i < this.rdish.dishlist.length; i++) {
              if (this.rdish.dishlist[i].id == did) {
                this.cart.id = this.id;
                this.cart.arrDishes.push(this.rdish.dishlist[i]);
                this.cart.quantity.push(1);
                this.cart.Amount += this.rdish.dishlist[i].price;
                console.log(this.cart);
                console.log('IN');
              }
            }

            // Move updateCart inside the subscribe block
            this.cs.updateCart(this.id, this.cart).subscribe();
          });
        } else {
          // Move updateCart inside the subscribe block
          this.cs.updateCart(this.id, this.cart).subscribe();
        }
      });
    } else {
      alert('Please Sign In!');
    }
  }
}
