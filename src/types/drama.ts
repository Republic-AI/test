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
  roomId: string;
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

export interface TweetComment {
  id: string | number;
  content: string;
  nickName: string;
  authorAvatar?: string; // 可能不需要
  createTime?: number;
  tweetCommentVoList?: TweetComment[]; // 嵌套评论
  tweetCommentVo?: TweetComment[]; // 备用字段名
}

export interface TweetChoiceOption {
  id: string;
  content: string;
  rate: number; // 百分比，如 25 表示 25%
}

export interface AIPost {
  roomId: string | number;
  id: string | number;
  content: string;
  imgUrl?: string;
  tweetCommentVoList: TweetComment[];
  commentCount: number;
  likeCount: number;
  like: boolean;
  createTime: number; // 时间戳
  tweetType: string | number;
  npcId: string | number;
  npcName?: string; // 可能不在数据中
  npcAvatar?: string; // 可能不在数据中
  chooseList?: string[]; // 改为字符串数组
  choose?: boolean | string; // 可能是布尔值或选项ID
  rateList?: number[]; // 各选项的百分比数组
}

export interface VoteHistory {
  roomId: string;
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
