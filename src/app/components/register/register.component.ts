import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/share/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  invalidAccount: boolean = false;
  constructor(private http: HttpClient, private auth: AuthService, private router: Router ) { }
  ngOnInit(): void {}

  submit(form:NgForm) {
    const values = form.value;
    const account = {
      "email": values.username,
      "matKhau": values.password
    }
    console.log(account);
    this.http.post("https://localhost:44349/api/auth/register", account).subscribe(response =>
    {
      const token = (<any>response).token;
      this.auth.setToken(token);
      console.log(token);
      const user = (<any>response).user;
      console.log(user);
      this.auth.saveUser(user);
      this.router.navigate(['login']);
    }, err =>
    {
      this.invalidAccount = true;
      console.log(err.error);
    })
  }

  login()
  {
    this.router.navigate(['register']);
  }
}
