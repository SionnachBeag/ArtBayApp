import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ItemComponent,
    HeaderComponent,
    FooterComponent,
    ConfirmationPopupComponent,
  ],
  imports: [CommonModule, MatButtonModule, RouterModule, MatDialogModule],
  exports: [ItemComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
