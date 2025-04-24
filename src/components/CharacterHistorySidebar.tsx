
import React from 'react';
import { CharacterHistory } from '@/types/drama';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CharacterHistorySidebarProps {
  characters: CharacterHistory[];
  className?: string;
}

const CharacterHistorySidebar: React.FC<CharacterHistorySidebarProps> = ({
  characters,
  className
}) => {
  const navigate = useNavigate();

  const handleCharacterClick = (jumpToSceneId: string) => {
    navigate(`/scene?sceneId=${jumpToSceneId}`);
  };

  return (
    <aside className={cn(
      "w-[260px] flex flex-col h-screen bg-sidebar border-r border-sidebar-border p-4",
      className
    )}>
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="font-serif font-bold text-2xl 
                      bg-gradient-to-r 
                      from-drama-pink via-drama-lavender to-drama-blue 
                      bg-clip-text text-transparent">
          DraMai
        </div>
      </div>

      {/* Character History */}
      <h2 className="font-medium text-lg mb-4">Recent Messages</h2>
      <div className="space-y-3 overflow-y-auto flex-1">
        {characters.map((character) => (
          <div
            key={character.characterId}
            className="bg-sidebar-accent rounded-lg p-3 cursor-pointer hover:bg-sidebar-accent/80 transition-all"
            onClick={() => handleCharacterClick(character.jumpToSceneId)}
          >
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={character.avatar}
                  alt={`${character.characterId} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{character.characterId}</div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {character.preview}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CharacterHistorySidebar;
