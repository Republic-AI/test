
import React from 'react';
import CharacterCard from './CharacterCard';
import { cn } from '@/lib/utils';

interface Character {
  id: string;
  name: string;
  job: string;
  description: string;
  imageUrl: string;
  jumpTo: string;
}

interface CharacterListProps {
  characters: Character[];
  onJumpTo: (sceneId: string) => void;
  className?: string;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onJumpTo,
  className,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <h2 className="text-xl font-serif font-semibold mb-4">Characters</h2>
      
      <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-6 scrollbar-hide">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            job={character.job}
            description={character.description}
            imageUrl={character.imageUrl}
            jumpTo={character.jumpTo}
            onJumpTo={onJumpTo}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
