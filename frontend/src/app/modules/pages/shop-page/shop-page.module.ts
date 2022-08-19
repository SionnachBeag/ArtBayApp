import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopPageComponent } from './shop-page.component';

@NgModule({
  declarations: [ShopPageComponent],
  imports: [CommonModule, ShopPageRoutingModule],
})
export class ShopPageModule {}
