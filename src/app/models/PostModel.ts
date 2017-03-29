export class PostModel {
    title: string = null;
    image: string = null;
    id: string = null;
    feedId:string = null;

    constructor(obj?) {
        for (let field in obj) {
            if (typeof this[field] !== 'undefined') {
                this[field] = obj[field];
            }
        }
    }
}