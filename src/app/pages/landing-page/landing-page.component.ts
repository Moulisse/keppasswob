import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GapiService} from '../../services/gapi/gapi.service';
import {takeUntil} from 'rxjs/operators';
import {PlusButtonComponent} from './plus-button/plus-button.component';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<void> = new Subject<void>();

  loadedDBList: string[];

  constructor(private gapi: GapiService, private ngZone: NgZone, private popoverController: PopoverController) {
  }

  ngOnInit(): void {
    this.gapi.dbList.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: string[]) => {
      this.ngZone.run(() => {
        this.loadedDBList = res;
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  async plusButton(ev) {
    const popover = await this.popoverController.create({
      component: PlusButtonComponent,
      event: ev,
      showBackdrop: false,
      mode: 'ios'
    });
    return await popover.present();
  }

  // loadFile(target: any) {
  //   if (target.files.length <= 0) {
  //     return;
  //   }
  //   const fr = new FileReader();
  //   fr.onloadend = (() => {
  //     return (file) => {
  //       this.kdbx.load(file.target.result, target.files[0].name.split('.kdbx')[0]).then();
  //     };
  //   })();
  //   fr.readAsArrayBuffer(target.files[0]);
  // }

}
