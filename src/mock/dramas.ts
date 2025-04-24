
import { Drama, TabContent } from '../types/drama';

// Mock data for development
export const MOCK_DRAMAS: Record<string, TabContent> = {
  ranch: {
    drama: {
      id: 'ranch-love',
      title: 'Ranch Love Story',
      description: 'A heartwarming tale of love and friendship on a beautiful countryside ranch. Follow Lily and Mark as they navigate life, love, and the challenges of ranch living.',
      coverImageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      jumpTo: 'ranch_main_scene',
      characters: [
        {
          id: 'lily',
          name: 'Lily Chen',
          job: 'Ranch Owner',
          description: 'Inherited her grandfather\'s ranch and is determined to make it successful while dealing with her feelings for childhood friend Mark.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'lily_scene'
        },
        {
          id: 'mark',
          name: 'Mark Taylor',
          job: 'Ranch Hand',
          description: 'A skilled cowboy with a mysterious past who returned to help his childhood friend Lily manage the ranch.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: 'mark_scene'
        },
        {
          id: 'emma',
          name: 'Emma Johnson',
          job: 'Veterinarian',
          description: 'The local vet who visits the ranch regularly and has hidden feelings for one of the ranch hands.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'emma_scene'
        },
        {
          id: 'jake',
          name: 'Jake Williams',
          job: 'Neighboring Rancher',
          description: 'Owner of the competing ranch who has his eyes set on both Lily\'s land and her heart.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: 'jake_scene'
        },
        {
          id: 'sophie',
          name: 'Sophie Lin',
          job: 'Chef',
          description: 'The ranch\'s talented chef whose cuisine brings everyone together at the end of each day.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'sophie_scene'
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
      jumpTo: 'idol_main_scene',
      characters: [
        {
          id: 'minji',
          name: 'Min-ji Park',
          job: 'Trainee Idol',
          description: 'A passionate dancer with dreams of debuting in a top idol group while dealing with intense competition.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'minji_scene'
        },
        {
          id: 'jiwoo',
          name: 'Ji-woo Kim',
          job: 'Lead Vocalist',
          description: 'The company\'s star trainee known for his angelic voice and kind personality who takes an interest in Min-ji.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: 'jiwoo_scene'
        },
        {
          id: 'hyunjin',
          name: 'Hyun-jin Lee',
          job: 'Rival Trainee',
          description: 'Min-ji\'s biggest competition who will do anything to secure her spot in the debut group.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'hyunjin_scene'
        },
        {
          id: 'seojoon',
          name: 'Seo-joon Kang',
          job: 'Producer',
          description: 'A young musical genius producer who sees Min-ji\'s potential beyond the typical idol image.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: 'seojoon_scene'
        }
      ]
    }
  },
  fantasy: {
    drama: {
      id: 'fantasy-adventure',
      title: 'Fantasy Adventure',
      description: 'Journey to the mystical realm of Eldoria where magic flows freely and dangerous creatures lurk. Follow Aria as she discovers her hidden powers and her destiny to save the realm.',
      coverImageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      jumpTo: 'fantasy_main_scene',
      characters: [
        {
          id: 'aria',
          name: 'Aria Nightshade',
          job: 'Apprentice Mage',
          description: 'A young woman with mysterious magical abilities who discovers she may be the key to saving the realm.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'aria_scene'
        },
        {
          id: 'thorne',
          name: 'Thorne Wolfsbane',
          job: 'Forest Guardian',
          description: 'A solitary guardian with the ability to communicate with animals who reluctantly joins Aria\'s quest.',
          imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          jumpTo: 'thorne_scene'
        },
        {
          id: 'lyra',
          name: 'Lyra Moonsong',
          job: 'Elven Princess',
          description: 'The elegant princess of the elven kingdom with hidden strength and wisdom beyond her years.',
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          jumpTo: 'lyra_scene'
        }
      ]
    }
  }
};
