import React from 'react';
import { cn } from '@/lib/utils';

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
  const handleAppleLogin = async () => {
    try {
      // TODO: Implement Apple Sign In
      // This is a placeholder for the actual Apple Sign In implementation
      const mockUserInfo = {
        userId: 'apple_user@example.com',
        id: 'apple_user_id',
        location: 'Unknown',
        avatar: '/icons/default-avatar.png',
        points: 0
      };
      
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
      localStorage.setItem('isSignedIn', 'true');
      
      // Call success callback
      onSuccess?.(mockUserInfo);
    } catch (error) {
      console.error('Apple login failed:', error);
      onError?.(error);
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

export default AppleLoginButton; 