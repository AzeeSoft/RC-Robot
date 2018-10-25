"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppMode;
(function (AppMode) {
    AppMode[AppMode["DEBUG"] = 0] = "DEBUG";
    AppMode[AppMode["PROD"] = 1] = "PROD";
})(AppMode = exports.AppMode || (exports.AppMode = {}));
var RendererMode;
(function (RendererMode) {
    RendererMode[RendererMode["DEV_SERVER"] = 0] = "DEV_SERVER";
    RendererMode[RendererMode["FILE"] = 1] = "FILE";
})(RendererMode = exports.RendererMode || (exports.RendererMode = {}));
exports.AppConfig = {
    appMode: AppMode.DEBUG,
    rendererMode: RendererMode.DEV_SERVER,
};
