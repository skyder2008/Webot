import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeProxyService } from '../../services/we-proxy.service';
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
    selector: 'app-webot',
    templateUrl: './webot.component.html',
    styleUrls: ['./webot.component.css']
})
export class WebotComponent implements OnInit {
    //redirectUrl: string;
    constructor(private activeInfo: ActivatedRoute,
        private weproxyService: WeProxyService) {
    }

    ngOnInit() {
        this.activeInfo.queryParams.subscribe(params => {
            let redirectUrl = params.redicrectUrl;
            this.getAuthInfo(redirectUrl).subscribe(resp => {
                debugger
            });
        });
    }

    getAuthInfo(redirectUrl: string): Observable<string> {
        return this.weproxyService.getAuthInfo(redirectUrl);
    } 
}
