import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/state.service';

@Component({
  selector: 'app-webot-config',
  templateUrl: './webot-config.component.html',
  styleUrls: ['./webot-config.component.css']
})
export class WebotConfigComponent implements OnInit {
    private uuid: string;
    constructor(private stateService: StateService) { }

    ngOnInit() {
        this.uuid = this.stateService.getWeProxyState().uuid;
  }

}
