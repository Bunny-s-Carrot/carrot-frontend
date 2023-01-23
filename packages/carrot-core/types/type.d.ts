declare module '*.svg' {
  const value: any
  export = value
}

declare module '*.png' {
  const value: any
  export = value
}

declare global {
export interface Window {
    kakao: any;
    openMap: any;

  }
}