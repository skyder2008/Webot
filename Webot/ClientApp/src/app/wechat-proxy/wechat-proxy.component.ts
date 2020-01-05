import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/state.service';

@Component({
  selector: 'app-wechat-proxy',
  templateUrl: './wechat-proxy.component.html',
  styleUrls: ['./wechat-proxy.component.css']
})
export class WechatProxyComponent implements OnInit {

    constructor(private stateService: StateService) { }

    ngOnInit() {
        //this.stateService.setWeProxyState({ uuid: 'weproxy' })
  }

}
