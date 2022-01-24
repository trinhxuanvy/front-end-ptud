import { Router} from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/share/auth/auth.service';
import { Store } from 'src/app/interfaces/interfaces';
import { StoreService } from 'src/app/services/store.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PolicyDiaglog } from '../contract/contract.component';

@Component({
  selector: 'app-account-store',
  templateUrl: './account-store.component.html',
  styleUrls: ['./account-store.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountStoreComponent implements OnInit {
  submitted = false;
  isAgree = false;
  currentUser: any;
  customerID = '';
  myData: any;
  paymentType = '';
  handler: any = null;
  postData: any = {};
  postInvoiceDetail: any = {};

  store: Store = {
    id: '',
    chuCuaHang: '',
    diaChi: '',
    giayChungNhanAnToan: '',
    giayPhepKinhDoanh: '',
    maSoThue: '',
    tenCuaHang: '',
    trangThai: 0,
    doUyTin: 0,
    anhDaiDien: ''
  };
  uploadPercent1 = 0;
  uploadPercent2 = 0;
  giayChungNhanAnToan = '';
  giayPhepKinhDoanh = '';
  startUpload1 = false;
  startUpload2 = false;
  isActive = false;
  isUploadSuccess = false;
  isRunning = false;

  hiddenSuccessPaymentDisplay = true;

  registerStore: FormGroup= new FormGroup({
    storeName: new FormControl(),
    MST: new FormControl(),
    address: new FormControl(),
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private storeService: StoreService,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }

  openDialog() {
    const dialogRef = this.dialog.open(PolicyDiaglog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    // console.log(this.customerID);
  }

  uploadFile1(event: any) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      const filePath = '/images/' + file.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.startUpload1 = true;
      this.uploadPercent1 = 0;
      this.isRunning = true;

      task.percentageChanges().subscribe((percent) => {
        this.uploadPercent1 = percent!;

        if (percent == 100) {
          this.isActive = true;
          this.isRunning = false;
        }
      });
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.giayChungNhanAnToan = url;
            });
          })
        )
        .subscribe();
    }
  }

  uploadFile2(event: any) {
    if (event.target?.files[0]) {
      const file: File = event.target.files[0];
      const filePath = '/images/' + file.name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.startUpload2 = true;
      this.uploadPercent2 = 0;
      this.isRunning = true;

      task.percentageChanges().subscribe((percent) => {
        this.uploadPercent2 = percent!;

        if (percent == 100) {
          this.isActive = true;
          this.isRunning = false;
        }
      });
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.giayPhepKinhDoanh = url;
            });
          })
        )
        .subscribe();
    }
  }

  uploadData() {
    this.isActive = false;
    this.isUploadSuccess = true;
    this.startUpload1 = false;
    this.startUpload2 = false;
    let newStore = this.store;
    newStore.giayChungNhanAnToan = this.giayChungNhanAnToan;
    newStore.giayPhepKinhDoanh = this.giayPhepKinhDoanh;
    newStore.chuCuaHang = this.currentUser.id;
    newStore.diaChi = this.registerStore.value.address;
    newStore.tenCuaHang = this.registerStore.value.storeName;
    newStore.maSoThue = this.registerStore.value.MST;
    console.log(newStore);
    this.storeService.createStore(newStore).subscribe((data) => {
      this.isUploadSuccess = false;
    });
  }
}
