import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor() { }

  transform(text: string, search: string): string {
    let regex;
    if (search) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      pattern = pattern.split(' ').filter((t) => {
        return t.length > 0;
      }).join('|');
      regex = new RegExp(pattern, 'gi');
    }
    return search ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}
