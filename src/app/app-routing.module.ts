import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './components/invoice/invoice.component';
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

const routes: Routes = [
  { path: 'order', component: OrderComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'test', component: FortestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'store',
    component: StoreComponent,
    children: [
      //{ path: "*", component: StoreCertificationComponent },
      { path: 'certificate', component: StoreCertificationComponent },
      { path: 'analytics', component: StatisticComponent }
    ],
  },
  {
    path: 'find/store',
    component: ListStoreComponent
  },
  //{path:'userinside',component:UserinfoComponent },
  {path: 'invoice-of-store/:id', component: InvoiceOfStoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
