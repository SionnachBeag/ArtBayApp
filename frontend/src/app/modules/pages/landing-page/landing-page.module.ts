import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './child-components/login/login.component';
import { RegisterComponent } from './child-components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LandingPageComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class LandingPageModule {}
