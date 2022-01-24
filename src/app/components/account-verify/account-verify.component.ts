import { Router} from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/share/auth/auth.service';
import { Store, } from 'src/app/interfaces/interfaces';
import { StoreService } from 'src/app/services/store.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountVerifyComponent implements OnInit {
  submitted = false;
  isAgree = false;
  currentUser: any;
  customerID = '';
  myData: any;
  paymentType = '';
  handler: any = null;
  postData: any = {};
  postInvoiceDetail: any = {};

  uploadPercent1 = 0;
  uploadPercent2 = 0;
  hinhAnhCMNDMatTruoc = '';
  hinhAnhCMNDMatSau = '';
  startUpload1 = false;
  startUpload2 = false;
  isActive = false;
  isUploadSuccess = false;
  isRunning = false;

  hiddenSuccessPaymentDisplay = true;

  userVerify: FormGroup= new FormGroup({
    storeName: new FormControl(),
    MST: new FormControl(),
    address: new FormControl(),
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private storeService: StoreService,
    private storage: AngularFireStorage
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
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
              this.hinhAnhCMNDMatTruoc = url;
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
              this.hinhAnhCMNDMatSau = url;
            });
          })
        )
        .subscribe();
    }
  }

  uploadData() {
    this.auth.verifyUser(this.customerID, this.hinhAnhCMNDMatTruoc,this.hinhAnhCMNDMatSau).subscribe((data)=>{
    });
  }
}
