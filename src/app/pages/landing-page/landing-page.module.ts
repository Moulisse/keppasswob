import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page.component';
import {DbListComponent} from './db-list/db-list.component';
import {FavListComponent} from './fav-list/fav-list.component';
import {FavOptionsComponent} from './fav-list/fav-options/fav-options.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent
      }
    ]),
  ],
  declarations: [
    LandingPageComponent,
    DbListComponent,
    FavListComponent,
    FavOptionsComponent,
  ],
})
export class LandingPageModule {
}
