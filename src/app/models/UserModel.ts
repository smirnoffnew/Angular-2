export class UserModel {

    id: string = null;
    username: string = null;
    email: string = null;

    constructor(obj?) {
        for (let field in obj) {
            if (typeof this[field] !== 'undefined') {
                this[field] = obj[field];
            }
        }
    }
}