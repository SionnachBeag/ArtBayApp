import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthGuard } from './core/guards/login-auth-guard';

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
    canActivate: [LoginAuthGuard],
    loadChildren: () =>
      import('./modules/pages/shop-page/shop-page.module').then(
        (mod) => mod.ShopPageModule
      ),
  },
  {
    path: 'manageItems',
    canActivate: [LoginAuthGuard],
    loadChildren: () =>
      import('./modules/pages/manage-items-page/manage-items-page.module').then(
        (mod) => mod.ManageItemsPageModule
      ),
  },
  {
    path: 'myItems',
    canActivate: [LoginAuthGuard],
    loadChildren: () =>
      import('./modules/pages/my-items-page/my-items-page.module').then(
        (mod) => mod.MyItemsPageModule
      ),
  },
  {
    path: 'viewItem',
    canActivate: [LoginAuthGuard],
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
