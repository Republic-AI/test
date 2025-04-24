
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CharacterHistorySidebar from '@/components/CharacterHistorySidebar';
import CocosEmbed from '@/components/CocosEmbed';
import SceneThreadFeed from '@/components/SceneThreadFeed';
import VoteHistoryPanel from '@/components/VoteHistoryPanel';
import { CharacterHistory, AIPost, VoteHistory } from '@/types/drama';
import { MOCK_SCENE_CHARACTER_HISTORY, MOCK_SCENE_THREAD, MOCK_VOTE_HISTORY } from '@/mock/scene-data';
import { toast } from '@/components/ui/use-toast';

const Scene: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sceneId = searchParams.get('sceneId') || 'scene_A1';
  
  const [characterHistory, setCharacterHistory] = useState<CharacterHistory[]>([]);
  const [aiPosts, setAiPosts] = useState<AIPost[]>([]);
  const [voteHistory, setVoteHistory] = useState<VoteHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock API calls to fetch scene data
  const fetchSceneData = async () => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get mock data
      const charactersData = MOCK_SCENE_CHARACTER_HISTORY[sceneId] || MOCK_SCENE_CHARACTER_HISTORY['scene_A1'];
      const postsData = MOCK_SCENE_THREAD[sceneId] || MOCK_SCENE_THREAD['scene_A1'];
      const votesData = MOCK_VOTE_HISTORY[sceneId] || MOCK_VOTE_HISTORY['scene_A1'];
      
      setCharacterHistory(charactersData);
      setAiPosts(postsData);
      setVoteHistory(votesData);
    } catch (error) {
      console.error("Error fetching scene data:", error);
      toast({
        title: "Error loading scene data",
        description: "Could not load the scene data. Using default content.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSceneData();
  }, [sceneId]);

  const handleTagSelect = (tagId: string) => {
    navigate(`/?tagId=${tagId}`);
  };

  return (
    <div className="min-h-screen bg-drama-gray/30 flex">
      {/* Sidebar */}
      <CharacterHistorySidebar characters={characterHistory} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Header onTagSelect={handleTagSelect} />
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading scene...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row px-4 py-6 gap-4">
            {/* Game Embed */}
            <div className="w-full md:w-[320px] md:h-auto flex-shrink-0 mb-4 md:mb-0">
              <CocosEmbed sceneId={sceneId} className="h-[400px] md:h-full" />
            </div>
            
            {/* Thread Feed */}
            <div className="w-full md:w-[400px] flex-1">
              <SceneThreadFeed posts={aiPosts} />
            </div>
            
            {/* Vote History */}
            <div className="w-full md:w-[300px] md:h-auto flex-shrink-0">
              <VoteHistoryPanel voteHistory={voteHistory} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Scene;
