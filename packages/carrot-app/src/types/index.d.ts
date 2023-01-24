declare global {
  interface Window {
    kakao: any
    OpenMap: any
    DoSomething: any
    DoSomething2: any
    DoSomething3: any
    DoSomething4: any
    DoSomething5: any
    DoSomething6: any
  }
}

declare const OpenMap = { postMessage }

export {}