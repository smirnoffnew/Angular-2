export class UserModel {
  username: string = null;
  email: string = null;
  id: string = null;

  constructor(obj?) {
    for (let field in obj) {
      if (typeof this[field] !== 'undefined') {
        this[field] = obj[field];
      }
    }
  }
}