import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ItemComponent],
})
export class SharedModule {}
