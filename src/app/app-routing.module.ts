import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FortestComponent } from './components/fortest/fortest.component';
import { StoreComponent } from './components/store/store.component';
import { StoreCertificationComponent } from './components/store-certification/store-certification.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ListStoreComponent } from './components/list-store/list-store.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InvoiceOfStoreComponent } from './components/invoice-of-store/invoice-of-store.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { FindShipperComponent } from './components/find-shipper/find-shipper.component';


import { UploadProductComponent } from './components/upload-product/upload-product.component';
import { CartComponent } from './components/cart/cart.component';
import { DeliHistoryComponent } from './components/deli-history/deli-history.component';
import { ProductComponent } from './components/product/product.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { EssentialProductComponent } from './components/essential-product/essential-product.component';
import { AccountComponent } from './components/account/account.component';
import { AccountVerifyComponent } from './components/account-verify/account-verify.component';
import { AccountStoreComponent } from './components/account-store/account-store.component';
import { AccountListStoreComponent } from './components/account-liststore/account-liststore.component';
import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { AccountInvoiceComponent } from './components/account-invoice/account-invoice.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailedComponent } from './components/payment-failed/payment-failed.component';

import { DiseaseStoreComponent } from './components/disease-store/disease-store.component';
import { ResponseComponent } from './components/response/response.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  { path: 'order', component: OrderComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'test', component: FortestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'deli-history', component: DeliHistoryComponent },
  {
    path: 'manage/account',
    component: AccountComponent,
    children: [
      //{ path: "*", component: StoreCertificationComponent },
      { path: 'profile', component: AccountProfileComponent },
      { path: 'verify', component: AccountVerifyComponent },
      { path: 'store', component: AccountStoreComponent },
      { path: 'payment', component: AccountListStoreComponent },
      { path: 'password', component: AccountPasswordComponent },
      { path: 'invoice', component: AccountInvoiceComponent },
    ],
  },
  { path: 'product', component: ProductComponent },
  { path: 'uploadproduct', component: UploadProductComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'manage/store/:id',
    component: StoreComponent,
    children: [
      { path: "*", component: StoreCertificationComponent },
      { path: 'certificate', component: StoreCertificationComponent },
      { path: 'analytics', component: StatisticComponent },
      {
        path: 'response', component: ResponseComponent
      }
    ],
  },
  {
    path: 'find/store',
    component: ListStoreComponent,
  },
  {
    path: 'find/shipper/:id',
    component: FindShipperComponent,
  },
  {
    path: 'find/shipper',
    component: FindShipperComponent,
  },
  //{path:'userinside',component:UserinfoComponent },
  { path: 'invoice-of-store/:id', component: InvoiceOfStoreComponent },


  { path: 'invoice-of-store/:id', component: InvoiceOfStoreComponent },
  { path: 'invoice-of-store', component: InvoiceOfStoreComponent },
  {
    path: 'manage/account/invoice-detail/:id',
    component: InvoiceDetailComponent,
  },
  {
    path: 'store/:id',
    component: StoreInfoComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  { path: 'essential', component: EssentialProductComponent },
  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'payment/failed', component: PaymentFailedComponent },
  { path: 'disease-store', component: DiseaseStoreComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
