import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyValue'})
export class KeyValuePipe implements PipeTransform {
    transform(value, args: string[]): any {
        let items = [];
        for (let key in value) {
            items.push({key: key, value: value[key]});
        }
        return items;
    }
}