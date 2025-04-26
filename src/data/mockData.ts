import { SceneData } from '../types/drama';

export const mockScene: SceneData = {
  id: "scene-1",
  title: "The Beginning",
  description: "The story begins in a mysterious forest...",
  characters: [
    {
      id: "char-1",
      name: "Luna",
      description: "A mysterious wanderer with magical abilities",
      imageUrl: "https://picsum.photos/200/300"
    },
    {
      id: "char-2",
      name: "Raven",
      description: "A skilled warrior with a dark past",
      imageUrl: "https://picsum.photos/200/301"
    }
  ],
  aiPosts: [
    {
      id: "post-1",
      content: "Luna steps into the clearing, her silver hair gleaming in the moonlight. She senses something unusual in the air.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      votes: 5
    },
    {
      id: "post-2",
      content: "A shadow moves between the trees. Raven emerges, his hand resting on the hilt of his sword.",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      votes: 3
    }
  ],
  voteHistory: [
    {
      postId: "post-1",
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      vote: 1
    },
    {
      postId: "post-2",
      timestamp: new Date(Date.now() - 1500000).toISOString(),
      vote: 1
    }
  ]
}; 