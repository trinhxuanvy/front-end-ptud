import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/share/auth/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-liststore',
  templateUrl: './account-liststore.component.html',
  styleUrls: ['./account-liststore.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountListStoreComponent implements OnInit {
  currentUser: any;
  customerID: any;
  listStore: Store[] = [];

  constructor(
    private auth: AuthService,
    private storeService: StoreService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    this.getListStore();
  }

  getListStore() {
    this.storeService.getStoresByOwner(this.customerID).subscribe((data) => {
      console.log(data);
      this.listStore = data;
    });
  }

  ManageStore(id: string){
    this.router.navigate(['manage/store/'+ id]);
  }
}
