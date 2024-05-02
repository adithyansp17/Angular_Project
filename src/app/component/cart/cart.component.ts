import { Component, Input, OnInit } from '@angular/core';
import { AddToCartService } from '../../services/add-to-cart.service';
import { Carts } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() userId: string = "";
  cartd: Carts = new Carts('', 0, [], []);
  total: number = 0;

  constructor(private cartService: AddToCartService) {}

  ngOnInit() {
    if (this.userId) {
      this.getCartData();
    } else {
      console.error('User ID is not provided');
    }
  }

  getCartData() {
    this.cartService.getCartById(this.userId).subscribe(
      (data) => {
        this.cartd = data;
        this.calculateTotal();
      },
      (error) => {
        console.error('Failed to fetch cart data:', error);
      }
    );
  }

  calculateTotal() {
    this.total = 0;
    for (let i = 0; i < this.cartd.quantity.length; i++) {
      this.total += this.cartd.quantity[i] * this.cartd.arrDishes[i].price;
    }
    this.cartd.Amount = this.total;
    this.cartService.updateCart(this.cartd.id, this.cartd).subscribe();
    console.log(this.cartd);
  }

  AddQty(index: number) {
    this.cartd.quantity[index]++;
    this.calculateTotal();
  }

  SubQty(index: number) {
    if (this.cartd.quantity[index] > 0) {
      this.cartd.quantity[index]--;
      this.calculateTotal();
    }
  }
}
