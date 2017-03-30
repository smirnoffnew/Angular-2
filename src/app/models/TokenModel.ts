export class TokenModel {

    id: string = null;
    userId: string = null;
    created: string = null;

    constructor(obj?) {
        for (let field in obj) {
            if (typeof this[field] !== 'undefined') {
                this[field] = obj[field];
            }
        }
    }
}