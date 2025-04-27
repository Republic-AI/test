import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface CocosEmbedProps {
  sceneId: string | number;
  className?: string;
}

// 消息类型定义
interface GameMessage {
  type: string;
  data: any;
}

const IFRAME_URL = "https://dramai.world/webframe/"; // 这里替换为你的实际地址

const EVENT_NAME = "SEND_CUSTOM_EVENT";

const CocosEmbed: React.FC<CocosEmbedProps> = ({
  sceneId,
  className
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);

  // 发送消息到 Cocos 游戏
  const sendMessageToGame = (message: GameMessage) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // 确保使用同源域名
      iframeRef.current.contentWindow.postMessage(message, window.location.origin);
      console.log('Sent message to game:', message);
    } else {
      console.warn('Game iframe not ready yet');
    }
  };

  // 监听来自游戏的消息
  useEffect(() => {
    const handleGameMessage = (event: MessageEvent) => {
      // 验证消息来源，确保安全
      if (event.origin !== window.location.origin) {
        console.warn('Received message from unknown origin:', event.origin);
        return;
      }

      // 处理游戏消息
      try {
        const message = event.data;
        console.log('Received message from game:', message);
        
        // 处理不同类型的消息
        switch (message.type) {
          case 'GAME_LOADED':
            setGameLoaded(true);
            break;
          case 'GAME_EVENT':
            setLastMessage(JSON.stringify(message.data));
            break;
          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error processing game message:', error);
      }
    };

    // 添加事件监听器
    window.addEventListener('message', handleGameMessage);

    // 清理函数
    return () => {
      window.removeEventListener('message', handleGameMessage);
    };
  }, []);

  // 游戏加载完成后发送初始化数据
  useEffect(() => {
    if (gameLoaded) {
      sendMessageToGame({
        type: 'INIT_SCENE',
        data: { sceneId }
      });
    }
  }, [gameLoaded, sceneId]);

  // 示例：发送一个测试消息到游戏
  const handleSendTestMessage = () => {
    sendMessageToGame({
      type: 'TEST_ACTION',
      data: { action: 'jump', timestamp: Date.now() }
    });
  };

  // 发送事件到 iframe
  const sendCustomEvent = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const message = {
        type: EVENT_NAME,
        data: { msg: "Hello from parent!", time: Date.now() }
      };
      iframeRef.current.contentWindow.postMessage(message, "*");
      setLog(l => [`[Parent] Sent: ${JSON.stringify(message)}`, ...l]);
    }
  };

  // 监听来自 iframe 的消息
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // 你可以加 event.origin 校验
      setLog(l => [`[Parent] Received: ${JSON.stringify(event.data)}`, ...l]);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg flex-1 flex flex-col">
        <div className="p-2 flex justify-between items-center border-b">
          <h3 className="text-lg font-medium">Cocos Game: Scene {sceneId}</h3>
          <div className="flex items-center space-x-2">
            <span className={cn(
              "h-3 w-3 rounded-full",
              gameLoaded ? "bg-green-500" : "bg-amber-500"
            )}></span>
            <span className="text-xs text-muted-foreground">
              {gameLoaded ? "Connected" : "Loading..."}
            </span>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <iframe
            ref={iframeRef}
            src={IFRAME_URL}
            className="absolute inset-0 w-full h-full border-0"
            title="Cocos Game"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        <div className="p-2 border-t bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleSendTestMessage}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Send Test Message
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={sendCustomEvent}
            >
              发送自定义事件到游戏
            </button>
            <div className="text-xs text-gray-500 truncate max-w-[60%]">
              {lastMessage ? `Last event: ${lastMessage}` : 'No events yet'}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 border-t bg-gray-50 text-xs h-32 overflow-auto">
        <div>日志：</div>
        {log.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default CocosEmbed;
