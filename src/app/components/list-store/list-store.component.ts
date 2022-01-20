import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  Store,
  Location,
  Product,
  ProductOfStore,
} from '../../interfaces/interfaces';
import { LocationService } from '../../services/location.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListStoreComponent implements OnInit {
  isFinding = false;
  radius = 6371;
  limitDistance = 5;
  listLocation: Location[] = [];
  listProduct: Product[] = [];
  listStore: Store[] = [];
  listProductOfStore: ProductOfStore[] = [];
  myLocation = {
    latitude: 0,
    longtitude: 0,
  };
  carouselOption: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 24,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 2,
        margin: 12,
      },
      600: {
        items: 2,
        margin: 12,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(
    private locationService: LocationService,
    private storeSerive: StoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getMyLocation();
    this.getListProduct();
    this.getListStore();
  }

  getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.myLocation.latitude = data.coords.latitude;
        this.myLocation.longtitude = data.coords.longitude;
      });
    }
  }

  getListProduct() {
    this.productService.getAllProduct().subscribe((data) => {
      this.listProduct = data;
    });
  }

  getListStore() {
    this.storeSerive.getAllStore().subscribe((data) => {
      this.listStore = data;
    });
  }

  getListProductOfStore() {
    let tempD;
    let tempObjProduct: Product[] = [];
    let tempObjStore: Store[] = [];

    this.isFinding = true;

    this.locationService.getLocationStore().subscribe((data) => {
      if (data.length > 0) {
        this.listProductOfStore = [];

        data.slice(0, 5).forEach((item) => {
          tempD = this.getDistance(
            this.myLocation.latitude,
            this.myLocation.longtitude,
            item.latitude,
            item.longtitude
          );
          if (tempD <= this.limitDistance) {
            tempObjStore = this.listStore.filter(
              (store) => store.id == item.objectId
            );
            tempObjProduct = this.listProduct.filter(
              (product) => product.cuaHang == item.objectId
            );
            this.listProductOfStore.push({
              store: tempObjStore[0],
              products: tempObjProduct,
              distance: tempD,
            });
          }
        });
      }

      this.isFinding = false;
    });
  }

  getDistance(
    latitudeA: number,
    longtitudeA: number,
    latitudeB: number,
    longtitudeB: number
  ) {
    let dLat = this.toRad(latitudeB - latitudeA);
    let dLon = this.toRad(longtitudeB - longtitudeA);
    let latA = this.toRad(latitudeA);
    let latB = this.toRad(latitudeB);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latA) * Math.cos(latB);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = this.radius * c;

    return d;
  }

  toRad(value: number) {
    return (Math.PI * value) / 180;
  }
}
