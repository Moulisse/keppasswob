import {Entry} from './Entry';

export class Group {
  uuid: {
    id: string;
    empty: boolean;
  };
  name: string;
  notes: string;
  icon: number;
  customIcon;
  times: {
    creationTime: Date;
    lastModTime: Date;
    lastAccessTime: Date;
    expiryTime: Date;
    expires: boolean,
    usageCount: number;
    locationChanged: Date;
  };
  expanded: boolean;
  defaultAutoTypeSeq: string;
  enableAutoType: boolean;
  enableSearching: boolean;
  lastTopVisibleEntry: {
    id: string;
    empty: boolean
  };
  groups: Group[];
  entries: Entry[];
  parentGroup: Group;
  customData: any;
}
