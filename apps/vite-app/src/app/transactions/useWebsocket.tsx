'use client';
import { io, type Socket } from 'socket.io-client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useToken } from '../../lib/useToken';

const wsServerUrl =
  import.meta.env['VITE_WS_SERVER_URL'] || 'http://localhost:12222';

export type Handler = (value: unknown) => void;
type HandlerMap = Record<string, Handler>;
type UseWebsocketConfig = {
  handlers?: HandlerMap;
  rooms?: string[];
};
export const useWebsocket = ({
  handlers,
  rooms,
}: UseWebsocketConfig): { connected: boolean } => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState<boolean>(false);
  const token = useToken();

  const onConnect = useCallback(() => {
    setConnected(true);
  }, []);

  const onDisconnect = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.removeAllListeners();
    socket.on('connect', onConnect);
    setConnected(false);
  }, [onConnect]);

  const initSocket = useCallback((token: string) => {
    console.log('init with token', token);
    return io(wsServerUrl, {
      autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  useEffect(() => {
    if (socketRef.current || !token) {
      return;
    }
    socketRef.current = initSocket(token);
    const socket = socketRef.current;
    if (socket) {
      setSocket(socket);
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.connect();
    }
    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [onConnect, onDisconnect, token]);

  useEffect(() => {
    if (!socket || !connected) {
      return;
    }
    if (rooms?.length) {
      rooms.forEach((room) => {
        console.log(`joining room '${room}'`);
        socket.emit('joinRoom', { room });
      });
    }

    if (handlers) {
      Object.entries(handlers).forEach(([ev, handler]) => {
        console.log(`register event handler '${ev}'`);
        socket.on(ev, handler);
      });
    }
  }, [connected, socket, handlers, rooms]);

  return { connected };
};
