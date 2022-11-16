import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ItemComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationPopupComponent,
    ImageUploadComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    ItemComponent,
    HeaderComponent,
    FooterComponent,
    ImageUploadComponent,
  ],
})
export class SharedModule {}
