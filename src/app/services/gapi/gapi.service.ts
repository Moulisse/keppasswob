import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Kdbx} from '../kdbxweb/types/Kdbx';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class GapiService {

  dbLoaded = false;

  connected: BehaviorSubject<boolean> = new BehaviorSubject(false);

  dbList: BehaviorSubject<Kdbx[]> = new BehaviorSubject(null);

  constructor() {
  }


  async init(force = false) {
    if (force || !this.dbList.getValue()) {
      await this.loadConfig();
      return this.loadDBs();
    }
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
        this.connect(resolve, error).then();
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

  async addDb(db: Kdbx) {
    console.log('--> create', db);
    db.saving = true;
    let newList = this.dbList.getValue() || [];
    newList.push(db);
    this.dbList.next(newList);
    await this.loadConfig();

    gapi.client.drive.files.create({
      name: db.name,
      fields: 'id',
      parents: ['appDataFolder']
    }).then((newFile) => {

      gapi.client.request({
        path: 'https://www.googleapis.com/upload/drive/v2/files/' + newFile.result.id + '?uploadType=media',
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: {
          db: db.toString()
        }
      }).then(res => {
        console.log('<--- create', newFile, res);
        db.saving = false;
        db.id = res.result?.id;
        this.dbList.next(this.dbList.getValue());
        if (res.status !== 200) {
          newList = this.dbList.getValue() || [];
          this.dbList.next(newList.filter(dbInList => dbInList.id !== db.id));
        }
      });
    });
  }

  removeDb(db: Kdbx) {
    console.log('--> delete', db);
    if (!db.id) {
      return;
    }
    gapi.client.drive.files.delete({
      fileId: db.id
    }).then((res) => {
      console.log('<-- delete', res);
      if (res.status === 204) {
        const newList = this.dbList.getValue() || [];
        this.dbList.next(newList.filter(dbInList => dbInList.id !== db.id));
      }
    });
  }

  async loadDBData(db: Kdbx, force = false) {
    if (!db.data || force) {
      console.log('--> Load db data', db.id);
      return gapi.client.drive.files.get({
        fileId: db.id,
        alt: 'media'
      }).then(file => {
        db.data = this.str2ab(file.result.db);
        console.log('<-- Loaded db data', file);
      });
    }
  }

  str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  private async loadDBs() {
    console.log('--> Load db');
    this.dbLoaded = false;
    await gapi.client.drive.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100
    }).then(res => {
      this.dbLoaded = true;
      if (res?.result?.files) {
        console.log('<-- Loaded db', res.result.files);
        const newDBlistValue = [];
        res.result.files.forEach(db => {
          newDBlistValue.push(new Kdbx({
            name: db.name,
            id: db.id
          }));
        });
        this.dbList.next(newDBlistValue);
      }
    });
  }

}
