import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageItemsPageRoutingModule } from './manage-items-page-routing.module';
import { ManageItemsPageComponent } from './manage-items-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ManageItemsPageComponent],
  imports: [
    CommonModule,
    ManageItemsPageRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class ManageItemsPageModule {}
