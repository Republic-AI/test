
export interface Tag {
  id: string;
  label: string;
  iconUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  job: string;
  description: string;
  imageUrl: string;
  jumpTo: string;
}

export interface Drama {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  jumpTo: string;
  characters: Character[];
}

export interface TabContent {
  drama: Drama;
}

// Scene page related types
export interface CharacterHistory {
  characterId: string;
  avatar: string;
  preview: string;
  jumpToSceneId: string;
}

export interface VoteOption {
  type: 'single' | 'multiple';
  options: string[];
}

export interface AIPost {
  author: string;
  avatar: string;
  content: string;
  image?: string;
  vote?: VoteOption;
  timestamp: string;
}

export interface VoteHistory {
  question: string;
  options: string[];
  userChoice: string;
}

export interface ScenePageProps {
  sceneId: string;
  userId?: string;
}
