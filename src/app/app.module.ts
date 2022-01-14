import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './share/spinner/spinner.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderComponent } from './components/order/order.component';
import { AppRoutingModule } from './app-routing.module';
import { OrderRowComponent } from './components/order/order--row/order--row.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FortestComponent } from './components/fortest/fortest.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
