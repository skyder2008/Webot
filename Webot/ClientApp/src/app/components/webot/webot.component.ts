import { Component, OnInit } from '@angular/core';
import { WeProxyService } from '../../services/we-proxy.service';
import { debug } from 'util';

@Component({
    selector: 'app-webot',
    templateUrl: './webot.component.html',
    styleUrls: ['./webot.component.css']
})
export class WebotComponent implements OnInit {
    private uuid: string;
    public QRCodeSrc: string;

    constructor(private weProxyService: WeProxyService) { }

    ngOnInit() {
        this.weProxyService.getUUid().subscribe(resp => {
            this.uuid = resp;
            this.QRCodeSrc = `https://login.weixin.qq.com/qrcode/${this.uuid}`;

            this.checkLogin();
        });
    }

    checkLogin() {
        this.weProxyService.checkLogin(this.uuid).subscribe(resp => {
            console.log(resp);
            this.checkLogin();
        });
    }

}
