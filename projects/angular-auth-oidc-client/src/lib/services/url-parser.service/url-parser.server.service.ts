import { Injectable } from '@angular/core';
import { UrlParserService } from './url-parser.service';
import { URL } from 'url';

@Injectable({
    providedIn: 'root'
})
export class UrlParserServerService extends UrlParserService {

    getUrlParameter(urlToCheck: any, name: any): string {
        const url = new URL(urlToCheck);
        return url.searchParams.get(name);
    }

}
