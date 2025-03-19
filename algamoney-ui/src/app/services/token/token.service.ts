import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  constructor(private http: HttpClient) {}
  set token(token: string) {
    localStorage.setItem('token', token);
  }
  get token() {
    return localStorage.getItem('token') as string;
  }
 
  get  receberNome() {
    const jwtHelper = new JwtHelperService();
    const token = this.token;
    if (!token) {
      return false;
    }

    const jwtPayload = jwtHelper.decodeToken(token);

    return jwtPayload?.nome
  }
  set refreshToken(refreshToken: string) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  get refreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) as string;
  }
  isTokenValid() {
    const token = this.token;
    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();

    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
  isTokenNotValid() {
    return !this.isTokenValid();
  }
  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities;
    }
    return [];
  }
  logout() {
    localStorage.clear();
  }
  renewToken(): Observable<{ token: string }> {
    const refreshToken = this.refreshToken;
    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    return this.http
      .post<{ token: string }>('/auth/refresh-token', { refreshToken })
      .pipe(
        tap((response) => {
          this.token = response.token;
        })
      );
  }

}
