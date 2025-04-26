import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CocosEmbed from '@/components/CocosEmbed';
import SceneThreadFeed from '@/components/SceneThreadFeed';
import VoteHistoryPanel from '@/components/VoteHistoryPanel';
import { CharacterHistory, AIPost, VoteHistory } from '@/types/drama';
import { MOCK_SCENE_CHARACTER_HISTORY, MOCK_SCENE_THREAD, MOCK_VOTE_HISTORY } from '@/mock/scene-data';
import { toast } from '@/components/ui/use-toast';
import CharacterHistorySidebar from '@/components/CharacterHistorySidebar';
import { websocketService } from '@/services/websocket';

interface UserInfo {
  userId: string;
  id: string;
  location: string;
  avatar: string;
  points: number;
}

const Scene: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sceneId = searchParams.get('sceneId') || 'scene_A1';
  
  const [characterHistory, setCharacterHistory] = useState<CharacterHistory[]>([]);
  const [aiPosts, setAiPosts] = useState<AIPost[]>([]);
  const [voteHistory, setVoteHistory] = useState<VoteHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Check login status on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedLoginStatus = localStorage.getItem('isSignedIn');
    
    if (storedUserInfo && storedLoginStatus) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsSignedIn(true);
    }
  }, []);

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

  const handleLogin = () => {
    const mockUserInfo = {
      userId: "JohnDoe",
      id: "123456",
      location: "New York",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      points: 100
    };

    // Save to localStorage
    localStorage.setItem('userInfo', JSON.stringify(mockUserInfo));
    localStorage.setItem('isSignedIn', 'true');
    
    // Update state
    setIsSignedIn(true);
    setUserInfo(mockUserInfo);
    
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in."
    });
  };

  useEffect(() => {
    fetchSceneData();
  }, [sceneId]);

  useEffect(() => {
    const handleNewMessage = (message: CharacterHistory) => {
      setCharacterHistory(prev => {
        // Check if message already exists using id
        const exists = prev.some(m => m.id === message.id);
        if (exists) return prev;
        
        // Add new message to the beginning of the array
        return [message, ...prev].slice(0, 10); // Keep only the 10 most recent messages
      });
    };

    // Subscribe to WebSocket messages
    websocketService.subscribe(handleNewMessage);

    // Cleanup on unmount
    return () => {
      websocketService.unsubscribe(handleNewMessage);
    };
  }, []);

  const handleTagSelect = (tagId: string) => {
    navigate(`/?tagId=${tagId}`);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        characters={characterHistory} 
        className="flex-shrink-0"
        isSignedIn={isSignedIn}
        userInfo={userInfo}
        onLogin={handleLogin}
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onTagSelect={handleTagSelect} className="flex-shrink-0" />
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading scene...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
            {/* Game Embed */}
            <div className="w-full md:min-w-[480px] md:w-[calc(100%-800px)] h-full flex-shrink-0 mb-4 md:mb-0 overflow-y-auto">
              <CocosEmbed sceneId={sceneId} className="h-full" />
            </div>
            
            {/* Content Columns Container */}
            <div className="flex-1 grid grid-cols-2 gap-4 h-full md:max-w-[800px]">
            {/* Thread Feed */}
              <div className="h-full overflow-y-auto">
                <SceneThreadFeed 
                  posts={aiPosts} 
                  isSignedIn={isSignedIn}
                />
            </div>
            
            {/* Vote History */}
              <div className="h-full overflow-y-auto">
              <VoteHistoryPanel voteHistory={voteHistory} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Scene;
