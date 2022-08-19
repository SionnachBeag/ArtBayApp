import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageItemsPageComponent } from './manage-items-page.component';

const routes: Routes = [
  {
    path: '',
    component: ManageItemsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageItemsPageRoutingModule {}
