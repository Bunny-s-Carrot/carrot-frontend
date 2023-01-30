declare global {
  interface Window {
    naver: any
    flutter_inappwebview: any
    OpenGallery: any
  }
}

declare const OpenGallery = { postMessage }

export {}