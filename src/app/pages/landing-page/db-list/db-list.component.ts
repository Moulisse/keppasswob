import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Kdbx} from '../../../services/kdbxweb/types/Kdbx';
import {GapiService} from '../../../services/gapi/gapi.service';
import {Router} from '@angular/router';
import {KdbxwebService} from '../../../services/kdbxweb/kdbxweb.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-db-list',
  templateUrl: './db-list.component.html',
  styleUrls: ['./db-list.component.scss'],
})
export class DbListComponent implements OnInit, OnDestroy {

  destroy$: Subject<void> = new Subject<void>();

  loadedDBList: Kdbx[];

  canClickDB = true;

  constructor(public gapi: GapiService, private ngZone: NgZone, private router: Router, private kdbx: KdbxwebService) {
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
    this.gapi.init(true).then();
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
          await this.gapi.addDb(new Kdbx({
            name: file.name.split('.kdbx')[0],
            data: readFile.target.result
          }));
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
    if (!db.id || !this.canClickDB) {
      return;
    }
    this.canClickDB = false;
    this.gapi.loadDBData(db).then(() => {
      this.kdbx.openDB(db).then((res) => {
        this.canClickDB = true;
        if (res) {
          this.router.navigate(['/db-home', db.id]).then();
        }
      });
    });
  }

}
