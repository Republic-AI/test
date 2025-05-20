import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import GoogleLoginButton from './GoogleLoginButton';
import AppleLoginButton from './AppleLoginButton';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const handleSuccess = () => {
    onClose();
    // 直接跳转到 /home，不显示启动画面
    window.location.replace('/home');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Sign in to continue
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <GoogleLoginButton onSuccess={handleSuccess} />
          <AppleLoginButton onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal; 