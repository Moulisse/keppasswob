import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../services/kdbxweb/types/Group';
import {fadeIn} from '../../../animations/fadeIn';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
          style({opacity: 0}),
          animate('.25s ease-in')
        ])
      ]
    ),
  ]
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
