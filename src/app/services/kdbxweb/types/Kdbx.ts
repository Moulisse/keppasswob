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

  id: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

  async open(password) {
    const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password));
    return Object.assign(this, await kdbxweb.Kdbx.load(this.data, credentials));
  }

  toString() {
    return String.fromCharCode.apply(null, new Uint16Array(this.data));
  }

}

