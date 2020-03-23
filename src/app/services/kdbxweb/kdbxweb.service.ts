import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class KdbxwebService {

  constructor(private alertController: AlertController) {
  }

  // async load(file: ArrayBuffer, fileName?, password?) {
  //   if (!password) {
  //     const pwResult = await this.askPassword(fileName);
  //     if (pwResult.role) {
  //       return;
  //     }
  //     password = pwResult.data.values.pw;
  //   }
  //   const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password));
  //   try {
  //     this.db = await kdbxweb.Kdbx.load(file, credentials);
  //   } catch (e) {
  //     return this.load(file);
  //   }
  //   return this.db;
  // }

  async askPassword(fileName) {
    const alert = await this.alertController.create({
      header: 'Password for ' + fileName,
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
    return alert.onWillDismiss();
  }

  ab2str(buf: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
}
