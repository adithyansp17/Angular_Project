  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { UserService } from '../services/user.service';
  import { Users } from '../models/Users';
  import { Carts } from '../models/cart';
  import { AddToCartService } from '../services/add-to-cart.service';
  import { orders } from '../models/order';
  import { OrderService } from '../services/orders.service';
  import { delay } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';




  @Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
  })

  export class BannerComponent {
    username: string = localStorage.getItem('username')!;
    user: UserService;
    arrUser: Users[] = [];
    cartd: Carts = new Carts("", 0, [], []);
    total: number = 0;
    id: string = "";
    max: number = 0;
    
    isLoggedIn: boolean = JSON.parse(localStorage.getItem('logg')!.toLowerCase())
    defaultValue: string = "user";
    tempo: orders = new orders('','','',0,[],[]);
    useradmin: boolean = JSON.parse(localStorage.getItem('admn')!)
    cart: Carts = new Carts("", 0, [], []);
    x:string= ""

    constructor(
      private router: Router,
      private users: UserService,
      private cs: AddToCartService,
      private ors: OrderService
    ) {
      
      this.user = users;
      const userId = parseInt(localStorage.getItem('userid') || '', 10);
      if (!isNaN(userId)) {
        this.id = userId.toString();
      }
      cs.getCartById(this.id).subscribe((data) => {
        this.cartd = data;
      });
    
      console.log('defaultValue:', this.defaultValue); // Check the value here
    }
    

    Validate(email: HTMLInputElement, pwd: HTMLInputElement) {
      this.users.getUsers().subscribe((data) => {
        this.arrUser = data;

        for (let i = 0; i < this.arrUser.length; ++i) {
          if (
            email.value == this.arrUser[i].email &&
            pwd.value == this.arrUser[i].password
          ) {
            
          
            localStorage.setItem('logg','true')
            
            this.isLoggedIn =JSON.parse(localStorage.getItem('logg')!.toLowerCase())
            localStorage.setItem('username',this.arrUser[i].firstName)
            this.username = this.arrUser[i].firstName;
            if (this.arrUser[i].role == 'admin') {
              localStorage.setItem('role', 'admin');
              localStorage.setItem('userid', this.arrUser[i].id.toString());
              this.router.navigate(['/admin']);
              localStorage.setItem('admn','true')
              this.useradmin = JSON.parse(localStorage.getItem('admn')!)
            } else {
              localStorage.setItem('role', 'user');
              localStorage.setItem('userid', this.arrUser[i].id.toString());
              this.router.navigate(['/home']);
              this.cart.id = this.arrUser[i].id;

              this.cs.AddCart(this.cart).subscribe();
              localStorage.setItem('admn','false')
              this.useradmin = JSON.parse(localStorage.getItem('admn')!)
            }
          } else {
            //alert("Invalid Login credentials..");
            this.router.navigate(['/home']);
          }
        }
      });
    }

    logout() {
      localStorage.setItem('logg','false')
      this.isLoggedIn = JSON.parse(localStorage.getItem('logg')!.toLowerCase())
      console.log(this.isLoggedIn)
      this.router.navigate(['/home']);
      this.cartd = new Carts('', 0, [], []);
      this.total = 0;
      localStorage.setItem('userid', '0');
      localStorage.setItem('admn','false')
      this.useradmin = JSON.parse(localStorage.getItem('admn')!)
      localStorage.setItem('role','')
      localStorage.setItem('username','')
    }

    navigateToAddUser() {
      const defaultValue = 'user';
      this.router.navigate(['/add-user'], { queryParams: { defaultValue } });
    }

    checkout() {
      this.ors.getOrder().subscribe(data=>{
        
          const largestId = Math.max(...data.map((item) => parseInt(item.id)));
        console.log("here",largestId)
        this.x = (largestId + 1).toString()
       
      })
      this.cs.getCartById(this.id).subscribe((data) => {
        this.cartd = data;
  
        for (let i = 0; i < this.cartd.quantity.length; ++i) {
          this.total += this.cartd.arrDishes[i].price * this.cartd.quantity[i];
        }
        this.tempo = new orders(
          this.x,
          this.id,
          '',
          this.total,
          this.cartd.arrDishes,
          this.cartd.quantity
        );
        this.ors.addOrder(this.tempo).subscribe((data) => {
          console.log(this.tempo);
        });
  
        this.cs.DeleteCart(this.cartd.id).subscribe();
        this.cart.id = this.cartd.id
        this.cs.AddCart(this.cart).subscribe();

        alert("Order confirmed with Rs."+this.cartd.Amount)
      });
    }
  }
