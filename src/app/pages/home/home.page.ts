import {Component} from '@angular/core';
import {KdbxwebService} from '../../services/kdbxweb/kdbxweb.service';
import {Kdbx} from '../../services/kdbxweb/types/Kdbx';
import {Group} from '../../services/kdbxweb/types/Group';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  db: Kdbx;

  currentGroup: Group;

  constructor(private kdbx: KdbxwebService) {
    this.db = kdbx.db;
    this.currentGroup = this.db.groups[0];
    console.log(this.db);
  }

}
