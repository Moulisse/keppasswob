import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {GapiService} from './services/gapi/gapi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private gapi: GapiService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.gapi.init().then();

    this.platform.ready().then(() => {
      if (this.platform.is('mobile')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }
}
