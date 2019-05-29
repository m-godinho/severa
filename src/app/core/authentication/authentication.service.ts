import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Credentials } from '../models/Credentials';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;

  constructor(
    private userService: UserService,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext, route: ActivatedRoute, router: Router) {
    const credentials: User = {} as User;

    credentials.username = context.username;
    credentials.password = context.password;

    this.httpClient.post(`${environment.server}login`, credentials).subscribe(
      data => {
        if (!data['user']) {
          this.snackBar.open(this.translate.instant(data['message']), this.translate.instant('OK'), {
            duration: 3000
          });
        } else {
          this.snackBar.open(this.translate.instant('Successfully logged in'), this.translate.instant('OK'), {
            duration: 3000
          });

          this.setCredentials(data['user'], context.remember);

          route.queryParams.subscribe(params => router.navigate([params.redirect || '/'], { replaceUrl: true }));
        }
      },
      err => {
        this.snackBar.open(this.translate.instant('Internal server error'), this.translate.instant('OK'), {
          duration: 3000
        });
      }
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      if (remember) {
        localStorage.setItem('username', credentials.username);
      } else {
        localStorage.removeItem('username');
      }
      sessionStorage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
