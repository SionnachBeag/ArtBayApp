import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPageComponent } from './item-page.component';
import { ItemPageRoutingModule } from './item-page-routing.module';

@NgModule({
  declarations: [ItemPageComponent],
  imports: [CommonModule, ItemPageRoutingModule],
})
export class ItemPageModule {}
