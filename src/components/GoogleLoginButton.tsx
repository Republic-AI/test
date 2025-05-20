import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { cn } from '@/lib/utils';

interface GoogleLoginButtonProps {
  className?: string;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  className,
  onSuccess,
  onError
}) => {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      // 获取用户信息
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // 处理用户信息
          const userInfo = {
            userId: data.email,
            id: data.sub,
            location: 'Unknown',
            avatar: data.picture,
            points: 0
          };
          
          // 保存到 localStorage
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('isSignedIn', 'true');
          
          // 调用成功回调
          onSuccess?.(userInfo);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          onError?.(error);
        });
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      onError?.(error);
    },
    flow: 'implicit'
  });

  return (
    <button
      onClick={() => login()}
      className={cn(
        "w-full p-3 rounded-lg bg-white text-gray-700 font-medium text-lg hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2",
        className
      )}
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="w-5 h-5"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton; 