import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'keyAndValueOfObject'})
export class KeyAndValueOfObject implements PipeTransform {

    transform(value, args: string[]): any {
        let keys = [];
        for (let key in value) {
            if (key !== 'image') {
                if (key == 'birthday') {
                    keys.push({key: key, value: this.DateFormater( new Date(value[key]) ) });
                } else {
                    keys.push({key: key, value: value[key]});
                }
            }
        }
        return keys;
    }

    DateFormater(date) {
        var values = [ date.getDate(), date.getMonth() + 1 ];
        for( var id in values ) {
            values[ id ] = values[ id ].toString().replace( /^([0-9])$/, '0$1' );
        }
        return values[ 0 ]+'.'+values[ 1 ]+'.'+date.getFullYear();
    }
}