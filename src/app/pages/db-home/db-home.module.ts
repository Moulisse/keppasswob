import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {DbHomePage} from './db-home.page';
import {GroupComponent} from './group/group.component';
import {EntriesComponent} from './entries/entries.component';
import {AddButtonComponent} from '../../components/add-button/add-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DbHomePage
      }
    ])
  ],
  declarations: [DbHomePage, GroupComponent, EntriesComponent, AddButtonComponent]
})
export class HomePageModule {
}
