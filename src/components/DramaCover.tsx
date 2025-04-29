import React from 'react';
import { cn } from '@/lib/utils';
import { useCocos } from './CocosEmbed';

interface DramaCoverProps {
  coverImage: string;
  coverVideo?: string;
  title: string;
  description: string;
  onJumpTo: (sceneId: string) => void;
  jumpTo: string;
  className?: string;
}

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

  const handleClick = () => {
    // 同时执行原始 onJumpTo 函数和发送导航事件
    onJumpTo(jumpTo);
    navigateToScene(jumpTo);
  };

  return (
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
        <button className="mb-4 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all transform group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100 duration-300">
          Start Watching
        </button>
        
        <h2 className="text-white text-3xl font-serif font-bold text-shadow mb-0">{title}</h2>
        <p className="text-white/90 text-shadow-base max-w-2xl line-clamp-2 leading-tight mt-2">{description}</p>
      </div>
    </div>
  );
};

export default DramaCover;
