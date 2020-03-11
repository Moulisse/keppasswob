import {Group} from './Group';

export class Kdbx {
  header: any;
  credentials: any;
  meta: any;
  xml: HTMLElement;
  binaries: any;
  groups: Group[];
  deletedObjects: [];
}
