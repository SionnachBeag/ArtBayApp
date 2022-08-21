import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkLocalStorageData();
    this.authService.monitorLocalStorageChanges();
    if (this.authService.isLoggedIn()) {
      this.authService.isTokenValid();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
