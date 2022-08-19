import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/pages/landing-page/landing-page.module').then(
        (mod) => mod.LandingPageModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./modules/pages/shop-page/shop-page.module').then(
        (mod) => mod.ShopPageModule
      ),
  },
  {
    path: 'manageItems',
    loadChildren: () =>
      import('./modules/pages/manage-items-page/manage-items-page.module').then(
        (mod) => mod.ManageItemsPageModule
      ),
  },
  {
    path: 'viewItem',
    loadChildren: () =>
      import('./modules/pages/item-page/item-page.module').then(
        (mod) => mod.ItemPageModule
      ),
  },
  {
    path: 'pageNotFound',
    loadChildren: () =>
      import('./modules/pages/page-not-found/page-not-found.module').then(
        (mod) => mod.PageNotFoundModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/pages/page-not-found/page-not-found.module').then(
        (mod) => mod.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
