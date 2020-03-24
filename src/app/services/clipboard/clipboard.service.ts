import {Injectable} from '@angular/core';
import {debounceTime, delay, filter, startWith, take} from 'rxjs/operators';
import {combineLatest, fromEvent, Subject} from 'rxjs';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  resetCLipboard: Subject<void> = new Subject<void>();

  constructor(private toastController: ToastController) {
    this.resetCLipboard.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      console.log('try reset');
      combineLatest([
        fromEvent(document, 'visibilitychange'),
        fromEvent(document, 'focus')
      ]).pipe(
        startWith(0),
        delay(500),
        filter(() => document.hasFocus()),
        take(1)
      ).subscribe(() => {
        navigator.clipboard.writeText('').then();
      });
    });
  }

  write(data: string) {
    navigator.clipboard.writeText(data).then(async () => {
      const toast = await this.toastController.create({
        header: 'Mot de passe copié dans le presse-papier',
        duration: 3000,
        color: 'primary',
        mode: 'ios',
      });
      await toast.present();
      this.resetCLipboard.next();
    });
  }
}
