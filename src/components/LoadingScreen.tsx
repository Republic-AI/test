import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { iframeRef } from './CocosEmbed';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // 确保iframe加载
  useEffect(() => {
    // 如果iframe还没有设置src，设置它
    if (iframeRef.current && !iframeRef.current.src) {
      iframeRef.current.src = "https://dramai.world/webframe/";
    }
  }, []);

  // 模拟进度条增长
  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        // 模拟进度增长，但最多到90%，等待游戏实际加载完成
        if (prev < 90) {
          return prev + Math.random() * 3;
        }
        return prev;
      });
    }, 300);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // 监听iframe加载完成事件
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (event.data && event.data.type === 'GAME_LOADED') {
          // 游戏加载完成
          console.log('Game loaded successfully');
          setProgress(100);
          setLoaded(true);
          
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          
          // 延迟一会再跳转，让用户看到100%
          setTimeout(() => {
            navigate('/home');
          }, 800);
        }
      } catch (error) {
        console.error('Error processing message from iframe:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // 如果5秒内没有收到加载完成消息，也继续前进
    const timeoutId = setTimeout(() => {
      if (!loaded) {
        console.log('Loading timeout, continuing anyway');
        setProgress(100);
        setLoaded(true);
        
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
        
        setTimeout(() => {
          navigate('/home');
        }, 800);
      }
    }, 10000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeoutId);
    };
  }, [navigate, loaded]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="w-full max-w-md space-y-8 px-4">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="DraMai Logo" 
            className="h-28 w-auto object-contain animate-pulse"
          />
        </div>
        
        {/* Loading Text */}
        <h1 className="text-center text-3xl font-bold text-white">
          Loading DraMai Dreamscape
        </h1>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className="bg-indigo-400 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(Math.round(progress), 100)}%` }}
          ></div>
        </div>
        
        {/* Progress Percentage */}
        <p className="text-center text-white">
          {Math.min(Math.round(progress), 100)}% Complete
        </p>
        
        {/* Status Message */}
        <p className="text-center text-indigo-200 text-sm animate-pulse">
          {loaded ? 'Ready! Redirecting...' : 'Initializing the dreamscape...'}
        </p>
        
        {/* Loading Messages */}
        <div className="mt-8 text-center">
          <p className="text-indigo-300 text-xs">
            {progress < 30 ? "Loading assets..." : 
             progress < 60 ? "Preparing the experience..." : 
             progress < 90 ? "Almost there..." : 
             "Ready to explore!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 