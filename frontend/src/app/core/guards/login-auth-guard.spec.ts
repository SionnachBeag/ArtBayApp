import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginAuthGuard } from './login-auth-guard';

describe('LoginAuthGuard', () => {
  let service: LoginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(LoginAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
