import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Store, Location } from '../../interfaces/interfaces';
import { LocationService } from '../../services/location.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.scss'],
})
export class ListStoreComponent implements OnInit {
  radius = 6378; // km
  limitDistance = 5;
  listLocation: Location[] = [];
  listStore: Store[] = [];
  filterStore: Store[] = [];
  myLocation = {
    latitude: 0,
    longtitude: 0,
  };
  carouselOption: OwlOptions = {
    loop: true,
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
    private storeSerive: StoreService
  ) {}

  ngOnInit(): void {
    this.storeSerive.getAllStore().subscribe((data) => {
      this.listStore = data;
    });
  }

  getMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.myLocation.latitude = data.coords.latitude;
        this.myLocation.longtitude = data.coords.longitude;
      });
    }
  }

  getListStore() {
    let tempD;
    let tempObj;
    this.filterStore = [];
    this.locationService.getLocationStore().subscribe((data) => {
      data.forEach((item) => {
        tempD = this.getDistance(
          this.myLocation.latitude,
          this.myLocation.longtitude,
          item.latitude,
          item.longtitude
        );

        if (tempD <= this.limitDistance) {
          tempObj = this.listStore.filter((store) => store.id == item.objectId);
          this.filterStore.push(tempObj[0]);
        }
      });
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
