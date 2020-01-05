import { Injectable } from '@angular/core';
import { WeProxyState, defaultWeProxyState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class StateService {
    private weProxyState: WeProxyState;

    constructor() {
        this.weProxyState = defaultWeProxyState; 
    }

    getWeProxyState(): WeProxyState {
        return this.weProxyState;
    }

    setWeProxyState(state: WeProxyState) {
        Object.assign(this.weProxyState, state)
    }
}
