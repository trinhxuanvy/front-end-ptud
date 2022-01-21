import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core' ;
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(private http: HttpClient, private auth: AuthService, private router: Router ) { }
  isLoggedIn$: Observable<boolean> | undefined;
  isUnLoggedIn$: Observable<boolean> | undefined;
  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn();
    this.isUnLoggedIn$ = this.auth.isUnLoggedIn();
  }
  Logout(){
    this.auth.logout();
  }

}
