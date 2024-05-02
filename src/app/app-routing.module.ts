import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { RestaurantComponent } from './component/restaurant/restaurant.component';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { DishesComponent } from './component/dishes/dishes.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RestaurantDetailComponent } from './component/restaurant-detail/restaurant-detail.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminGuard } from './guards/adminGuards';
import { AddUserComponent } from './component/users/add-user/add-user.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';

const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurantdetails/:id', component: RestaurantDetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard()] },
  { path: 'home', component: HomeComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'restaurant/:id/:showButton', component: RestaurantDetailComponent },

  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /*,{enableTracing:true}*/)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
