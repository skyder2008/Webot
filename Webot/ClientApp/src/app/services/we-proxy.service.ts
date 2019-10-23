import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeProxyService {

    constructor(private http: HttpClient) { }

    getUUid(): Observable<string> {
        const url = '/api/weproxy/uuid';
        return this.http.get<string>(url, { responseType: 'text' as 'json'});
    }

    checkLogin(uuid: string): Observable<string> {
        const url = '/api/weproxy/login-check';
        const params = new HttpParams().set("uuid", uuid);
        return this.http.get<string>(url, { params, responseType: 'text' as 'json' })
    }

    getAuthInfo(redirectUrl: string): Observable<string> {
        const url = '/api/weproxy/auth-info';
        const params = new HttpParams().set("redirectUrl", redirectUrl);
        return this.http.get<string>(url, { params, responseType: 'text' as 'json' })
    }
}
