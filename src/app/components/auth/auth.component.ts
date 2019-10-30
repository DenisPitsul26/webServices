import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router, RouterModule} from '@angular/router';
import {OauthToken} from '../../models/oauth_token';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private sub1: Subscription;
  private token: OauthToken;
  accessCode = '';
  disabledButton = true;

  constructor(private authService: AuthService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    if (this.token === null) {
      this.disabledButton = true;
    } else {
      this.disabledButton = false;
    }
  }

  auth() {
    this.sub1 = this.authService.getAuth().subscribe((data: OauthToken) => {
      if (data.oauth_url === null) {
        console.error('url is null.');
        this.disabledButton = true;
      } else {
        this.token = data;
        // this.document.location.href = this.token.oauth_url;
        window.open(this.token.oauth_url, '_blank');
        this.disabledButton = false;
      }
    });
  }



  getAccess() {
    console.log(this.accessCode, this.token.request_token, this.token.token_secret);
    // this.authService.getAccessCode(this.accessCode, this.token.request_token, this.token.token_secret).subscribe((data: any) => {
    //   console.log('Access: ', data);
    // });
  }
}
