import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(names: any[], terms: string, key: string = ''): any[] {
    if (!names) {
      return [];
    }
    if (!terms) {
      return names;
    }
    terms = terms.toLowerCase();
    return names.filter(it => {
      return (key ? it[key] : it).toLowerCase().includes(terms);
    });
  }

}
