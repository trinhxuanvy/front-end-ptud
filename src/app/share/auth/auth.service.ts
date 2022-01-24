import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
interface User {
  _id: string,
  email: string,
  matkhat: string,
  loaiND: string
}
@Injectable()
export class AuthService {

  storageKey: string = 'contact-manager-jwt';
  userKey: string = 'user-jwt';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getToken() !== null);
  private unLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getToken() == null);
  constructor(private router: Router,private httpClient: HttpClient) { }

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
    return this.loggedIn.asObservable();
  }

  isUnLoggedIn() {
    return this.unLoggedIn.asObservable();
  }

  saveUser(user: any): void {
    localStorage.removeItem(this.userKey);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.loggedIn.next(this.getToken() !== null);
    this.unLoggedIn.next(this.getToken() == null);
  }

  getUser() {
    const currentUser: any = localStorage.getItem(this.userKey);
    return JSON.parse(currentUser);
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.userKey);
    this.loggedIn.next(this.getToken() !== null);
    this.unLoggedIn.next(this.getToken() == null);
    this.router.navigate(['/login']);
  }

  changePassword(id: string, pass:string): Observable<any>{
    
    console.log(123);
    console.log(this.getUser());
    const body = { matKhau:pass };
    console.log(body);
    return this.httpClient.put(
      `https://localhost:44349/api/nguoidung/password/${id}`,body)
      // .subscribe(response =>
      //   {
      //     const token = (<any>response).token;
      //     this.setToken(token);
      //     const user = (<any>response).user;
      //     console.log(user);
      //     this.saveUser(user);
      //   });
  }  
  
}
