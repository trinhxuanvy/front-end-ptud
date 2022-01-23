import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import {
  Location,
  Shipper,
  NearestShipper,
  ShipperVanDon,
} from '../../interfaces/interfaces';
import { LocationService } from '../../services/location.service';
import { ShipperService } from '../../services/shipper.service';
import { StoreService } from '../../services/store.service';
import { InvoiceService } from '../../services/invoice.service';
import { FindShipperService } from '../../services/find-shipper.service';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-find-shipper',
  templateUrl: './find-shipper.component.html',
  styleUrls: ['./find-shipper.component.scss'],
})
export class FindShipperComponent implements OnInit {
  invoiceId: string = '';

  postData!: ShipperVanDon;
  shipperDisplay = true;
  shipper!: Shipper;
  currentUser: any;
  isFinding = false;
  radius = 6378;
  limitDistance = 20;
  storeID = '';
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
    private shipperService: ShipperService,
    private storeService: StoreService,
    private invoiceService: InvoiceService,
    private findShipperService: FindShipperService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['id']; //invoiceID
    this.currentUser = this.auth.getUser();
    if (this.invoiceId == undefined) {
      this.storeService
        .getStoreByOwner(this.currentUser.id)
        .subscribe((resultData) => {
          this.storeID = resultData.id;
          this.getShipper();
          this.getMyLocation();
        });
    } else {
      this.invoiceService
        .GetInfOfInvoicesById(this.invoiceId)
        .subscribe((resultData) => {
          this.storeID = resultData[0]?.cuaHang;
          console.log(this.storeID);
          this.getShipper();
          this.getMyLocation();
        });
    }
  }
  slideClick(_shipper: Shipper) {
    this.shipperDisplay = false;
    this.shipper = _shipper;
    console.log(this.shipper);
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
    let tempObj: Shipper[];

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
              distance: tempD,
            });

            this.filterShipper.push(tempObj[0]);

            if (this.invoiceId != undefined) {
              this.postData = {
                _id: '',
                vandonid: this.invoiceId,
                shipper: tempObj[0]._id,
                khoangcach: tempD,
                trangthai: 'Chưa nhận',
              };
              //console.log(this.postData);
              this.findShipperService
                .MakeShipperVanDon(this.postData)
                .subscribe((shipperData) => {});
            }
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
