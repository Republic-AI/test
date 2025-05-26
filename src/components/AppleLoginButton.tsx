import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { websocketService } from '@/services/websocket';

// Apple登录配置数据，所有需要修改的参数都集中在这里
const APPLE_CONFIG = {
  // Apple开发者账户相关信息
  teamId: 'UG277K6KVJ',            // 您的Team ID
  clientId: 'world.dramai.dramai', // 您的Bundle ID
  keyId: 'M4Q94M576A',             // 您的Key ID
  // 私钥，实际使用时建议从环境变量获取
  privateKey: `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgvV9kZeH+31tjwOD3
pl5MxXrMqqSSQGG3Wa88sT0DFjqgCgYIKoZIzj0DAQehRANCAAT87V7kjwrXRajo
VmXD8WVeW8vcCIwQpQbrR3TXjfwucWreGhZSM2geg7iS7VjmcjwRZ0LfJrRwawNU
Zk2Cyw5d 
-----END PRIVATE KEY-----`,
  
  // 登录设置
  scope: 'name email',              // 请求的权限范围
  redirectURI: 'https://dramai.world/auth/callback', // 重定向URI
  usePopup: true,                   // 使用弹窗模式 (true表示使用弹窗，不使用return URLs)
  
  // WebSocket登录参数
  loginType: 3,                     // Apple登录类型
  timeZone: 2,                      // 默认时区
  clientOs: 'web',                  // 客户端操作系统
  defaultAvatar: 0,                 // 默认头像ID
  defaultSex: 1,                    // 默认性别
  defaultAvatarPath: '/images/scene/headDir_10016.png' // 默认头像路径
};

interface AppleLoginButtonProps {
  className?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const AppleLoginButton: React.FC<AppleLoginButtonProps> = ({
  className,
  onSuccess,
  onError
}) => {
  useEffect(() => {
    // 加载Apple认证JS SDK
    const loadAppleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.async = true;
      script.id = 'apple-sign-in-script';
      script.onload = initAppleLogin;
      document.body.appendChild(script);
    };

    // 检查脚本是否已加载
    if (!document.getElementById('apple-sign-in-script')) {
      loadAppleScript();
    } else {
      initAppleLogin();
    }

    return () => {
      // 清理函数 - 保留脚本但移除事件监听
    };
  }, []);

  const initAppleLogin = () => {
    // 确保全局 AppleID 对象存在
    if (window.AppleID) {
      try {
        window.AppleID.auth.init({
          clientId: APPLE_CONFIG.clientId,
          scope: APPLE_CONFIG.scope,
          redirectURI: APPLE_CONFIG.redirectURI,
          state: generateRandomString(16),
          usePopup: APPLE_CONFIG.usePopup
        });
      } catch (error) {
        console.error('Apple Sign In 初始化失败:', error);
      }
    }
  };

  // 生成随机字符串用于state参数
  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleAppleLogin = async () => {
    try {
      if (!window.AppleID) {
        throw new Error('Apple Sign In SDK 未加载');
      }

      const response = await window.AppleID.auth.signIn();
      console.log('Apple登录响应:', response);
      
      // 处理授权响应
      if (response.authorization) {
        const { id_token, code } = response.authorization;
        
        if (id_token) {
          // 解析JWT令牌获取用户信息
          const tokenData = parseJwt(id_token);
          console.log('解析的令牌数据:', tokenData);
          
          const userId = tokenData.email || tokenData.sub;
          const userInfo = {
            userId,
            id: tokenData.sub,
            location: 'Unknown',
            avatar: APPLE_CONFIG.defaultAvatarPath,
            points: 0
          };
          
          // 将用户信息保存到 localStorage
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('isSignedIn', 'true');
          
          // 调用websocketService进行登录
          websocketService.login({
            loginType: APPLE_CONFIG.loginType,
            name: userId,
            password: '', // Apple 登录不需要密码
            nickName: tokenData.email ? tokenData.email.split('@')[0] : `apple_${tokenData.sub.substring(0, 8)}`,
            avatar: APPLE_CONFIG.defaultAvatar,
            sex: APPLE_CONFIG.defaultSex,
            timeZone: APPLE_CONFIG.timeZone,
            clientOs: APPLE_CONFIG.clientOs,
            userId: tokenData.sub,
            inviteCode: '',
            invite: '',
            address: ''
          });
          
          // 调用成功回调
          onSuccess?.(userInfo);
        } else {
          throw new Error('未能获取id_token');
        }
      } else {
        throw new Error('授权响应不完整');
      }
    } catch (error) {
      console.error('Apple 登录失败:', error);
      // onError?.(error);
    }
  };

  // 解析JWT令牌
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('解析JWT令牌失败:', e);
      return {};
    }
  };

  return (
    <button
      onClick={handleAppleLogin}
      className={cn(
        "w-full p-3 rounded-lg bg-black text-white font-medium text-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="currentColor"
      >
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.41-.5 1.21-1.15 2.41-2.25 3.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
      Sign in with Apple
    </button>
  );
};

// 扩展Window接口以支持AppleID
declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: any) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

export default AppleLoginButton; 