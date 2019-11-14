import {Injectable} from '@angular/core';
import {BaseApi} from '../models/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getCategories(): Observable<any> {
    return this.get(`api/categories`);
  }
  getSubCategoriesByName(name: string): Observable<any> {
    return this.get(`api/category/${name}`);
  }
}
