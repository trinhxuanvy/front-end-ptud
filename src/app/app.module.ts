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
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';

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
import { AuthService } from './share/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';

export function tokenGetter() {
  return localStorage.getItem("contact-manager-jwt");
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
    CarouselModule
    MatCardModule,
    NgbDropdownModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:44349"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
