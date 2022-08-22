import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { ILoginForm } from 'src/app/core/models/ILoginForm';
import { ILoginApiData } from 'src/app/core/models/ILoginApiData';
import { WalletService } from 'src/app/core/services/wallet-service/wallet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  result: string = '';
  hide: boolean = true;
  constructor(
    private authService: AuthService,
    private walletService: WalletService
  ) {}

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onSubmit(): void {
    const loginForm: ILoginForm = this.loginForm.value;
    this.authService.login(loginForm).subscribe(
      (messageFromServer: ILoginApiData) => {
        this.walletService.getDollarsByUser();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 307) {
          this.result = `${err.error.message}`;
        }
      }
    );
  }
}
