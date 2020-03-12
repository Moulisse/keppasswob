import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  dbList: BehaviorSubject<string[]> = new BehaviorSubject(null);

  constructor() {
    this.init();
  }


  init() {
    this.loadConfig().then();
  }

  disconnect() {
    gapi.auth2.getAuthInstance().signOut();
  }

  private async loadConfig() {
    await gapi.load('client', async () => {
      await gapi.client.init({
        apiKey: environment.G_API.API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        clientId: environment.G_API.CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.appdata'
      });
      this.connect();
    });
  }

  private async connect() {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().isSignedIn.listen((res: boolean) => {
        console.log('listen', res);
        this.connected.next(res);
        if (res) {
          this.loadDBs();
        }
      });
      gapi.auth2.getAuthInstance().signIn();
    } else {
      this.connected.next(true);
      this.loadDBs();
    }
  }

  private loadDBs() {
    gapi.client.drive.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100
    }).then((res) => {
      if (res?.result?.files) {
        // this.dbList.next(res.result.files);
        this.dbList.next(['res.result.files']);
      }
    });
  }

}
