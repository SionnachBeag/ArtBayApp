import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  onClick(): void {
    if (typeof this.authService.getUserIdFromToken() === 'number') {
      const id: number = this.authService.getUserIdFromToken();
      this.router.navigate(['/myItems'], { queryParams: { id: id } });
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.checkLocalStorageData();
    this.authService.monitorLocalStorageChanges();
    if (this.authService.isLoggedIn()) {
      this.authService.isTokenValid();
    }
  }
}
