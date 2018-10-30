export enum AppMode {
  DEBUG,
  PROD
}

export enum RendererMode {
  SERVER,
  FILE
}

export let appConfig = {
  appMode: AppMode.DEBUG,
  rendererMode: RendererMode.FILE,
}

