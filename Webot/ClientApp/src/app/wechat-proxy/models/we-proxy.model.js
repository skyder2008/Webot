"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WechatAuthInfo = /** @class */ (function () {
    function WechatAuthInfo() {
    }
    return WechatAuthInfo;
}());
exports.WechatAuthInfo = WechatAuthInfo;
var WechatInitInfo = /** @class */ (function (_super) {
    __extends(WechatInitInfo, _super);
    function WechatInitInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WechatInitInfo;
}(WechatAuthInfo));
exports.WechatInitInfo = WechatInitInfo;
var SyncKeyItem = /** @class */ (function () {
    function SyncKeyItem() {
    }
    return SyncKeyItem;
}());
exports.SyncKeyItem = SyncKeyItem;
var SyncKey = /** @class */ (function () {
    function SyncKey() {
    }
    SyncKey.prototype.toString1 = function () {
        if (this.List == null) {
            return null;
        }
        var keyString = '';
        this.List.forEach(function (item) {
            keyString += item.Key + "_" + item.Val + "|";
        });
        return keyString.length > 0 ? keyString.substr(0, keyString.length - 1) : keyString;
    };
    return SyncKey;
}());
exports.SyncKey = SyncKey;
var WechatUser = /** @class */ (function () {
    function WechatUser() {
    }
    return WechatUser;
}());
exports.WechatUser = WechatUser;
var WechatInitResponse = /** @class */ (function () {
    function WechatInitResponse() {
    }
    return WechatInitResponse;
}());
exports.WechatInitResponse = WechatInitResponse;
var WechatSyncMsg = /** @class */ (function () {
    function WechatSyncMsg() {
    }
    return WechatSyncMsg;
}());
exports.WechatSyncMsg = WechatSyncMsg;
var WebWXSyncResponse = /** @class */ (function () {
    function WebWXSyncResponse() {
    }
    return WebWXSyncResponse;
}());
exports.WebWXSyncResponse = WebWXSyncResponse;
var SyncCheckInfo = /** @class */ (function (_super) {
    __extends(SyncCheckInfo, _super);
    function SyncCheckInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SyncCheckInfo;
}(WechatInitInfo));
exports.SyncCheckInfo = SyncCheckInfo;
var WebWXSyncInfo = /** @class */ (function (_super) {
    __extends(WebWXSyncInfo, _super);
    function WebWXSyncInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebWXSyncInfo;
}(WechatInitInfo));
exports.WebWXSyncInfo = WebWXSyncInfo;
var WebWXStatusNotifyInfo = /** @class */ (function (_super) {
    __extends(WebWXStatusNotifyInfo, _super);
    function WebWXStatusNotifyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebWXStatusNotifyInfo;
}(WechatInitInfo));
exports.WebWXStatusNotifyInfo = WebWXStatusNotifyInfo;
var WechatMsg = /** @class */ (function () {
    function WechatMsg() {
    }
    return WechatMsg;
}());
exports.WechatMsg = WechatMsg;
var WebWXMsgSendDto = /** @class */ (function (_super) {
    __extends(WebWXMsgSendDto, _super);
    function WebWXMsgSendDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebWXMsgSendDto;
}(WechatInitInfo));
exports.WebWXMsgSendDto = WebWXMsgSendDto;
//# sourceMappingURL=we-proxy.model.js.map