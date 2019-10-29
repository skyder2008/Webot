import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { WeProxyService } from '../../services/we-proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welogin',
  templateUrl: './welogin.component.html',
  styleUrls: ['./welogin.component.css']
})
export class WeloginComponent implements OnInit, OnDestroy {

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
              this.QRCodeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(window['userAvatar']);
              this.checkLogin();
          } else if (responseCode === 200) {
              // 确认登陆
              const redicrectUrl = window['redirect_uri'];
              this.router.navigate(['webot'], { queryParams: { redicrectUrl } });
          }
      });
  }

}
