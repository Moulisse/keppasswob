import {Password} from './Password';
import {Group} from './Group';

export class Entry {
  uuid: {
    id: string;
    empty: boolean;
  };
  icon: number;
  customIcon;
  fgColor: string;
  bgColor: string;
  overrideUrl: string;
  tags: [];
  times: {
    creationTime: Date;
    lastModTime: Date;
    lastAccessTime: Date;
    expiryTime: Date;
    expires: boolean,
    usageCount: number;
    locationChanged: Date;
  };
  fields: {
    Notes: string;
    Password: Password
    Title: string;
    URL: string;
    Username: string;
  };
  binaries;
  autoType;
  history: [];
  parentGroup: Group;
  customData: any;
}
