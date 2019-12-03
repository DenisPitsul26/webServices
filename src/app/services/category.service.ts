import {Injectable} from '@angular/core';
import {BaseApi} from '../models/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoryService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getCategories(): Observable<any> {
    return this.get(`api/categories`);
  }

  public getJSON(jsonURL: string): Observable<any> {
    return this.http.get(jsonURL);
  }

  getSubCategoriesByName(name: string): Observable<any> {
    return this.get(`api/category/${name}`);
  }
  getSubSubCategoriesByName(name1: string, name2: string): Observable<any> {
    return this.get(`api/category/${name1}/${name2}`);
  }
}
