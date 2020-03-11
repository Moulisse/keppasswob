import {Component} from '@angular/core';
import {KdbxwebService} from '../../services/kdbxweb/kdbxweb.service';
import {Kdbx} from '../../services/kdbxweb/types/Kdbx';
import {Group} from '../../services/kdbxweb/types/Group';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  db: Kdbx;

  currentGroup: Group;

  constructor(private kdbx: KdbxwebService, private router: Router) {
    this.db = kdbx.db;
    this.currentGroup = this.db.groups[0];
  }

  close() {
    this.db = null;
    this.router.navigate(['/hello']).then();
  }
}
