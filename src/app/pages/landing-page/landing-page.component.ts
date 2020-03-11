import {Component, OnInit} from '@angular/core';
import {KdbxwebService} from '../../services/kdbxweb/kdbxweb.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor(private kdbx: KdbxwebService) {
  }

  ngOnInit() {
  }

  loadFile(target: any) {
    if (target.files.length <= 0) {
      return;
    }
    const fr = new FileReader();
    fr.onloadend = (() => {
      return (file) => {
        this.kdbx.load(file.target.result, target.files[0].name.split('.kdbx')[0]).then();
      };
    })();
    fr.readAsArrayBuffer(target.files[0]);
  }

}
