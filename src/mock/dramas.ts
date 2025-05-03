import { Drama, TabContent } from '../types/drama';

// Mock data for development
export const MOCK_DRAMAS: Record<string, TabContent> = {
  ranch: {
    drama: {
      roomId: 4,
      title: '100 Times in Love',
      description: 'A heartwarming tale of love and friendship on a beautiful countryside ranch. Follow Lily and Mark as they navigate life, love, and the challenges of ranch living.',
      coverImageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      coverVideoUrl: '/videos/ranch-preview.mp4',
      jumpTo: '4',
      characters: [
        {
          npcId: 10016,
          name: 'Yves',
          job: 'Artist',
          description: 'Left fame behind—now paints silence, sorrow, and secret dreams.',
          imageUrl: '/images/lobby/imgNpc_10016.png',
          jumpTo: '10016',
          tags: ['ArtisticStorytelling', 'CreativeCooking']
        },
        {
          npcId: 10017,
          name: 'Ivy',
          job: 'Baker',
          description: 'Bakes love daily—her smile\'s the town\'s unofficial sunshine.',
          imageUrl: '/images/lobby/imgNpc_10017.png',
          jumpTo: '10017',
          tags: ['BakedComfort', 'EmpatheticListener']
        },
        {
          npcId: 10018,
          name: 'Liam',
          job: 'Lawyer',
          description: 'Commands every room—cool mind, loyal heart, secrets under control.',
          imageUrl: '/images/lobby/imgNpc_10018.png',
          jumpTo: '10018',
          tags: ['ConflictMediator', 'BalancedEmpathy']
        },
        {
          npcId: 10019,
          name: 'Nina',
          job: 'Investor',
          description: 'Moves quietly, thinks sharply—wisdom wrapped in grace and elegance.',
          imageUrl: '/images/lobby/imgNpc_10019.png',
          jumpTo: '10019',
          tags: ['UnfilteredStoryteller', 'GenuineConnector']
        },
        {
          npcId: 10020,
          name: 'Nova',
          job: 'Farmer',
          description: 'Earth in her hands—quiet strength beneath sun-warmed simplicity.',
          imageUrl: '/images/lobby/imgNpc_10020.png',
          jumpTo: '10020',
          tags: ['NatureWhisperer', 'QuietSupport']
        },
        {
          npcId: 10021,
          name: 'Ryan',
          job: 'Athlete',
          description: 'Golden boy on court—searching hard for his real self.',
          imageUrl: '/images/lobby/imgNpc_10021.png',
          jumpTo: '10021',
          tags: ['TrainingMotivator', 'ResilientSpirit']
        }
      ]
    }
  },
  idol: {
    drama: {
      roomId: 3,
      title: 'Tariffs on Mars',
      description: 'Experience the glittering world of K-pop through the eyes of Min-ji, a talented trainee navigating fame, friendship, and first love in the competitive entertainment industry.',
      coverImageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      coverVideoUrl: '/videos/idol-preview.mp4',
      jumpTo: '3',
      characters: [
        {
          npcId: 10012,
          name: 'Trump',
          job: 'President',
          description: 'A passionate dancer with dreams of debuting in a top idol group while dealing with intense competition.',
          imageUrl: '/images/lobby/imgNpc_10012.png',
          jumpTo: '10012',
          tags: ['UnfilteredStoryteller', 'GenuineConnector']
        },
        {
          npcId: 10009,
          name: 'Elon Musk',
          job: 'Entrepreneur',
          description: 'The company\'s star trainee known for his angelic voice and kind personality who takes an interest in Min-ji.',
          imageUrl: '/images/lobby/imgNpc_10009.png',
          jumpTo: '10009',
          tags: ['Talent', 'Kindness']
        },
        {
          npcId: 10006,
          name: 'Satoshi',
          job: 'Revolutionist',
          description: 'A revolutionary who is determined to change the world.',
          imageUrl: '/images/lobby/imgNpc_10006.png',
          jumpTo: '10006',
          tags: ['Revolutionary', 'Ambitious']
        },
        {
          npcId: 10022,
          name: 'Sam Altman',
          job: 'Researcher',
          description: 'A young musical genius producer who sees Min-ji\'s potential beyond the typical idol image.',
          imageUrl: '/images/lobby/imgNpc_10022.png',
          jumpTo: '10022',
          tags: ['Creative', 'Visionary']
        }
      ]
    }
  }
};
