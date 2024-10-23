import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import component
import { HOMEPAGEComponent } from './components/homepage/homepage.component' 
import { LOGINComponent } from './components/login/login.component'
import { REGISTERACCOUNTComponent } from './components/register-account/register-account.component'
import { CONTACTComponent } from './components/contact/contact.component'
import { PRODUCTSComponent } from './components/products/products.component'
import { DetailProductComponent } from './components/detail-product/detail-product.component'
import { BuyNowComponent } from './components/buy-now/buy-now.component'
import { CartComponent } from './components/cart/cart.component'
import { ProfileUserComponent } from './components/profile-user/profile-user.component'
import { SearchOrderByCodeComponent } from './components/search-order-by-code/search-order-by-code.component'
import { AccountOrderStatusPendingComponent } from './components/account-order-status-pending/account-order-status-pending.component'
import { AccountOrderStatusNeedDeliveryComponent } from './components/account-order-status-need-delivery/account-order-status-need-delivery.component'
import { AccountOrderStatusDeliveryComponent } from './components/account-order-status-delivery/account-order-status-delivery.component'
import { AccountOrderStatusSuccessComponent } from './components/account-order-status-success/account-order-status-success.component'
import { AccountOrderStatusReturnComponent } from './components/account-order-status-return/account-order-status-return.component'
import { AccountOrderStatusCancelComponent } from './components/account-order-status-cancel/account-order-status-cancel.component'
import { AccountOrderHistoryComponent } from './components/account-order-history/account-order-history.component'

const routes: Routes = [
  {path: '', component : HOMEPAGEComponent},
  {path: 'login', component: LOGINComponent},
  {path : 'register-account', component : REGISTERACCOUNTComponent},
  {path : 'contact', component : CONTACTComponent},
  {path : 'products/:current_page/:filter', component: PRODUCTSComponent},
  {path : 'detail-product/:id_product', component: DetailProductComponent},
  {path : 'buy-now/:id_product/:quantity', component: BuyNowComponent},
  {path : 'cart', component: CartComponent},
  {path : 'profile/:idUser', component : ProfileUserComponent},
  {path : 'search-order-by-code', component : SearchOrderByCodeComponent},
  {path : 'order-pending', component : AccountOrderStatusPendingComponent},
  {path : 'order-need-delivery', component : AccountOrderStatusNeedDeliveryComponent},
  {path : 'order-delivery', component : AccountOrderStatusDeliveryComponent},
  {path : 'order-success', component : AccountOrderStatusSuccessComponent},
  {path : 'order-return', component: AccountOrderStatusReturnComponent},
  {path : 'order-cancel', component : AccountOrderStatusCancelComponent},
  {path : 'order-history', component : AccountOrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
