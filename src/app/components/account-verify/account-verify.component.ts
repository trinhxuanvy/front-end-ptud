import { Router} from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/share/auth/auth.service';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CustomerService } from 'src/app/services/customer.service';

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
  cmnd ='';

  hiddenSuccessPaymentDisplay = true;

  verifyUser: FormGroup= new FormGroup({
    cmnd: new FormControl(),
  });

  constructor(
    private router: Router,
    private auth: AuthService,
    private cusService: CustomerService,
    private storage: AngularFireStorage,
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser.id;
    this.cmnd = this.currentUser.cmnd;
    this.verifyUser.controls['cmnd'].setValue(this.cmnd);
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
    this.isActive = false;
    this.isUploadSuccess = true;
    this.startUpload1 = false;
    this.startUpload2 = false;
    let newUser = this.currentUser;
    this.currentUser.cmnd = this.verifyUser.value.cmnd;
    this.currentUser.hinhAnhCMNDMatTruoc = this.hinhAnhCMNDMatTruoc;
    this.currentUser.hinhAnhCMNDMatSau = this.hinhAnhCMNDMatSau;
    console.log(newUser);
    this.cusService.uploadCus(newUser).subscribe((data) => {
      this.isUploadSuccess = false;
      this.auth.saveUser(data);
    });
  }
}
