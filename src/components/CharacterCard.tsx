
import React from 'react';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  name: string;
  job: string;
  description: string;
  imageUrl: string;
  jumpTo: string;
  onJumpTo: (sceneId: string) => void;
  className?: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  job,
  description,
  imageUrl,
  jumpTo,
  onJumpTo,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-[180px] h-[280px] rounded-xl overflow-hidden card-shadow bg-white dark:bg-gray-800",
        "hover:animate-card-hover cursor-pointer transition-all duration-300",
        className
      )}
      onClick={() => onJumpTo(jumpTo)}
    >
      {/* Character Image */}
      <div className="h-[180px] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={`Character ${name}`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* Character Info */}
      <div className="p-3">
        <h3 className="font-medium text-base">{name}</h3>
        <div className="text-xs text-primary font-medium mb-1">{job}</div>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
