import { Router} from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/share/auth/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountProfileComponent implements OnInit {
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
  startUpload1 = false;
  startUpload2 = false;
  isActive = false;
  isUploadSuccess = false;
  isRunning = false;
  fullName ='';
  dateOfBirth ='';
  sdt ='';
  address ='';
  gender ='';
  hinhAnh = '';

  hiddenSuccessPaymentDisplay = true;

  profileUser: FormGroup= new FormGroup({
    fullName: new FormControl(),
    dateOfBirth: new FormControl(),
    sdt: new FormControl(),
    gender: new FormControl(),
    address: new FormControl(),
  });

  constructor(
    private auth: AuthService,
    private cusService: CustomerService,
    private storage: AngularFireStorage,
  ) {}

  ClickCheckbox(): void {
    this.isAgree = this.isAgree ? false : true;
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getUser();
    this.customerID = this.currentUser?.id;
    this.fullName = this.currentUser?.hoTen || '';;
    this.dateOfBirth = this.currentUser?.ngaySinh || '';;
    this.sdt = this.currentUser?.sdt || '';;
    this.address = this.currentUser?.diaChi || '';;
    this.gender = this.currentUser?.gioiTinh || '';;
    this.profileUser.controls['fullName'].setValue(this.fullName);
    this.profileUser.controls['dateOfBirth'].setValue(this.dateOfBirth);
    this.profileUser.controls['sdt'].setValue(this.sdt);
    this.profileUser.controls['address'].setValue(this.address);
    this.profileUser.controls['gender'].setValue(this.gender);
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
              this.hinhAnh = url;
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
    this.currentUser.hoTen = this.profileUser.value.fullName;
    this.currentUser.ngaySinh = this.profileUser.value.dateOfBirth;
    this.currentUser.sdt = this.profileUser.value.sdt;
    this.currentUser.diaChi = this.profileUser.value.address;
    this.currentUser.gioiTinh = this.profileUser.value.gender;
    this.currentUser.hinhAnh = this.hinhAnh;
    console.log(newUser);
    this.cusService.uploadCus(newUser).subscribe((data) => {
      this.isUploadSuccess = false;
      this.auth.saveUser(data);
    });
  }
}
