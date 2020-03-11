import {Injectable} from '@angular/core';
import {Kdbx} from './types/Kdbx';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

declare const kdbxweb: {
  ProtectedValue;
  Kdbx: {
    load(ArrayBuffer, credentials);
  }
  Credentials(protectedValue): void;
};

@Injectable({
  providedIn: 'root'
})
export class KdbxwebService {

  db: Kdbx;

  constructor(private alertController: AlertController, private router: Router) {
    const strFile = localStorage.getItem('file');
    if (strFile) {
      this.load(this.str2ab(strFile), 'test', 'test').then();
    }
  }

  async load(file: ArrayBuffer, fileName?, password?) {
    localStorage.setItem('file', this.ab2str(file));
    if (!password) {
      const pwResult = await this.askPassword(fileName);
      if (pwResult.role) {
        return;
      }
      password = pwResult.data.values.pw;
    }
    const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password));
    try {
      this.db = await kdbxweb.Kdbx.load(file, credentials);
    } catch (e) {
      return this.load(file);
    }
    this.router.navigate(['/home']).then();
    return this.db;
  }

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
