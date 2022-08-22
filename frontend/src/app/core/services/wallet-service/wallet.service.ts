import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArtDollarModel } from '../../models/IArtDollarModel';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private artDollarsSubject = new BehaviorSubject<IArtDollarModel>({
    artDollars: 0,
  });
  artDollarsObservable$: Observable<IArtDollarModel> =
    this.artDollarsSubject.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {}

  getDollarsByUser(): void {
    if (!this.authService.getToken()) {
      this.artDollarsSubject.next({
        artDollars: 0,
      });
    }
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const userId: number = this.authService.getUserIdFromToken();
      this.http
        .get<IArtDollarModel>(`${environment.baseUrl}/users/${userId}`)
        .subscribe((response) => this.artDollarsSubject.next(response));
    }
  }
}
