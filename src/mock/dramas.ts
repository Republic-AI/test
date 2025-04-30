import { Drama, TabContent } from '../types/drama';

// Mock data for development
export const MOCK_DRAMAS: Record<string, TabContent> = {
  ranch: {
    drama: {
      id: 'ranch-love',
      title: 'Ranch Love Story',
      description: 'A heartwarming tale of love and friendship on a beautiful countryside ranch. Follow Lily and Mark as they navigate life, love, and the challenges of ranch living.',
      coverImageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      coverVideoUrl: '/videos/ranch-preview.mp4',
      jumpTo: '4',
      characters: [
        {
          id: 'lily',
          name: 'Lily Chen',
          job: 'Ranch Owner',
          description: 'Inherited her grandfather\'s ranch and is determined to make it successful while dealing with her feelings for childhood friend Mark.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: '10016',
          tags: ['Determined', 'Passionate']
        },
        {
          id: 'mark',
          name: 'Mark Taylor',
          job: 'Ranch Hand',
          description: 'A skilled cowboy with a mysterious past who returned to help his childhood friend Lily manage the ranch.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: '10017',
          tags: ['Mysterious', 'Skilled']
        },
        {
          id: 'emma',
          name: 'Emma Johnson',
          job: 'Veterinarian',
          description: 'The local vet who visits the ranch regularly and has hidden feelings for one of the ranch hands.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: '10018',
          tags: ['Caring', 'Professional']
        },
        {
          id: 'jake',
          name: 'Jake Williams',
          job: 'Neighboring Rancher',
          description: 'Owner of the competing ranch who has his eyes set on both Lily\'s land and her heart.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: '10020',
          tags: ['Ambitious', 'Competitive']
        },
        {
          id: 'sophie',
          name: 'Sophie Lin',
          job: 'Chef',
          description: 'The ranch\'s talented chef whose cuisine brings everyone together at the end of each day.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: '10021',
          tags: ['Creative', 'Nurturing']
        }
      ]
    }
  },
  idol: {
    drama: {
      id: 'urban-idol',
      title: 'Urban Idol Life',
      description: 'Experience the glittering world of K-pop through the eyes of Min-ji, a talented trainee navigating fame, friendship, and first love in the competitive entertainment industry.',
      coverImageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
      coverVideoUrl: '/videos/idol-preview.mp4',
      jumpTo: '3',
      characters: [
        {
          id: 'minji',
          name: 'Min-ji Park',
          job: 'Trainee Idol',
          description: 'A passionate dancer with dreams of debuting in a top idol group while dealing with intense competition.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: '10022',
          tags: ['UnfilteredStoryteller', 'GenuineConnector']
        },
        {
          id: 'jiwoo',
          name: 'Ji-woo Kim',
          job: 'Lead Vocalist',
          description: 'The company\'s star trainee known for his angelic voice and kind personality who takes an interest in Min-ji.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: '10023',
          tags: ['Talent', 'Kindness']
        },
        {
          id: 'hyunjin',
          name: 'Hyun-jin Lee',
          job: 'Rival Trainee',
          description: 'Min-ji\'s biggest competition who will do anything to secure her spot in the debut group.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: '10024',
          tags: ['Competitive', 'Ambitious']
        },
        {
          id: 'seojoon',
          name: 'Seo-joon Kang',
          job: 'Producer',
          description: 'A young musical genius producer who sees Min-ji\'s potential beyond the typical idol image.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: '10025',
          tags: ['Creative', 'Visionary']
        }
      ]
    }
  }
};
