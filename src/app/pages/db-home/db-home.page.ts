import {Component, OnInit} from '@angular/core';
import {KdbxwebService} from '../../services/kdbxweb/kdbxweb.service';
import {Kdbx} from '../../services/kdbxweb/types/Kdbx';
import {Group} from '../../services/kdbxweb/types/Group';
import {ActivatedRoute, Router} from '@angular/router';
import {GapiService} from '../../services/gapi/gapi.service';
import {fadeIn} from '../../animations/fadeIn';

@Component({
  selector: 'app-home',
  templateUrl: 'db-home.page.html',
  styleUrls: ['db-home.page.scss'],
  animations: [fadeIn]
})
export class DbHomePage implements OnInit {

  db: Kdbx;

  currentGroup: Group;

  constructor(private route: ActivatedRoute, private gapi: GapiService, private router: Router, private kdbx: KdbxwebService) {
  }

  async ngOnInit() {
    const IDInUrl = this.route.snapshot.paramMap.get('id');
    await this.gapi.init();
    if (IDInUrl && this.gapi.dbList.getValue()) {
      this.db = this.gapi.dbList.getValue().find((db: Kdbx) => {
        return db.id === IDInUrl;
      });

      this.gapi.loadDBData(this.db).then(() => {
        this.kdbx.openDB(this.db).then((res) => {
          if (res) {
            this.currentGroup = this.db.groups[0];
          } else {
            this.back();
          }
        });
      });
    } else {
      this.back();
    }
  }

  back() {
    this.router.navigate(['']).then();
  }
}
