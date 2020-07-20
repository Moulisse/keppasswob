export class Fav {
  id = ('' + Math.random()).split('.')[1];
  name: string;
  url: string;

  faviconURL: string;
  favicon: any;

  constructor(data) {
    Object.assign(this, data);
  }

}
