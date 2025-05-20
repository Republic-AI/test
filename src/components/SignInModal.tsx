import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleSuccess = () => {
    onClose();
    // 使用 React Router 的 navigate 进行跳转
    navigate('/home');
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