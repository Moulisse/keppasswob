import {Group} from './Group';

declare const kdbxweb: {
  ProtectedValue;
  Kdbx: {
    load(ArrayBuffer, credentials);
  }
  Credentials(protectedValue): void;
};

export class Kdbx {
  header?: any;
  credentials?: any;
  meta?: any;
  xml?: HTMLElement;
  binaries?: any;
  groups?: Group[];
  deletedObjects?: [];

  name: string;
  data: ArrayBuffer;
  saving = false;

  constructor(name: string, data: ArrayBuffer) {
    this.name = name;
    this.data = data;
  }

  async load(file: ArrayBuffer, fileName?, password?) {
    // if (!password) {
    //   const pwResult = await this.askPassword(fileName);
    //   if (pwResult.role) {
    //     return;
    //   }
    //   password = pwResult.data.values.pw;
    // }
    const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password));
    return Object.assign(this, await kdbxweb.Kdbx.load(file, credentials));
  }

}
