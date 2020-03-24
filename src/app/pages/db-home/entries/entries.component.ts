import {Component, Input} from '@angular/core';
import {Group} from '../../../services/kdbxweb/types/Group';
import {fadeIn} from '../../../animations/fadeIn';
import {Entry} from '../../../services/kdbxweb/types/Entry';
import {ClipboardService} from '../../../services/clipboard/clipboard.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  animations: [fadeIn]
})
export class EntriesComponent {

  @Input() currentGroup: Group;

  constructor(private clipboard: ClipboardService) {
  }

  clickEntry(entry: Entry) {
    this.clipboard.write(entry?.fields?.Password?.getText());
  }

}
