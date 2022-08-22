import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  buyerId!: number;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkLocalStorageData();
    this.authService.monitorLocalStorageChanges();
    if (this.authService.isLoggedIn()) {
      this.authService.isTokenValid();
    }
  }

  onClick() {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      let id = this.authService.getUserIdFromToken();
      this.router.navigate(['/myItems'], { queryParams: { id: id } });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
