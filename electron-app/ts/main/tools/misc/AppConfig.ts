export enum AppMode {
  DEBUG,
  PROD
}

export enum RendererMode {
  DEV_SERVER,
  FILE
}

export let AppConfig = {
  appMode: AppMode.DEBUG,
  rendererMode: RendererMode.DEV_SERVER,
}

