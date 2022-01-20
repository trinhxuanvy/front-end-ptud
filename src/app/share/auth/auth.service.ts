import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
interface User {
  _id: string,
  email: string,
  matkhat: string,
  loaiND: string
}
@Injectable()
export class AuthService {

  storageKey: string = 'contact-manager-jwt';

  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  // setUser(user: User) {
  //   localStorage.setItem('current', user);
  // }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  AccessToken() {
    return new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("contact-manager-jwt"),
      "Content-Type": "application/json"
    })
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  saveUser(user: any): void {
    localStorage.removeItem("user-jwt");
    localStorage.setItem("user-jwt", JSON.stringify(user));
  }

  getUser() {
    const currentUser: any = localStorage.getItem("user-jwt");
    return JSON.parse(currentUser);
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

}
