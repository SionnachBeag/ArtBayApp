import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageItemsPageRoutingModule } from './manage-items-page-routing.module';
import { ManageItemsPageComponent } from './manage-items-page.component';

@NgModule({
  declarations: [ManageItemsPageComponent],
  imports: [CommonModule, ManageItemsPageRoutingModule],
})
export class ManageItemsPageModule {}
