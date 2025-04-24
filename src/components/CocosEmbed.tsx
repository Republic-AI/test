
import React from 'react';
import { cn } from '@/lib/utils';

interface CocosEmbedProps {
  sceneId: string;
  className?: string;
}

const CocosEmbed: React.FC<CocosEmbedProps> = ({
  sceneId,
  className
}) => {
  // In a real implementation, this would be an iframe with a URL like:
  // `/cocos/embed?sceneId=${sceneId}`
  
  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg flex-1 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-lg font-medium mb-2">Cocos Game Embed</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Scene ID: {sceneId}
          </p>
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <p className="text-muted-foreground">Game content would load here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocosEmbed;
