import {Component, Input, OnInit} from '@angular/core';
import {Fav} from '../../../../services/fav/fav';
import {FavService} from '../../../../services/fav/fav.service';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-fav-options',
  templateUrl: './fav-options.component.html',
  styleUrls: ['./fav-options.component.scss'],
})
export class FavOptionsComponent implements OnInit {

  @Input() fav: Fav;

  constructor(
    private favService: FavService,
    private popoverController: PopoverController
  ) {
  }

  ngOnInit() {
  }

  modify(fav: Fav) {
    this.favService.modify(fav).then();
    this.popoverController.dismiss().then();
  }

  remove(fav: Fav) {
    this.favService.remove(fav);
    this.popoverController.dismiss().then();
  }
}
