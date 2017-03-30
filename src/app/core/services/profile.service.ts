import {Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {ReplaySubject, Subject} from 'rxjs/Rx';

@Injectable()
export class ProfileService {

    public getProfileForView$: any = new ReplaySubject(1);
    //ReplaySubject for create and edit
    public getProfileForEdit$: any = new ReplaySubject(1);
    public getProfilesList$: any = new Subject();
    public selfProfileAlreadyGetting: any = false;

    constructor(private restangular: Restangular) {
    }

    create(data: any) {
        return this.restangular.all('profiles').post(data);
    };

    get(username) {
        return this.restangular.one('clients', username).one('get-profile').get();
    }

    save(data: any, id: string) {
        return this.restangular.one('profiles', id).patch(data);
    };

    getAll() {
        return this.restangular.all('profiles').getList()
    }
}