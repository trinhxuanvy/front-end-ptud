import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/interfaces';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-store-certification',
  templateUrl: './store-certification.component.html',
  styleUrls: ['./store-certification.component.scss'],
})
export class StoreCertificationComponent implements OnInit {
  store!: Store;
  uploadPercent1 = 0;
  uploadPercent2 = 0;
  giayChungNhanAnToan = '';
  giayPhepKinhDoanh = '';
  startUpload1 = false;
  startUpload2 = false;
  isActive = false;
  isUploadSuccess = false;
  isRunning = false;

  constructor(
    private storeService: StoreService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getStore();
  }

  getStore() {
    this.storeService
      .getStoreById('61cbfc689097f5200ba0cdd7')
      .subscribe((data) => {
        this.store = data;
        this.giayChungNhanAnToan = data.giayChungNhanAnToan;
        this.giayPhepKinhDoanh = data.giayPhepKinhDoanh;
      });
  }

  uploadFile1(event: any) {
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

  uploadFile2(event: any) {
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

  uploadData() {
    this.isActive = false;
    this.isUploadSuccess = true;
    this.startUpload1 = false;
    this.startUpload2 = false;
    let newStore = this.store;
    newStore.giayChungNhanAnToan = this.giayChungNhanAnToan;
    newStore.giayPhepKinhDoanh = this.giayPhepKinhDoanh;
    
    this.storeService.uploadStore(newStore).subscribe((data) => {
      this.store = data;
      this.isUploadSuccess = false;
    });
  }
}
