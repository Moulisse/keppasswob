import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../services/kdbxweb/types/Group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input() group: Group;
  @Input() rank = 0;

  @Input() currentGroup: Group;
  @Output() changeCurrentGroup = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
