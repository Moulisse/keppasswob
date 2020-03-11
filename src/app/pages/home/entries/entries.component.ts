import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../services/kdbxweb/types/Group';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent implements OnInit {

  @Input() currentGroup: Group;

  constructor() {
  }

  ngOnInit() {
  }

}
