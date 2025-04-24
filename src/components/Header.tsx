
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Tag = {
  id: string;
  label: string;
};

// Mock data for initial development
const MOCK_TAGS: Tag[] = [
  { id: 'ranch', label: 'RANCH LOVE STORY' },
  { id: 'idol', label: 'URBAN IDOL LIFE' },
];

interface HeaderProps {
  onTagSelect: (tagId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState<string>(MOCK_TAGS[0].id);
  const [tags] = useState<Tag[]>(MOCK_TAGS);

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId);
    onTagSelect(tagId);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-drama-pink via-drama-lavender to-drama-blue bg-clip-text text-transparent">
              DraMai
            </h1>
            <span className="ml-4 text-lg text-muted-foreground">Live Stream AI Drama</span>
          </div>
          
          <div className="relative">
            <div className="overflow-x-auto py-2 flex space-x-2 scrollbar-hide">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleTagClick(tag.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300",
                    selectedTag === tag.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary hover:bg-accent/50 text-foreground"
                  )}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
