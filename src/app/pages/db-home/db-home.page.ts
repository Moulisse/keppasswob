import {Component} from '@angular/core';
import {KdbxwebService} from '../../services/kdbxweb/kdbxweb.service';
import {Kdbx} from '../../services/kdbxweb/types/Kdbx';
import {Group} from '../../services/kdbxweb/types/Group';
import {ActivatedRoute, Router} from '@angular/router';
import {GapiService} from '../../services/gapi/gapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'db-home.page.html',
  styleUrls: ['db-home.page.scss'],
})
export class DbHomePage {

  db: Kdbx;

  currentGroup: Group;

  constructor(private route: ActivatedRoute, private gapi: GapiService, private kdbx: KdbxwebService, private router: Router) {
    const IDInUrl = this.route.snapshot.paramMap.get('id');
    this.db = this.gapi.dbList.getValue().find((db: Kdbx) => {
      return db.id === IDInUrl;
    });
    this.gapi.loadDBData(this.db);
    // this.currentGroup = this.db.groups[0];
  }

  close() {
    this.db = null;
    this.router.navigate(['/hello']).then();
  }
}
