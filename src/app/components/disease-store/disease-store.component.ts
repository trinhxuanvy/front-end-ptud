import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Store } from 'src/app/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-disease-store',
  templateUrl: './disease-store.component.html',
  styleUrls: ['./disease-store.component.scss']
})
export class DiseaseStoreComponent implements OnInit {
  storeLevel = '';
  storeR: Array<Store>=[];
  storeB: Array<Store>=[];
  storeY: Array<Store>=[];
  constructor(private locationService:LocationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.storeLevel=this.route.snapshot.params['level'];
    this.locationService.getStoresRedZone().subscribe((originalData: Array<Store>)=>{
      this.storeR=originalData;
    })
    this.locationService.getStoresBlueZone().subscribe((originalData: Array<Store>)=>{
      this.storeB=originalData;
    })
    this.locationService.getStoresYellowZone().subscribe((originalData: Array<Store>)=>{
      this.storeY=originalData;
    })
  }

}
