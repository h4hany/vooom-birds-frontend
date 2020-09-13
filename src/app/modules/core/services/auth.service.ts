import {Injectable} from '@angular/core';
import {ApiService} from '@shared/services/api.service';
import {AngularTokenService} from 'angular-token';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {User} from '@models/user.model';
import {ExampleService} from './api/Example.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signInPath = 'signIn';
  registerAccountPath = 'signUp';
  currentUser: User;

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private api: ApiService,
              private tokenService: AngularTokenService) {
  }

  signUp(params): Observable<any> {
    // return this.api.post(this.registerAccountPath, params);
    return this.tokenService.registerAccount({...params});
  }

  signIn(params): Observable<any> {
    const subject = new Subject<boolean>();
    let isLogin = false;
    this.api.post(this.signInPath, params, {observe: 'response'}).subscribe(data => {
        const token = {};
        token['Access-Token'] = data.headers.get('Access-Token');
        token['Uid'] = data.headers.get('Uid');
        token['Client'] = data.headers.get('Client');
        token['expiry'] = data.headers.get('expiry');
        token['token-type'] = data.headers.get('token-type');
        localStorage.setItem('token', JSON.stringify(token));
        this.isAuthenticatedSubject.next(true);
        isLogin = true;
        subject.next(isLogin);
      }, error => {
        this.isAuthenticatedSubject.next(false);
        subject.error(error);
      }
    );
    return subject.asObservable();
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }


  isLoggedIn(): boolean {
    return !this.isTokenExpired(this.getToken());
  }

  logout() {
    // localStorage.removeItem('');
    localStorage.clear();
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }
    const date = new Date(token['expiry'] * 1000);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

}
