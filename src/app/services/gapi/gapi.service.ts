import {Injectable, NgZone} from '@angular/core';
import {environment} from '../../../environments/environment';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  connected = false;

  constructor(private ngZone: NgZone) {
  }

  init() {
    this.connect();

  }

  private connect(threshold = 0) {
    gapi.load('client', this.load);
  }

  private async load() {
    await gapi.client.init({
      apiKey: environment.G_API.API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      clientId: environment.G_API.CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/drive'
    });

    const callback = (res) => {
      console.log(res);
    };

    gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    callback(gapi.auth2.getAuthInstance().isSignedIn.get());
    gapi.auth2.getAuthInstance().signIn();
  }

}
