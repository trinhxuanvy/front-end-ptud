import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-certification',
  templateUrl: './store-certification.component.html',
  styleUrls: ['./store-certification.component.scss'],
})
export class StoreCertificationComponent implements OnInit {
  percentLoading = 0;
  store!: Store;
  formUpload = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl('')
  });

  get f() {
    return this.formUpload.controls;
  }

  constructor(
    private uploadFileService: UploadFileService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void { 
    this.getStore();
  }
  
  getStore() {
    this.storeService.getStoreById("61cbfc689097f5200ba0cdd7").subscribe((data) => {
      console.log(data);
      this.store = data;
      console.log(typeof (this.store));
    });
  }

  getFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formUpload.patchValue({
        fileSource: file
      })
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.formUpload.get('fileSource')?.value);

    this.uploadFileService.uploadFile(formData).subscribe((res) => {
      console.log(res);
    })
  }
}
