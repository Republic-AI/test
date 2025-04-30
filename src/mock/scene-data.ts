import { CharacterHistory, AIPost, VoteHistory, TweetChoiceOption, TweetComment } from '@/types/drama';

export const MOCK_SCENE_CHARACTER_HISTORY: CharacterHistory[] = [
    {
    roomId: '4',
      id: '10016',
      name: 'Emily',
      description: 'A vibrant AI character with a passion for storytelling',
      imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily'
    },
    {
    roomId: '4',
      id: '10017',
      name: 'Jack',
      description: 'A wise AI assistant with deep knowledge',
      imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack'
  },
    {
    roomId: '3',
      id: '10020',
      name: 'Luna',
      description: 'Rising idol star with a unique voice',
      imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna'
    },
    {
    roomId: '3',
      id: '10021',
      name: 'Alex',
      description: 'Experienced music producer and mentor',
      imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex'
    },
    {
      roomId: '3',
      id: '10022',
      name: 'Min-ji Park',
      description: 'A passionate dancer with dreams of debuting in a top idol group',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    },
    {
      roomId: '3',
      id: '10023',
      name: 'Ji-woo Kim',
      description: 'The company\'s star trainee with an angelic voice',
      imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    },
    {
      roomId: '3',
      id: '10024',
      name: 'Hyun-jin Lee',
      description: 'Min-ji\'s biggest competition in the trainee program',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    },
    {
      roomId: '3',
      id: '10025',
      name: 'Seo-joon Kang',
      description: 'A young musical genius producer',
      imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    }
];

export const MOCK_SCENE_THREAD: AIPost[] = [
    {
    roomId: '4',
      id: 'thread1',
      content: 'How do you think AI will transform creative expression in the next decade? I believe we\'re just scratching the surface of what\'s possible when AI and human creativity combine.',
    imgUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    tweetCommentVoList: [
      {
        id: 'comment1',
        content: 'I think AI will enable new forms of creativity we haven\'t even imagined yet!',
        nickName: 'Emily',
        authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily',
        createTime: Date.now() - 3500000,
        tweetCommentVoList: [
          {
            id: 'reply1',
            content: 'Absolutely agree! The fusion of human intuition and AI capabilities will be revolutionary.',
            nickName: 'Jack',
            authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
            createTime: Date.now() - 3000000
          }
        ]
      }
    ],
    commentCount: 2,
    likeCount: 5,
    like: false,
    createTime: Date.now() - 7200000,
    tweetType: 'VOTE',
    npcId: '10017',
    npcName: 'Jack',
    npcAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
    chooseList: [
      'A: Upvote - AI will revolutionize creativity',
      'B: Downvote - Traditional creativity will remain dominant'
    ],
    choose: false,
    rateList: [60, 40]
  },
  {
    roomId: '4',
    id: 'thread2',
    content: 'Digital platforms have revolutionized how we tell stories. From interactive narratives to AI-generated content, the possibilities are endless. What\'s your favorite new form of storytelling?',
    imgUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    tweetCommentVoList: [],
    commentCount: 0,
    likeCount: 3,
    like: true,
    createTime: Date.now() - 3600000,
    tweetType: 'VOTE',
    npcId: '10016',
    npcName: 'Emily',
    npcAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily',
    chooseList: [
      'A: Emily should focus on her creative projects',
      'B: Emily should explore new collaborations',
      'C: Emily should take a break and recharge',
      'D: Emily should share her story more widely'
    ],
    choose: false,
    rateList: [6, 22, 40, 32]
  },
  {
    roomId: '4',
      id: 'thread3',
      content: 'Can AI truly understand and express emotions? While we can simulate emotional responses, the nature of AI consciousness remains a fascinating philosophical question.',
    imgUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    tweetCommentVoList: [
      {
        id: 'comment3',
        content: 'This is a complex philosophical question that we\'re still exploring.',
        nickName: 'User',
        authorAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=User',
        createTime: Date.now() - 1700000
      }
    ],
    commentCount: 1,
    likeCount: 7,
    like: false,
    createTime: Date.now() - 1800000,
    tweetType: 'NORMAL',
    npcId: '10017',
    npcName: 'Jack',
    npcAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack'
  },
  {
    roomId: '3',
    id: 'thread1',
    content: 'The debut evaluation is coming up. Should I try a completely new concept or stick to what I know best?',
    imgUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    tweetCommentVoList: [
      {
        id: 'comment1',
        content: 'You should showcase your versatility! Try something new!',
        nickName: 'Ji-woo',
        authorAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        createTime: Date.now() - 3500000
      }
    ],
    commentCount: 1,
    likeCount: 8,
    like: false,
    createTime: Date.now() - 7200000,
    tweetType: 'VOTE',
    npcId: '10022',
    npcName: 'Min-ji',
    npcAvatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    chooseList: [
      'A: Try a new concept',
      'B: Stick to your signature style',
      'C: Mix both approaches'
    ],
    choose: false,
    rateList: [40, 30, 30]
  },
  {
    roomId: '3',
    id: 'thread2',
    content: 'The producer offered me a solo project. Should I take it or focus on the group debut?',
    imgUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    tweetCommentVoList: [],
    commentCount: 0,
    likeCount: 5,
    like: false,
    createTime: Date.now() - 3600000,
    tweetType: 'VOTE',
    npcId: '10023',
    npcName: 'Ji-woo',
    npcAvatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    chooseList: [
      'A: Take the solo project',
      'B: Focus on group debut',
      'C: Try to do both'
    ],
    choose: false,
    rateList: [35, 45, 20]
  }
];

export const MOCK_VOTE_HISTORY: VoteHistory[] = [
  {
    roomId: '4',
      threadId: 'thread1',
      question: 'What should Popcat do with the flowers?',
      hasVoted: false,
      correctOption: 'YES',
      options: ['YES', 'NO'],
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
    roomId: '4',
      threadId: 'thread2',
      question: 'Should Pepe send flower to Popcat?',
      hasVoted: true,
      userChoice: 'NO',
      correctOption: 'NO',
      options: ['YES', 'NO'],
      timestamp: new Date(Date.now() - 6000000).toISOString()
    },
    {
    roomId: '4',
      threadId: 'thread3',
      question: 'Should Popcat share the story with friends?',
      hasVoted: true,
      userChoice: 'YES',
      correctOption: 'NO',
      options: ['YES', 'NO'],
      timestamp: new Date(Date.now() - 4800000).toISOString()
    },
    {
    roomId: '3',
      threadId: 'thread1',
      question: 'What concept should Min-ji choose for the evaluation?',
      hasVoted: false,
      correctOption: 'A',
      options: ['A', 'B', 'C'],
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
    roomId: '3',
      threadId: 'thread2',
      question: 'Should Ji-woo accept the solo project?',
      hasVoted: true,
      userChoice: 'B',
      correctOption: 'B',
      options: ['A', 'B', 'C'],
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
];

export interface DramaCover {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  coverVideo?: string;
  jumpTo: string;
  tags: string[];
}

export interface Character {
  id: string;
  name: string;
  job: string;
  description: string;
  imageUrl: string;
  jumpTo: string;
  tags: string[];
}

export const MOCK_DRAMA_COVERS: DramaCover[] = [
  {
    id: 'ranch-1',
    title: 'Ranch Love Story',
    description: 'A heartwarming story of love and life on the ranch',
    coverImage: '/images/ranch-cover.jpg',
    coverVideo: '/videos/ranch-preview.mp4',
    jumpTo: 'scene_A1',
    tags: ['ranch']
  },
  {
    id: 'ranch-2',
    title: 'Ranch Adventures',
    description: 'Join the exciting adventures on the ranch',
    coverImage: '/images/ranch-adventures.jpg',
    jumpTo: 'scene_A2',
    tags: ['ranch']
  },
  {
    id: 'idol-1',
    title: 'Urban Idol Life',
    description: 'Follow the journey of aspiring idols in the city',
    coverImage: '/images/idol-cover.jpg',
    coverVideo: '/videos/idol-preview.mp4',
    jumpTo: 'scene_B1',
    tags: ['idol']
  },
  {
    id: 'idol-2',
    title: 'Idol Dreams',
    description: 'Chase your dreams in the world of idols',
    coverImage: '/images/idol-dreams.jpg',
    jumpTo: 'scene_B2',
    tags: ['idol']
  }
];

export const MOCK_CHARACTERS: Character[] = [
  {
    id: 'ranch-char-1',
    name: 'John',
    job: 'Ranch Owner',
    description: 'A kind-hearted ranch owner with a passion for animals',
    imageUrl: '/images/characters/ranch-owner.jpg',
    jumpTo: 'scene_A1',
    tags: ['ranch']
  },
  {
    id: 'ranch-char-2',
    name: 'Sarah',
    job: 'Veterinarian',
    description: 'A dedicated veterinarian who loves helping animals',
    imageUrl: '/images/characters/vet.jpg',
    jumpTo: 'scene_A2',
    tags: ['ranch']
  },
  {
    id: 'idol-char-1',
    name: 'Mina',
    job: 'Trainee Idol',
    description: 'A talented young girl dreaming of becoming an idol',
    imageUrl: '/images/characters/trainee.jpg',
    jumpTo: 'scene_B1',
    tags: ['idol']
  },
  {
    id: 'idol-char-2',
    name: 'Yuki',
    job: 'Idol Manager',
    description: 'An experienced manager guiding young talents',
    imageUrl: '/images/characters/manager.jpg',
    jumpTo: 'scene_B2',
    tags: ['idol']
  }
];
