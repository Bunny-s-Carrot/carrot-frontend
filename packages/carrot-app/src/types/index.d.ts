declare global {
  interface Window {
    kakao: any
    flutter_inappwebview: any
  }
}

declare const flutter_inappwebview = { callHandler }

export {}