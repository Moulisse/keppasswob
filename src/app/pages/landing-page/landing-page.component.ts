import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GapiService} from '../../services/gapi/gapi.service';
import {takeUntil} from 'rxjs/operators';
import {Kdbx} from '../../services/kdbxweb/types/Kdbx';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<void> = new Subject<void>();

  loadedDBList: Kdbx[];

  constructor(private gapi: GapiService, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.gapi.dbList.pipe(
      takeUntil(this.destroy$),
    ).subscribe((res: Kdbx[]) => {
      this.ngZone.run(() => {
        this.loadedDBList = res;
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  plusButton(): void {

  }

  refreshButton(): void {
    this.gapi.init(true);
  }

  importButton(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = (e.target as HTMLInputElement).files[0];
      if (!file) {
        return;
      }
      const fr = new FileReader();
      fr.onloadend = (() => {
        return async (readFile) => {
          await this.gapi.addDb(new Kdbx(file.name.split('.kdbx')[0], readFile.target.result));
        };
      })();
      fr.readAsArrayBuffer(file);
    };
    input.click();
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

  clickDB(db: Kdbx) {
    this.gapi.removeDb(db);
  }
}
