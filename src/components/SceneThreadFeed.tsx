import React, { useState } from 'react';
import { AIPost, TweetComment } from '@/types/drama';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { MessageSquare, Heart, ChevronDown, ChevronUp, Share2, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SceneThreadFeedProps {
  posts: AIPost[];
  className?: string;
  isSignedIn?: boolean;
  onVote?: (threadId: string | number, optionIndex: number) => void;
  onLike?: (threadId: string | number) => void;
  onComment?: (threadId: string | number, comment: string) => void;
}

// 进度条颜色列表
const BAR_COLORS = [
  'bg-red-300',    // 0
  'bg-blue-200',   // 1
  'bg-yellow-300', // 2
  'bg-green-300',  // 3
  'bg-purple-300', // 4
  'bg-pink-300',   // 5
];

const SceneThreadFeed: React.FC<SceneThreadFeedProps> = ({
  posts,
  className,
  isSignedIn = false,
  onVote,
  onLike,
  onComment
}) => {
  const [expandedPosts, setExpandedPosts] = useState<Record<string | number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<string | number, string>>({});
  const [chosenOptions, setChosenOptions] = useState<Record<string | number, number>>({});
  const [localLikes, setLocalLikes] = useState<Record<string | number, boolean>>({});

  const handleVote = (post: AIPost, optionIndex: number) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to vote"
      });
      return;
    }

    if (post.choose) {
      toast({
        title: "Already voted",
        description: "You have already voted on this thread"
      });
      return;
    }

    setChosenOptions(prev => ({
      ...prev,
      [String(post.id)]: optionIndex
    }));

    onVote?.(post.id, optionIndex);
  };

  const handleLike = (post: AIPost) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to like posts"
      });
      return;
    }

    setLocalLikes(prev => ({
      ...prev,
      [String(post.id)]: !post.like
    }));

    onLike?.(post.id);
  };

  const toggleExpand = (threadId: string | number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [String(threadId)]: !prev[String(threadId)]
    }));
  };

  const handleCommentChange = (threadId: string | number, value: string) => {
    setNewComment(prev => ({
      ...prev,
      [String(threadId)]: value
    }));
  };

  const handleCommentSubmit = (threadId: string | number) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to comment"
      });
      return;
    }

    if (!newComment[String(threadId)]?.trim()) return;

    onComment?.(threadId, newComment[String(threadId)]);

    setNewComment(prev => ({
      ...prev,
      [String(threadId)]: ""
    }));
  };

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  };

  const isPostLiked = (post: AIPost) => {
    return localLikes[String(post.id)] !== undefined ? localLikes[String(post.id)] : post.like;
  };

  const parseOptionText = (optionText: string) => {
    // 解析选项格式 "A: 选项内容"
    const match = optionText.match(/^([A-Z]):\s*(.+)$/);
    if (match) {
      return {
        letter: match[1],
        content: match[2]
      };
    }
    return {
      letter: "",
      content: optionText
    };
  };

  const renderComment = (comment: TweetComment, level = 0) => (
    <div key={comment.id} className={`flex items-start space-x-3 mb-2 ${level > 0 ? 'ml-8' : ''}`}>
      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 mt-2">
        {comment.authorAvatar && (
          <img
            src={comment.authorAvatar}
            alt={`${comment.nickName} avatar`}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-[-5px]">
          <span className="font-medium text-sm">{comment.nickName}</span>
          {comment.createTime && (
            <span className="text-xs text-gray-500">{formatTime(comment.createTime)}</span>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-0">{comment.content}</p>
        
        {/* 嵌套评论 - 支持两种字段名 */}
        {(comment.tweetCommentVoList || comment.tweetCommentVo) && (
          <div className="mt-2 space-y-2">
            {(comment.tweetCommentVoList || comment.tweetCommentVo || []).map(reply => 
              renderComment(reply, level + 1)
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="space-y-2 overflow-y-auto flex-1 pr-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl py-2 px-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mt-3">
                {post.npcAvatar && (
                <img
                    src={post.npcAvatar}
                    alt={`${post.npcName || 'NPC'} avatar`}
                  className="h-full w-full object-cover"
                />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-[#4A95E7] text-base capitalize">
                    {post.npcName || `NPC-${post.npcId}`}
                  </span>
                  <span className="text-gray-400 text-sm">{formatTime(post.createTime)}</span>
                </div>
                <p className="text-gray-600 text-sm mt-0.3 line-clamp-2 leading-[0.8]">
                  {post.content}
                </p>
              </div>
            </div>
            
            {post.imgUrl && (
              <div className="mt-3 rounded-xl overflow-hidden">
                <img
                  src={post.imgUrl}
                  alt="Post image"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            )}
            
            {(post.tweetType === 'VOTE' || post.tweetType === 2) && post.chooseList && post.chooseList.length > 0 && (
              <div className="mt-4">
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-gray-700 mb-[-6px]">Voting (single choice)</h3>
                  {post.choose || chosenOptions[String(post.id)] !== undefined
                    ? post.chooseList.map((option, index) => {
                        const rate = post.rateList?.[index] || 0;
                        const { letter, content } = parseOptionText(option);
                        
                        return (
                          <div
                            key={`option-${index}`}
                            className="w-full border border-gray-300 rounded-xl overflow-hidden flex items-center h-10 bg-white"
                          >
                            <div
                              className={`h-full ${BAR_COLORS[index % BAR_COLORS.length]} flex items-center pl-3 transition-all duration-300`}
                              style={{ 
                                width: `${rate}%`, 
                                minWidth: rate > 0 ? '2.5rem' : 0 
                              }}
                            >
                              <span className="font-bold text-gray-700 text-sm select-none">
                                {Math.round(rate)}%
                              </span>
                            </div>
                            
                            {/* 空白部分填充，同时显示选项内容 */}
                            <div className="flex-1 h-full flex items-center px-3">
                              {letter && <span className="font-bold mr-2">{letter}:</span>}
                              <span>{content}</span>
                            </div>
                          </div>
                        );
                      })
                    : post.chooseList.map((option, index) => {
                        const { letter, content } = parseOptionText(option);
                        
                        return (
                    <button
                            key={`option-${index}`}
                            onClick={() => handleVote(post, index)}
                      className={cn(
                              "w-full h-10 px-4 text-sm rounded-xl border border-gray-300 bg-white transition-all text-left flex items-center mb-1 hover:bg-gray-50",
                              "text-gray-700"
                      )}
                    >
                            {letter && <span className="font-bold mr-2">{letter}:</span>}
                            <span>{content}</span>
                    </button>
                        );
                      })}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100">
              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                onClick={() => toggleExpand(post.id)}
              >
                <MessageSquare size={20} />
                <span className="text-sm">{post.commentCount}</span>
              </button>
              
              <button 
                className={cn(
                  "flex items-center space-x-1",
                  isPostLiked(post) ? "text-red-500" : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => handleLike(post)}
              >
                <Heart size={20} />
                <span className="text-sm">{post.likeCount}</span>
              </button>

              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 ml-auto"
                onClick={() => toggleExpand(post.id)}
              >
                {expandedPosts[String(post.id)] ? (
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

            {expandedPosts[String(post.id)] && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                {isSignedIn && (
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="text"
                      value={newComment[String(post.id)] || ""}
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

                {/* 评论部分 */}
                {post.tweetCommentVoList.map(comment => renderComment(comment))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceneThreadFeed;
