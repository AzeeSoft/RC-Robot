export enum AppMode {
  DEBUG,
  PROD
}

export enum RendererMode {
  SERVER,
  FILE
}

export let AppConfig = {
  appMode: AppMode.DEBUG,
  rendererMode: RendererMode.FILE,
}

