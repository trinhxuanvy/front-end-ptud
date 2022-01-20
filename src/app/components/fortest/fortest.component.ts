import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location, Shipper, NearestShipper } from '../../interfaces/interfaces';
import { LocationService } from '../../services/location.service';
import { ShipperService } from '../../services/shipper.service';

@Component({
  selector: 'app-fortest',
  templateUrl: './fortest.component.html',
  styleUrls: ['./fortest.component.scss'],
})
export class FortestComponent implements OnInit {
  isFinding = false;
  radius = 6378;
  limitDistance = 5;
  storeID = '61e8d9a95166a6fbc8b8df0c';
  listLocation: Location[] = [];
  listShipper: Shipper[] = [];
  filterShipper: Shipper[] = [];

  listNearestShipper: NearestShipper[] = [];

  myLocation!: Location;

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
    private shipperService: ShipperService
  ) {}

  ngOnInit(): void {
    this.getShipper();
    this.getMyLocation();
  }

  getMyLocation() {
    this.locationService.getLocationOneStore(this.storeID).subscribe((data) => {
      this.myLocation = data;
    });
  }
  getShipper() {
    this.shipperService.getAllShipper().subscribe((data) => {
      this.listShipper = data;
    });
  }

  getListShipper() {
    let tempD;
    let tempObj;

    this.locationService.getLocationShipper().subscribe((data) => {
      if (data.length > 0) {
        this.filterShipper = [];

        data.slice(0, 5).forEach((item) => {
          tempD = this.getDistance(
            this.myLocation.latitude,
            this.myLocation.longtitude,
            item.latitude,
            item.longtitude
          );

          if (tempD <= this.limitDistance) {
            tempObj = this.listShipper.filter(
              (shipper) => shipper._id == item.objectId
            );
            this.listNearestShipper.push({
              shipper: tempObj[0],
              distance: tempD
            });
            
            this.filterShipper.push(tempObj[0]);
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
