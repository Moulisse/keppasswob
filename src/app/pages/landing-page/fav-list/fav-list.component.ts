import {Component, OnDestroy, OnInit} from '@angular/core';
import {FavService} from '../../../services/fav/fav.service';
import {Subject} from 'rxjs';
import {Fav} from '../../../services/fav/fav';
import {AlertController, PopoverController} from '@ionic/angular';
import {FavOptionsComponent} from './fav-options/fav-options.component';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss'],
})
export class FavListComponent implements OnInit, OnDestroy {

  favList: Fav[];

  $destroy = new Subject<void>();

  canClickFav = true;

  constructor(
    private favService: FavService,
    private alertController: AlertController,
    private popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
    this.favService.favList.subscribe((res: Fav[]) => {
      this.favList = res;
    });
  }

  ngOnDestroy() {
    this.$destroy.next();
  }

  async newFav() {
    if (!this.canClickFav) {
      return;
    }
    this.canClickFav = false;
    const alert = await this.alertController.create({
      header: 'Nouveau favori',
      inputs: [{
        name: 'name',
        placeholder: 'Nom *'
      }, {
        name: 'url',
        placeholder: 'URL'
      }, {
        name: 'faviconURL',
        placeholder: 'favicon URL',
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
        }
      ]
    });
    await alert.present();
    const firstInput: any = document.querySelector('ion-alert input');
    firstInput.focus();
    alert.onDidDismiss().then((res) => {
      if (!res.role && res?.data?.values?.name) {
        const newFav = new Fav({
          name: res.data.values.name,
          URL: res.data.values.url,
          faviconURL: res.data.values.faviconURL
        });
        this.favService.add(newFav);
      }
      this.canClickFav = true;
    });
  }

  async showOptions(fav: Fav, event) {
    if (!this.canClickFav) {
      return;
    }
    this.canClickFav = false;
    const popover = await this.popoverController.create({
      component: FavOptionsComponent,
      event,
      componentProps: {fav}
    });
    await popover.present();
    popover.onDidDismiss().then(() => {
      this.canClickFav = true;
    });
  }
}
