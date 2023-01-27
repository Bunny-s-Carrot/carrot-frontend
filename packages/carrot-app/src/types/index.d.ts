declare global {
  interface Window {
    naver: any
    kakao: any
    flutter_inappwebview: any
  }
}

declare const flutter_inappwebview = { callHandler }

export {}