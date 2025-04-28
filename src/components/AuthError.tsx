import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthErrorProps {
  error: string;
  onRetry?: () => void;
}

const AuthError: React.FC<AuthErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
      <div className="flex items-start">
        <AlertCircle className="text-red-500 mr-3 mt-0.5" size={18} />
        <div>
          <h3 className="text-sm font-medium text-red-800">认证错误</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
          {onRetry && (
            <button 
              className="mt-3 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
              onClick={onRetry}
            >
              重试
            </button>
          )}
          <div className="mt-2 text-xs text-red-600">
            <p>解决方法：</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>确保 Google Cloud Console 中已配置正确的 JavaScript 来源</li>
              <li>确保已添加 <code>http://localhost:3000</code> 为授权的来源</li>
              <li>检查 .env 文件中的 Client ID 是否正确</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthError; 