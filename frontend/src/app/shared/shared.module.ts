import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [ItemComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [ItemComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
