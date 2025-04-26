export interface Tag {
  id: string;
  label: string;
  activeIconUrl: string;    // Icon URL for selected state
  inactiveIconUrl: string;  // Icon URL for unselected state
}

export interface Character {
  id: string;
  name: string;
  job: string;
  description: string;
  imageUrl: string;
  jumpTo: string;
  tags: string[];  // Backend provided tags like "#UnfilteredStoryteller" "#GenuineConnector"
}

export interface Drama {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  coverVideoUrl?: string;  // Optional video URL for the cover
  jumpTo: string;
  characters: Character[];
}

export interface TabContent {
  drama: Drama;
}

// Scene page related types
export interface CharacterHistory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface VoteOption {
  type: 'single' | 'multiple';
  options: string[];
  question: string;
}

export interface AIPost {
  id: string;
  text: string;
  content: string;
  characterId: string;
  timestamp: string;
  voteCount: number;
  author: string;
  avatar: string;
  vote: {
    options: string[];
  };
  image?: string;
}

export interface VoteHistory {
  threadId: string;
  question: string;
  hasVoted: boolean;
  userChoice?: string;
  correctOption: string;
  options: string[];
  timestamp: string;
}

export interface SceneData {
  id: string;
  title: string;
  description: string;
  characters: CharacterHistory[];
  aiPosts: AIPost[];
  voteHistory: VoteHistory[];
}

export interface Message {
  id: string;
  content: string;
  characterId: string;
  timestamp: string;
}

export interface ScenePageProps {
  sceneId: string;
  userId?: string;
}
