import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const useWebSocket = (url: string) => {
  const [isReady, setIsReady] = useState(false);

  const ws = useRef<Socket>();

  useEffect(() => {
    ws.current = io(url);
    ws.current?.on('connect', () => {
      setIsReady(true);
      console.log("Connected with ID: ", ws.current?.id);
    })

    return () => {
      ws.current?.on('disconnect', () => {
        setIsReady(false);
        console.log('WebSocket Disconnected');
      })
      ws.current?.disconnect();
    }
  }, [ws, setIsReady, url]);

  return {
    ws,
    isReady
  }
}

export default useWebSocket