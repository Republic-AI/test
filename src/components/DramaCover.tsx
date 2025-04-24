
import React from 'react';
import { cn } from '@/lib/utils';

interface DramaCoverProps {
  coverImage: string;
  title: string;
  description: string;
  onJumpTo: (sceneId: string) => void;
  jumpTo: string;
  className?: string;
}

const DramaCover: React.FC<DramaCoverProps> = ({ 
  coverImage, 
  title, 
  description,
  onJumpTo,
  jumpTo,
  className 
}) => {
  return (
    <div 
      className={cn(
        "relative w-full h-[300px] rounded-xl overflow-hidden group cursor-pointer",
        "animate-fade-in shadow-lg",
        className
      )}
      onClick={() => onJumpTo(jumpTo)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${coverImage})` }} 
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h2 className="text-white text-3xl font-serif font-bold text-shadow mb-2">{title}</h2>
        <p className="text-white/90 text-shadow-sm max-w-2xl line-clamp-2">{description}</p>
        
        <button className="mt-4 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all transform group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100 duration-300">
          Start Watching
        </button>
      </div>
    </div>
  );
};

export default DramaCover;
