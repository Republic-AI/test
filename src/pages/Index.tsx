
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DramaCover from '@/components/DramaCover';
import CharacterList from '@/components/CharacterList';
import { TabContent } from '@/types/drama';
import { MOCK_DRAMAS } from '@/mock/dramas';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedTagId, setSelectedTagId] = useState<string>('ranch');
  const [currentContent, setCurrentContent] = useState<TabContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock API call to fetch tab content
  const fetchTabContent = async (tagId: string) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get content from our mock data
    const content = MOCK_DRAMAS[tagId];
    
    if (content) {
      setCurrentContent(content);
    } else {
      setCurrentContent(MOCK_DRAMAS['ranch']); // Default fallback
      toast({
        title: "Content not found",
        description: "Showing default content instead",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchTabContent(selectedTagId);
  }, [selectedTagId]);

  const handleTagSelect = (tagId: string) => {
    setSelectedTagId(tagId);
  };

  const handleJumpTo = (sceneId: string) => {
    // In a real app, this would navigate to the Cocos instance
    console.log(`Jumping to scene: ${sceneId}`);
    toast({
      title: "Feature Coming Soon",
      description: `Requested navigation to: ${sceneId}`,
    });
  };

  return (
    <div className="min-h-screen bg-drama-gray/30 flex">
      {/* Sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Header onTagSelect={handleTagSelect} />
        
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-[300px] w-full bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
              <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-[280px] w-[180px] bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                ))}
              </div>
            </div>
          ) : currentContent ? (
            <div className="space-y-8">
              <DramaCover
                coverImage={currentContent.drama.coverImageUrl}
                title={currentContent.drama.title}
                description={currentContent.drama.description}
                jumpTo={currentContent.drama.jumpTo}
                onJumpTo={handleJumpTo}
              />
              
              <CharacterList
                characters={currentContent.drama.characters}
                onJumpTo={handleJumpTo}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg text-muted-foreground">No content available</h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
