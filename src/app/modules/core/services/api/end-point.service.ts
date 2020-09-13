import {Injectable} from '@angular/core';
import {ApiService} from '@shared/services/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndPointService<T> {
  protected endPointUrl;
  protected pluralize;
  protected singular;
  protected modelType;

  constructor(private api: ApiService) {

  }

  index(filter = ''): Observable<T[]> {
    return this.api.get(this.endPointUrl + filter).pipe(map(data => data[this.pluralize].map(this.modelType.adapt)));
  }

  find(id: number): Observable<T> {
    return this.api.get([this.endPointUrl, [id]]).pipe(map(data => this.modelType.adapt(data[this.singular])));
  }

  save(params): Observable<T> {
    return this.api.post(this.endPointUrl, params).pipe(map(data => this.modelType.adapt(data[this.singular])));
  }

  update(params): Observable<T> {
    return this.api.put([this.endPointUrl, [params[this.singular].id]], params)
      .pipe(map(data => this.modelType.adapt(data[this.singular])));
  }
}
