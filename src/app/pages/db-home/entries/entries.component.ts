import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../services/kdbxweb/types/Group';
import {fadeIn} from '../../../animations/fadeIn';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  animations: [fadeIn]
})
export class EntriesComponent implements OnInit {

  @Input() currentGroup: Group;

  constructor() {
  }

  ngOnInit() {
  }

}
