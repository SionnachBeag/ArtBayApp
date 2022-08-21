import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopPageComponent } from './shop-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ShopPageComponent],
  imports: [CommonModule, ShopPageRoutingModule, SharedModule],
})
export class ShopPageModule {}
