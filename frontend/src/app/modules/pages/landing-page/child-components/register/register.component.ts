import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IApiResponseMessageModel } from 'src/app/core/models/IApiResponseMessageModel';
import { IRegisterUser } from 'src/app/core/models/IRegisterUser';
import { IRegisterUserConfirm } from 'src/app/core/models/IRegisterUserConfirm';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}
  @Output()
  tabValue = new EventEmitter<number>();
  result: string = '';
  errorMessage: string = '';
  selectedIndex = 0;
  hide: boolean = true;
  hideConfirm: boolean = true;

  registerForm = new FormGroup(
    {
      userName: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$'),
        ])
      ),
      passwordConfirm: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$'),
        ])
      ),
    },
    [this.passwordMatchValidator('password', 'passwordConfirm')]
  );

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  togglePasswordConfirmVisibility(): void {
    this.hideConfirm = !this.hideConfirm;
  }

  reset(form: FormGroupDirective) {
    this.registerForm.reset();
    form.resetForm();
  }

  onSubmit(form: FormGroupDirective): void {
    const registerForm: IRegisterUserConfirm = this.registerForm.value;
    const finalRegisterForm: IRegisterUser = {
      userName: registerForm.userName,
      email: registerForm.email,
      password: registerForm.password,
    };
    if (this.registerForm.valid) {
      this.authService.register(finalRegisterForm).subscribe(
        (messageFromServer: IApiResponseMessageModel) => {
          if (messageFromServer.status === 201) {
            this.result = `${messageFromServer.message}`;
            setTimeout(() => {
              this.reset(form);
              this.tabValue.emit(1);
            }, 1000);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.status === 307) {
            this.result = `${err.error.message}`;
          }
        }
      );
    } else {
      this.errorMessage = 'Invalid form!';
    }
  }

  passwordMatchValidator(
    password: string,
    passwordConfirm: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordCtrl = control.get(password);
      const passwordConfirmCtrl = control.get(passwordConfirm);

      return passwordCtrl &&
        passwordConfirmCtrl &&
        passwordCtrl.value !== passwordConfirmCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
