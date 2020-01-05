import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { WeProxyService } from '../../services/we-proxy.service';
import { Router } from '@angular/router';
import { StateService } from '../../../state/state.service';
import { Observable, of } from 'rxjs';
import { debug } from 'util';

@Component({
    selector: 'app-welogin',
    templateUrl: './welogin.component.html',
    styleUrls: ['./welogin.component.css']
})
export class WeloginComponent implements OnInit, OnDestroy {

    private uuid: string;
    public QRCodeSrc: SafeUrl;
    public userAvatar: SafeUrl;
    public loginStatus: number;

    constructor(private weProxyService: WeProxyService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private statuService: StateService) {
    }

    getUUid(): Observable<string> {
        let proxyState = this.statuService.getWeProxyState();
        debugger
        if (proxyState.uuid) {
            return of(proxyState.uuid);
        } else {
            this.weProxyService.getUUid().subscribe(resp => {
                this.statuService.setWeProxyState({ uuid: resp });
                return of(resp);
            });
        }
    }

    ngOnInit() {
        this.loginStatus = 0;
        this.getUUid().subscribe(resp => {
            this.uuid = resp;
            this.QRCodeSrc = `https://login.weixin.qq.com/qrcode/${this.uuid}`;
            this.loginStatus = 1;
            this.checkLogin();
        });
    }

    ngOnDestroy() {
        this.uuid = null;
    };

    checkLogin() {
        if (this.uuid === null) {
            return;
        }
        this.weProxyService.checkLogin(this.uuid).subscribe(resp => {
            eval(resp);
            const responseCode = window['code'];
            if (responseCode === 408) {
                // 等待登陆
                this.checkLogin();
            } else if (responseCode === 201) {
                // 扫描成功
                this.userAvatar = this.sanitizer.bypassSecurityTrustResourceUrl(window['userAvatar']);
                this.loginStatus = 2;
                this.checkLogin();
            } else if (responseCode === 400) {
                // 登录二维码过期
                this.loginStatus = 3;
            } else if (responseCode === 200) {
                // 确认登陆
                const redicrectUrl = window['redirect_uri'];
                this.router.navigate(['webot'], { queryParams: { redicrectUrl } });
            }
        });
    }

}
