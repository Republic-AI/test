
import React, { useState } from 'react';
import { AIPost } from '@/types/drama';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface SceneThreadFeedProps {
  posts: AIPost[];
  className?: string;
}

const SceneThreadFeed: React.FC<SceneThreadFeedProps> = ({
  posts,
  className
}) => {
  const [votedPosts, setVotedPosts] = useState<Record<number, string>>({});

  const handleVote = (postIndex: number, option: string) => {
    setVotedPosts(prev => ({
      ...prev,
      [postIndex]: option
    }));
    
    toast({
      title: "Vote recorded",
      description: `You voted: ${option}`
    });
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <h2 className="font-serif text-xl font-semibold mb-4">Character Posts</h2>
      
      <div className="space-y-6 overflow-y-auto flex-1 pr-2">
        {posts.map((post, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            {/* Author info */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={post.avatar}
                  alt={`${post.author} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-xs text-muted-foreground">{post.timestamp}</div>
              </div>
            </div>
            
            {/* Post content */}
            <p className="mb-3">{post.content}</p>
            
            {/* Optional image */}
            {post.image && (
              <div className="mb-3 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt="Post attachment"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            {/* Vote options */}
            {post.vote && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {post.vote.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleVote(index, option)}
                      disabled={votedPosts[index] !== undefined}
                      className={cn(
                        "px-4 py-2 text-sm rounded-full transition-all",
                        votedPosts[index] === option
                          ? "bg-primary text-primary-foreground"
                          : votedPosts[index] !== undefined
                          ? "bg-gray-100 dark:bg-gray-700 text-muted-foreground"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneThreadFeed;
