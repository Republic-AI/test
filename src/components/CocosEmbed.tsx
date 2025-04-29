import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

// 创建上下文
interface CocosContextType {
  sendMessageToGame: (message: any) => void;
  isConnected: boolean;
  lastMessage: string;
  messageLog: string[];
  showIframe: boolean;
  setShowIframe: (show: boolean) => void;
  navigateToScene: (target: string) => void;
}

const CocosContext = createContext<CocosContextType | null>(null);

// 全局状态，确保 iframe 一直存在
const iframeRef = React.createRef<HTMLIFrameElement>();
let isGlobalInitialized = false;
let globalSetShowIframe: ((show: boolean) => void) | null = null;

// 全局方法，用于发送消息到 iframe
const sendMessageToIframe = (message: any) => {
  if (iframeRef.current?.contentWindow) {
    iframeRef.current.contentWindow.postMessage(message, '*');
  }
};

export const useCocos = () => {
  const context = useContext(CocosContext);
  if (!context) {
    throw new Error('useCocos must be used within a CocosEmbed');
  }
  return context;
};

// 全局组件，用于保持 iframe 存在
export const GlobalIframe: React.FC = () => {
  const [showIframe, setShowIframe] = useState(false);
  
  useEffect(() => {
    globalSetShowIframe = setShowIframe;
    return () => {
      globalSetShowIframe = null;
    };
  }, []);
  
  return (
    <iframe
      ref={iframeRef}
      src="https://dramai.world/webframe/"
      className={`fixed left-[300px] top-[100px] w-[470px] h-[750px] border-0 transition-opacity duration-300 ${
        showIframe ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ 
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px 8px 8px 8px'
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};

interface CocosEmbedProps {
  className?: string;
  children?: React.ReactNode;
}

const CocosEmbed: React.FC<CocosEmbedProps> = ({ className, children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>('');
  const [messageLog, setMessageLog] = useState<string[]>([]);
  const [showIframe, setShowIframe] = useState(false);

  const sendMessageToGame = (message: any) => {
    sendMessageToIframe(message);
    setMessageLog(prev => [...prev, `Sent: ${JSON.stringify(message)}`]);
  };

  // 添加导航函数
  const navigateToScene = (target: string) => {
    sendMessageToGame({
      type: "SEND_CUSTOM_EVENT",
      data: {
        action: "navigate",
        target: target
      }
    });
    console.log(`Navigating to scene: ${target}`);
  };

  useEffect(() => {
    // 处理从 iframe 接收的消息
    const handleMessage = (event: MessageEvent) => {
      try {
        if (event.data.type === 'GAME_LOADED') {
          setIsConnected(true);
          // 发送初始场景数据
          sendMessageToGame({
            type: 'INIT_SCENE',
            data: {
              scenes: []
            }
          });
        }
        setLastMessage(JSON.stringify(event.data));
        setMessageLog(prev => [...prev, `Received: ${JSON.stringify(event.data)}`]);
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 组件挂载时显示 iframe
  useEffect(() => {
    if (globalSetShowIframe) {
      globalSetShowIframe(true);
      setShowIframe(true);
    }
    
    return () => {
      if (globalSetShowIframe) {
        globalSetShowIframe(false);
        setShowIframe(false);
      }
    };
  }, []);
  
  return (
    <CocosContext.Provider value={{ 
      sendMessageToGame, 
      isConnected, 
      lastMessage, 
      messageLog,
      showIframe,
      setShowIframe,
      navigateToScene
    }}>
      {children}
    </CocosContext.Provider>
  );
};

export default CocosEmbed;
