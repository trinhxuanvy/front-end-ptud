import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  currentUser: any
  constructor(private auth: AuthService) { }
  ngOnInit(): void {
    this.currentUser = this.auth.getUser()
    console.log(typeof(this.currentUser.matKhau));
  }
}
