import React, { useState } from 'react';
import { AIPost } from '@/types/drama';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { MessageSquare, Heart, ChevronDown, ChevronUp, Share2, Send } from 'lucide-react';

interface SceneThreadFeedProps {
  posts: AIPost[];
  className?: string;
  isSignedIn?: boolean;
  onVote?: (threadId: string, isUpvote: boolean) => void;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const SceneThreadFeed: React.FC<SceneThreadFeedProps> = ({
  posts,
  className,
  isSignedIn = false,
  onVote
}) => {
  const [votedPosts, setVotedPosts] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const [replyCount, setReplyCount] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  const handleVote = (threadId: string, option: string) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to vote"
      });
      return;
    }

    if (votedPosts[threadId]) {
      toast({
        title: "Already voted",
        description: "You have already voted on this thread"
      });
      return;
    }

    setVotedPosts(prev => ({
      ...prev,
      [threadId]: option
    }));

    onVote?.(threadId, option === "upvote");
  };

  const handleLike = (threadId: string) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to like posts"
      });
      return;
    }
    const isLiked = likedPosts[threadId];
    setLikedPosts(prev => ({
      ...prev,
      [threadId]: !isLiked
    }));
    setLikeCounts(prev => ({
      ...prev,
      [threadId]: (prev[threadId] || 0) + (isLiked ? -1 : 1)
    }));
  };

  const toggleExpand = (threadId: string) => {
    setExpandedPosts(prev => ({
      ...prev,
      [threadId]: !prev[threadId]
    }));
  };

  const handleCommentChange = (threadId: string, value: string) => {
    setNewComment(prev => ({
      ...prev,
      [threadId]: value
    }));
  };

  const handleCommentSubmit = (threadId: string) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to comment"
      });
      return;
    }

    if (!newComment[threadId]?.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User", // This would come from user context
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // This would come from user context
      content: newComment[threadId],
      timestamp: "Just now"
    };

    setComments(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), comment]
    }));

    setNewComment(prev => ({
      ...prev,
      [threadId]: ""
    }));

    setReplyCount(prev => ({
      ...prev,
      [threadId]: (prev[threadId] || 0) + 1
    }));
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="space-y-2 overflow-y-auto flex-1 pr-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl py-2 px-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mt-3">
                <img
                  src={post.avatar}
                  alt={`${post.author} avatar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-[#4A95E7] text-base capitalize">{post.author}</span>
                  <span className="text-gray-400 text-sm">{post.timestamp}</span>
                </div>
                <p className="text-gray-600 text-sm mt-0.3 line-clamp-2 leading-[0.8]">
                  {post.content}
                </p>
              </div>
            </div>
            
            {post.image && (
              <div className="mt-3 rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            {post.vote && (
              <div className="mt-4">
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-gray-700 mb-[-6px]">Voting (single choice)</h3>
                  {post.vote.options.map((option, index) => (
                    <button
                      key={`${option}-${index}`}
                      onClick={() => handleVote(post.id, option)}
                      disabled={!!votedPosts[post.id]}
                      className={cn(
                        "w-full h-8 px-4 text-sm rounded-lg transition-all text-left bg-gray-200 leading-[0.8] flex items-center",
                        votedPosts[post.id] && votedPosts[post.id] === option
                          ? "bg-gray-300 text-gray-900 font-medium"
                          : "hover:bg-gray-300 text-gray-700"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100">
              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                onClick={() => toggleExpand(post.id)}
              >
                <MessageSquare size={20} />
                <span className="text-sm">{replyCount[post.id] || 0}</span>
              </button>
              
              <button 
                className={cn(
                  "flex items-center space-x-1",
                  likedPosts[post.id] ? "text-red-500" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={20} />
                <span className="text-sm">{likeCounts[post.id] || 0}</span>
              </button>

              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 ml-auto"
                onClick={() => toggleExpand(post.id)}
              >
                {expandedPosts[post.id] ? (
                  <>
                    <span className="text-sm">Fold</span>
                    <ChevronUp size={20} />
                  </>
                ) : (
                  <>
                    <span className="text-sm">Expand</span>
                    <ChevronDown size={20} />
                  </>
                )}
              </button>
            </div>

            {expandedPosts[post.id] && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                {isSignedIn && (
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      value={newComment[post.id] || ""}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                )}

                {comments[post.id]?.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3 mb-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mt-2">
                      <img
                        src={comment.avatar}
                        alt={`${comment.author} avatar`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-[-5px]">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-0">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneThreadFeed;
