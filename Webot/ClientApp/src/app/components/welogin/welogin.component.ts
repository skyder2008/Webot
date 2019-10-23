import { Component, OnInit } from '@angular/core';
import { WeProxyService } from '../../services/we-proxy.service';
import { debug } from 'util';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welogin',
    templateUrl: './welogin.component.html',
    styleUrls: ['./welogin.component.css']
})
export class WeloginComponent implements OnInit {
    private uuid: string;
    public QRCodeSrc: SafeUrl;

    constructor(private weProxyService: WeProxyService,
        private sanitizer: DomSanitizer,
        private router: Router) {
    }

    ngOnInit() {
        this.weProxyService.getUUid().subscribe(resp => {
            this.uuid = resp;
            this.QRCodeSrc = `https://login.weixin.qq.com/qrcode/${this.uuid}`;

            this.checkLogin();
        });
    }

    checkLogin() {
        this.weProxyService.checkLogin(this.uuid).subscribe(resp => {
            eval(resp);
            let responseCode = window["code"];
            if (responseCode == 408) {
                //等待登陆
                this.checkLogin();
            }
            else if (responseCode == 201) {
                //扫描成功
                this.QRCodeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(window['userAvatar']);
                this.checkLogin();
            } else if (responseCode == 200) {
                //确认登陆
                var redicrectUrl = window['redirect_uri'];
                this.router.navigate(['webot'], { queryParams: { redicrectUrl } });
            }
        });
    }

    wechatInit(redirectUrl: string) {
        //this.weProxyService.getAuthInfo(this.re)
    };
}
