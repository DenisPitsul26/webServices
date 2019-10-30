import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../models/base-api';

@Injectable({providedIn: 'root'})
export class AuthService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAuth(): Observable<any> {
    return this.get('api/user');
  }
  getAccessCode(code: string, requestToken: string, tokenSecret: string): Observable<any> {
    return this.get(`api/pin/${code}/${requestToken}/${tokenSecret}`);
  }
}
