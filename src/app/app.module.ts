import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { ProgressBarModule } from 'angular-progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxDividerModule,
} from 'igniteui-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

//Component
import { SpinnerComponent } from './share/spinner/spinner.component';
import { AppComponent } from './app.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { OrderComponent } from './components/order/order.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderRowComponent } from './components/order/order--row/order--row.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FortestComponent } from './components/fortest/fortest.component';
import { StoreComponent } from './components/store/store.component';
import { StoreCertificationComponent } from './components/store-certification/store-certification.component';
import { SideboardComponent } from './share/sideboard/sideboard.component';
import { HeaderStoreComponent } from './share/header-store/header-store.component';
import { ListStoreComponent } from './components/list-store/list-store.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InvoiceOfStoreComponent } from './components/invoice-of-store/invoice-of-store.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { ProductComponent } from './components/product/product.component';
import { AccountComponent } from './components/account/account.component';
import { AccountVerifyComponent } from './components/account-verify/account-verify.component';
import { AccountStoreComponent } from './components/account-store/account-store.component';
import { AccountListStoreComponent } from './components/account-liststore/account-liststore.component';
import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { AccountInvoiceComponent } from './components/account-invoice/account-invoice.component';
// Service
import { AuthService } from './share/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { FindShipperComponent } from './components/find-shipper/find-shipper.component';

import { UploadProductComponent } from './components/upload-product/upload-product.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { CartComponent } from './components/cart/cart.component';

import { DeliHistoryComponent } from './components/deli-history/deli-history.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { RatingComponent } from './components/rating/rating.component';
import { EssentialProductComponent } from './components/essential-product/essential-product.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailedComponent } from './components/payment-failed/payment-failed.component';
import { DiseaseStoreComponent } from './components/disease-store/disease-store.component';
import { ResponseComponent } from './components/response/response.component';
import { AdminComponent } from './components/admin/admin.component';
import { PolicyDiaglog } from './components/contract/contract.component';

export function tokenGetter() {
  return localStorage.getItem('contact-manager-jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    StatisticComponent,
    SpinnerComponent,
    InvoiceComponent,
    OrderComponent,
    OrderRowComponent,
    CheckoutComponent,
    FortestComponent,
    StoreComponent,
    StoreCertificationComponent,
    SideboardComponent,
    HeaderStoreComponent,
    ListStoreComponent,
    InvoiceOfStoreComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    AccountProfileComponent,
    FindShipperComponent,
    DeliHistoryComponent,
    ProductComponent,
    UploadProductComponent,
    InvoiceDetailComponent,
    StoreInfoComponent,
    CartComponent,
    ProductDetailComponent,
    CommentsComponent,
    RatingComponent,
    EssentialProductComponent,
    AccountComponent,
    AccountVerifyComponent,
    AccountStoreComponent,
    AccountListStoreComponent,
    AccountPasswordComponent,
    AccountInvoiceComponent,

    PaymentSuccessComponent,
    PaymentFailedComponent,
    DiseaseStoreComponent,
    ResponseComponent,
    AdminComponent,
    PolicyDiaglog
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatRadioModule,
    CarouselModule,
    MatCardModule,
    NgbDropdownModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxDividerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:44349'],
        disallowedRoutes: [],
      },
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ProgressBarModule,
    MatDialogModule,
    NgbModule,
    MatExpansionModule,
    MatPaginatorModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: BUCKET, useValue: 'ptud-94f91.appspot.com' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
