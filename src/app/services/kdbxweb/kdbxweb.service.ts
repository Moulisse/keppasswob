import {Injectable} from '@angular/core';
import {Kdbx} from './types/Kdbx';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class KdbxwebService {

  constructor(private alertController: AlertController, private toastController: ToastController) {
  }

  async openDB(db: Kdbx) {
    if (db.header) {
      return true;
    }
    const password = await this.askPassword(db.name);
    if (password.role) {
      return;
    }
    try {
      return await db.open(password.data.values.pw);
    } catch (e) {
      const toast = await this.toastController.create({
        header: 'Mot de passe incorrect',
        duration: 3000,
        color: 'danger',
        mode: 'ios',
      });
      await toast.present();
    }
    return this.openDB(db);
  }

  async askPassword(fileName) {
    const alert = await this.alertController.create({
      header: 'Mot de passe pour ' + fileName,
      inputs: [{
        name: 'pw',
        type: 'password',
        placeholder: 'Password'
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
    return alert.onDidDismiss();
  }

}
