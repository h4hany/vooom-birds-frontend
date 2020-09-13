import {Injectable} from '@angular/core';
import {UrlsService} from './urls.service';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private urls: UrlsService, private http: HttpClient) {
  }

  get(requestUrl): Observable<any> {
    const url = this._generateUrl(requestUrl);
    return this.http.get(url).pipe(catchError(this.formatErrors));
  }

  post(requestUrl, params, responseType = {}): Observable<any> {
    const url = this._generateUrl(requestUrl);
    return this.http.post(url, params, responseType).pipe(catchError(this.formatErrors));
  }

  put(requestUrl, params, responseType = {}): Observable<any> {
    const url = this._generateUrl(requestUrl);
    return this.http.put(url, params, responseType).pipe(catchError(this.formatErrors));
  }

  delete(requestUrl): Observable<any> {
    const url = this._generateUrl(requestUrl);
    return this.http.delete(url).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  private _generateUrl(requestUrl) {
    if (typeof requestUrl === 'string' && requestUrl.includes('?')) {
      const urlArr = requestUrl.split('?');
      const endPoint = urlArr[0];
      return this.urls.get(endPoint) + '?' + urlArr[1];
    } else if (typeof requestUrl === 'string') {
      return this.urls.get(requestUrl);
    } else {
      return this.urls.getWithParams(requestUrl[0], requestUrl[1]);
    }
  }
}
