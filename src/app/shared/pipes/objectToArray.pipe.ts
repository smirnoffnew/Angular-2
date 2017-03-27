import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'objectToArrayPipe'
})
export class ObjectToArrayPipe implements PipeTransform {
  transform(obj: any) {
    let aa = _.values(obj);
    return _.values(obj);
  }
}
