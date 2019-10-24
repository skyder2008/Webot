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
    redirectUrl: string;
    private skey: string;
    private wxsid: string;
    private wxuin: string;
    private passTicket: string;

    constructor(private activeInfo: ActivatedRoute,
        private weproxyService: WeProxyService) {
    }

    ngOnInit() {
        this.activeInfo.queryParams.subscribe(params => {
            let redirectUrl = params.redicrectUrl;
            this.getAuthInfo(redirectUrl).subscribe(resp => {
                debugger
                this.skey = resp['skey'];
                this.wxsid = resp['wxsid'];
                this.wxuin = resp['wxuin'];
                this.passTicket = resp['passTicket'];
                this.initWechat().subscribe(resp => {
                    this.
                });
            });
        });
    }

    getAuthInfo(redirectUrl: string): Observable<string> {
        return this.weproxyService.getAuthInfo(redirectUrl);
    }

    initWechat() {
        return this.weproxyService.initWechat({
            skey: this.skey,
            wxsid: this.wxsid,
            wxuin: this.wxuin,
            passTicket: this.passTicket,
        });
    }
}
