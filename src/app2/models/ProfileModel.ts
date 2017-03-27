export class ProfileModel {
  birthday: string = null;
  fullname: string = null;
  phone: string = null;
  height: number = null;
  weight: number = null;
  snickersBrand: string = null;
  image: string = null;
  id: string = null;
  clientId: string = null;

  constructor(obj?) {
    for (let field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}