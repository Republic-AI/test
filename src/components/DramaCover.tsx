import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useCocos } from './CocosEmbed';
import SignInModal from './SignInModal';

interface DramaCoverProps {
  coverImage: string;
  coverVideo?: string;
  title: string;
  description: string;
  onJumpTo: (sceneId: string) => void;
  jumpTo: string;
  className?: string;
}

const useTypewriter = (text: string, forwardSpeed: number = 50, backwardSpeed: number = 30, delay: number = 0, loop: boolean = false) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    const speed = isDeleting ? backwardSpeed : forwardSpeed;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < text.length) {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (loop) {
          // Start deleting after a longer pause
          setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          // Start typing again after a longer pause
          setTimeout(() => {}, 2000);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, forwardSpeed, backwardSpeed, isStarted, isDeleting, loop]);

  return displayText;
};

const DramaCover: React.FC<DramaCoverProps> = ({ 
  coverImage, 
  coverVideo,
  title, 
  description,
  onJumpTo,
  jumpTo,
  className 
}) => {
  const { navigateToScene } = useCocos();
  const displayTitle = useTypewriter(title, 50, 20);
  const displayDescription = useTypewriter(description, 40, 15, title.length * 50 + 500, true); // Forward: 40ms, Backward: 15ms (faster overall)
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleClick = () => {
    const isSignedIn = localStorage.getItem('isSignedIn') === 'true';
    if (isSignedIn) {
    onJumpTo(jumpTo);
    navigateToScene(jumpTo);
    } else {
      setShowSignInModal(true);
    }
  };

  return (
    <>
    <div 
      className={cn(
        "relative w-full h-[300px] rounded-xl overflow-hidden group cursor-pointer",
        "animate-fade-in shadow-lg",
        className
      )}
      onClick={handleClick}
    >
      {coverVideo ? (
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={coverVideo} type="video/mp4" />
          {/* Fallback to image if video fails to load */}
          <img 
            src={coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full" 
          style={{ 
            backgroundImage: `url(${coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
      />
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <button className="mb-1 px-6 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all transform group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100 duration-300 text-base font-medium">
          Start Watching
        </button>
        
        <h2 className="text-white text-3xl font-serif font-bold text-shadow mb-0">
          {displayTitle}
        </h2>
        <p className="text-white/80 text-shadow-base text-sm max-w-2xl line-clamp-2 font-light leading-none mt-0">
          {displayDescription}
          <span className="animate-blink">|</span>
        </p>
      </div>
    </div>
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </>
  );
};

export default DramaCover;
