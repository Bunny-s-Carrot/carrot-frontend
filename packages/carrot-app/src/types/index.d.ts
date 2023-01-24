declare global {
  interface Window {
    kakao: any
    OpenMap: any
    getCoords: any
    DoSomething2: any
    DoSomething3: any
    DoSomething4: any
    DoSomething5: any
    DoSomething6: any
  }

  interface WindowEventMap {
    mapEvent: CustumEvent;
  }
}

declare const OpenMap = { postMessage }

export {}