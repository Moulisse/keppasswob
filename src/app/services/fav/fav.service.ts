import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Fav} from './fav';
import {AlertController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  favList: BehaviorSubject<Fav[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('fav-list') || '[]'));

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
  ) {
  }

  add(newFav: Fav) {
    const newValue = this.favList.getValue();
    newValue.push(newFav);
    this.loadFavicon(newFav);
    this.save(newValue);
  }

  async modify(fav: Fav) {
    const alert = await this.alertController.create({
      header: 'Modifier ' + fav.name,
      inputs: [{
        name: 'name',
        placeholder: 'Nom *',
        value: fav.name
      }, {
        name: 'url',
        placeholder: 'URL',
        value: fav.url
      }, {
        name: 'faviconURL',
        placeholder: 'favicon URL',
        value: fav.faviconURL
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
    alert.onDidDismiss().then(res => {
      if (!res.role && res?.data?.values?.name) {
        const newValue = this.favList.getValue();
        newValue.forEach((oldFav) => {
          if (oldFav.id === fav.id) {
            oldFav.name = res.data.values.name;
            oldFav.url = res.data.values.url;
            oldFav.faviconURL = res.data.values.faviconURL;
            this.loadFavicon(oldFav);
          }
        });
        this.save(newValue);
      }
    });
  }

  remove(fav: Fav) {
    let newValue = this.favList.getValue();
    newValue = newValue.filter((oldFav) => {
      return oldFav.id !== fav.id;
    });
    this.save(newValue);
  }

  save(newValue: Fav[]) {
    localStorage.setItem('fav-list', JSON.stringify(newValue));
    this.favList.next(newValue);
  }

  loadFavicon(fav: Fav) {
    this.http.get('https://services.keeweb.info/favicon/' + fav.faviconURL, {responseType: 'arraybuffer'}).pipe(
      map(e => 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(e))))
    ).subscribe(res => {
      console.log(res);
      const newValue = this.favList.getValue();
      newValue.forEach((oldFav) => {
        if (oldFav.id === fav.id) {
          oldFav.favicon = res;
        }
      });
      this.save(newValue);
    });
  }
}
