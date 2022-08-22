import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyItemsPageRoutingModule } from './my-items-page-routing.module';
import { MyItemsPageComponent } from './my-items-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MyItemsPageComponent],
  imports: [CommonModule, MyItemsPageRoutingModule, SharedModule],
})
export class MyItemsPageModule {}
