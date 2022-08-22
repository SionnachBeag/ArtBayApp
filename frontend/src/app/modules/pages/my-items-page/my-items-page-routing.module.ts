import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyItemsPageComponent } from './my-items-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyItemsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyItemsPageRoutingModule {}
