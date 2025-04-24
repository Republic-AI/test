
import { AIPost, CharacterHistory, VoteHistory } from "@/types/drama";

export const MOCK_SCENE_CHARACTER_HISTORY: Record<string, CharacterHistory[]> = {
  "scene_A1": [
    {
      characterId: "lily",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      preview: "I've been thinking about the ranch's future...",
      jumpToSceneId: "lily_scene"
    },
    {
      characterId: "mark",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      preview: "The sunset over the hills reminds me of our childhood.",
      jumpToSceneId: "mark_scene"
    },
    {
      characterId: "emma",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      preview: "Just checked on the horses. All healthy!",
      jumpToSceneId: "emma_scene"
    }
  ],
  "minji_scene": [
    {
      characterId: "minji",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      preview: "The practice room is so quiet this late at night...",
      jumpToSceneId: "minji_scene"
    },
    {
      characterId: "jiwoo",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      preview: "You did well today. Your dance is improving.",
      jumpToSceneId: "jiwoo_scene"
    }
  ]
};

export const MOCK_SCENE_THREAD: Record<string, AIPost[]> = {
  "scene_A1": [
    {
      author: "Lily",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      content: "The ranch needs renovation. Should we invest our savings?",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      vote: {
        type: "single",
        options: ["Yes, renovate now", "Wait for better timing"]
      },
      timestamp: "5 min ago"
    },
    {
      author: "Mark",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      content: "I found some old photos of us when we were kids. Remember this day?",
      image: "https://images.unsplash.com/photo-1516203294340-5ba5f612dc6a",
      timestamp: "15 min ago"
    },
    {
      author: "Emma",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      content: "There's a storm coming. Should we move the horses to the stable?",
      vote: {
        type: "single",
        options: ["Yes, safety first", "No, they'll be fine"]
      },
      timestamp: "32 min ago"
    }
  ],
  "minji_scene": [
    {
      author: "Min-ji",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      content: "The company wants me to change my style for the debut. What should I do?",
      vote: {
        type: "single",
        options: ["Follow their direction", "Stay true to myself"]
      },
      timestamp: "10 min ago"
    }
  ]
};

export const MOCK_VOTE_HISTORY: Record<string, VoteHistory[]> = {
  "scene_A1": [
    {
      question: "Should the ranch expand to tourism?",
      options: ["Yes", "No"],
      userChoice: "Yes"
    },
    {
      question: "Help Mark fix the fence or help Emma with the horses?",
      options: ["Help Mark", "Help Emma"],
      userChoice: "Help Mark"
    },
    {
      question: "Confront the neighboring rancher about water rights?",
      options: ["Confront directly", "Seek legal advice", "Compromise"],
      userChoice: "Seek legal advice"
    }
  ],
  "minji_scene": [
    {
      question: "Accept the collaboration with the popular boy group?",
      options: ["Yes", "No"],
      userChoice: "Yes"
    },
    {
      question: "Stay late to practice or rest for tomorrow?",
      options: ["Practice more", "Get rest"],
      userChoice: "Practice more"
    }
  ]
};
