import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeGuard} from './pages/home/guard/home.guard';

const routes: Routes = [
  {path: '', redirectTo: 'hello', pathMatch: 'full'},
  {path: 'hello', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule)},
  {path: 'home', canActivate: [HomeGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
