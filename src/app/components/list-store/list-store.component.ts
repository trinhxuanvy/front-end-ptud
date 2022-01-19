import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.scss'],
})
export class ListStoreComponent implements OnInit {
  radius = 6378; // km
  data = [
    {
      latitude: 10.8003328,
      longtitude: 106.6369024,
    },
    {
      latitude: 53.2734,
      longtitude: -7.77832031,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(
      this.getDistance(
        this.data[0].latitude,
        this.data[0].longtitude,
        this.data[1].latitude,
        this.data[1].longtitude
      )
    );
  }

  getListStore() {}

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
