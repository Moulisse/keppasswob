import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Kdbx} from '../kdbxweb/types/Kdbx';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  dbList: BehaviorSubject<Kdbx[]> = new BehaviorSubject(null);

  constructor() {
  }


  async init(force = false) {
    if (force) {
      await this.loadConfig();
      this.loadDBs();
    }
  }

  disconnect() {
    gapi.auth2.getAuthInstance().signOut();
  }

  async addDb(db: Kdbx) {
    db.saving = true;
    const newList = this.dbList.getValue() || [];
    newList.push(db);
    this.dbList.next(newList);
    await this.loadConfig();

  }

  private async loadConfig() {
    return new Promise((resolve, error) => {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: environment.G_API.API_KEY,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          clientId: environment.G_API.CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/drive.appdata'
        });
        this.connect(resolve, error);
      });
    });
  }

  private async connect(resolve, error) {
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      gapi.auth2.getAuthInstance().isSignedIn.listen((res: boolean) => {
        this.connected.next(res);
        if (res) {
          resolve();
        } else {
          error();
        }
      });
      gapi.auth2.getAuthInstance().signIn();
    } else {
      this.connected.next(true);
      resolve();
    }

  }

  private loadDBs() {
    console.log('--> Load db');
    gapi.client.drive.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100
    }).then(res => {
      if (res?.result?.files) {
        console.log('<-- Loaded db', res.result.files);
        this.dbList.next(res.result.files);
      }
    });
  }

}
