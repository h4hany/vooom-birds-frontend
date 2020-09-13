import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  private readonly api: string = environment.backEndApi + '/api/';
  private readonly withoutApi: string = environment.backEndApi + '/';


  private readonly signIn = 'auth/sign_in';
  private readonly signUp = 'auth';
  private readonly getUser = 'sessions/get_user';


  private readonly ownerProfile = 'owner_profiles';


  constructor() {
  }

  get(url: string) {
    if (url.includes('signIn') || url.includes('signUp')) {
      return this.withoutApi + this._propertyGetter(url);
    }
    return this.api + this._propertyGetter(url);
  }

  getWithParams(url: string, params: any[]) {
    let urlParams = '/';
    params.forEach((param) => {
      urlParams += param + '/';
    });
    return this.get(url) + urlParams;
  }

  private _propertyGetter(url: string) {
    return this[url];
  }
}
