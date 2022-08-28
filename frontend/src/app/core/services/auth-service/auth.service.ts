import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponseMessageModel } from '../../models/IApiResponseMessageModel';
import { ILoginApiData } from '../../models/ILoginApiData';
import { ILoginForm } from '../../models/ILoginForm';
import { IRegisterUser } from '../../models/IRegisterUser';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserName(): string {
    return localStorage.getItem('user') as string;
  }

  setUserName(userName: string): void {
    localStorage.setItem('user', userName);
  }

  getArtDollars(): string {
    return localStorage.getItem('dollars') as string;
  }

  setArtDollars(artDollars: string): void {
    localStorage.setItem('dollars', artDollars);
  }

  login(loginData: ILoginForm): Observable<ILoginApiData> {
    return this.http
      .post<ILoginApiData>(`${environment.baseUrl}/login`, loginData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response: ILoginApiData) => {
          if (response.status === 200) {
            this.router.navigate(['/shop']);
            this.setToken(response.token);
            this.setUserName(response.userName);
            this.setArtDollars(response.artDollars.toString());
          }
        })
      );
  }

  register(registerData: IRegisterUser): Observable<IApiResponseMessageModel> {
    return this.http.post<IApiResponseMessageModel>(
      `${environment.baseUrl}/register`,
      registerData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('dollars');
    this.router.navigate(['']);
  }

  checkLocalStorageData(): void {
    if (!this.getToken() || !this.getUserName()) {
      this.logout();
    }
  }

  isTokenValid(): boolean {
    const token: string = this.getToken();
    const tokenPayload: any = jwt_decode(token);
    if (Date.now() > tokenPayload.exp * 1000) {
      this.logout();
      return false;
    }
    return true;
  }

  getUserIdFromToken(): number {
    const token: string = this.getToken();
    const tokenPayload: any = jwt_decode(token);
    return tokenPayload.userId;
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
