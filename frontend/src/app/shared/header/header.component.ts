import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArtDollarModel } from 'src/app/core/models/IArtDollarModel';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { WalletService } from 'src/app/core/services/wallet-service/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  artDollarsSubscription!: Subscription;
  artDollars!: number;
  constructor(
    public authService: AuthService,
    private walletService: WalletService,
    public router: Router
  ) {}

  toMyItems(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const id: number = this.authService.getUserIdFromToken();
      this.router.navigate(['/myItems'], { queryParams: { id: id } });
    }
  }

  toManageItems(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const id: number = this.authService.getUserIdFromToken();
      this.router.navigate(['/manageItems'], { queryParams: { id: id } });
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getArtDollarAmount(): void {
    this.artDollarsSubscription =
      this.walletService.artDollarsObservable$.subscribe(
        (artDollarsFromObservable: IArtDollarModel) => {
          this.artDollars = artDollarsFromObservable.artDollars;
        }
      );
  }

  ngOnInit(): void {
    this.getArtDollarAmount();
    this.authService.checkLocalStorageData();
    if (this.authService.isLoggedIn()) {
      this.authService.isTokenValid();
    }
    this.walletService.syncSubjectAndLocalStore();
  }

  ngOnDestroy() {
    this.artDollarsSubscription.unsubscribe();
  }
}
