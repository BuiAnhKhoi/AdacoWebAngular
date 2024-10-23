import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HEADERComponent } from './components/header/header.component';
import { FOOTERComponent } from './components/footer/footer.component';
import { HOMEPAGEComponent } from './components/homepage/homepage.component';
import { TITLEPAGEComponent } from './components/title-page/title-page.component';
import { LOGINComponent } from './components/login/login.component';
import { REGISTERACCOUNTComponent } from './components/register-account/register-account.component';
import { CONTACTComponent } from './components/contact/contact.component';
import { PRODUCTSComponent } from './components/products/products.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { SearchOrderByCodeComponent } from './components/search-order-by-code/search-order-by-code.component';
import { AccountOrderStatusPendingComponent } from './components/account-order-status-pending/account-order-status-pending.component';
import { AccountOrderStatusNeedDeliveryComponent } from './components/account-order-status-need-delivery/account-order-status-need-delivery.component';
import { AccountOrderStatusDeliveryComponent } from './components/account-order-status-delivery/account-order-status-delivery.component';
import { AccountOrderStatusSuccessComponent } from './components/account-order-status-success/account-order-status-success.component';
import { AccountOrderStatusReturnComponent } from './components/account-order-status-return/account-order-status-return.component';
import { AccountOrderStatusCancelComponent } from './components/account-order-status-cancel/account-order-status-cancel.component';
import { AccountOrderHistoryComponent } from './components/account-order-history/account-order-history.component';

import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
    HEADERComponent,
    FOOTERComponent,
    HOMEPAGEComponent,
    TITLEPAGEComponent,
    LOGINComponent,
    REGISTERACCOUNTComponent,
    CONTACTComponent,
    PRODUCTSComponent,
    DetailProductComponent,
    BuyNowComponent,
    CartComponent,
    ProfileUserComponent,
    SearchOrderByCodeComponent,
    AccountOrderStatusPendingComponent,
    AccountOrderStatusNeedDeliveryComponent,
    AccountOrderStatusDeliveryComponent,
    AccountOrderStatusSuccessComponent,
    AccountOrderStatusReturnComponent,
    AccountOrderStatusCancelComponent,
    AccountOrderHistoryComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory : HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    HttpClient,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
