import React, { useState, useRef } from 'react';
import { AIPost, TweetComment } from '@/types/drama';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { MessageSquare, Heart, ChevronDown, ChevronUp, Share2, Send, Maximize, Volume2, Play, AlertTriangle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SceneThreadFeedProps {
  posts: AIPost[];
  className?: string;
  isSignedIn?: boolean;
  onVote?: (npcId: number, optionIndex: number) => void;
  onLike?: (npcId: number) => void;
  onComment?: (npcId: number, comment: string) => void;
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
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});
  const [chosenOptions, setChosenOptions] = useState<Record<number, number>>({});
  const [localLikes, setLocalLikes] = useState<Record<number, boolean>>({});
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({});
  const [videoLoading, setVideoLoading] = useState<Record<number, boolean>>({});
  const [videoErrors, setVideoErrors] = useState<Record<number, string>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

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
      [post.npcId]: optionIndex
    }));

    onVote?.(post.npcId, optionIndex);
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
      [post.npcId]: !post.like
    }));

    onLike?.(post.npcId);
  };

  const toggleExpand = (npcId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [npcId]: !prev[npcId]
    }));
  };

  const handleCommentChange = (npcId: number, value: string) => {
    setNewComment(prev => ({
      ...prev,
      [npcId]: value
    }));
  };

  const handleCommentSubmit = (npcId: number) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to comment"
      });
      return;
    }

    if (!newComment[npcId]?.trim()) return;

    onComment?.(npcId, newComment[npcId]);

    setNewComment(prev => ({
      ...prev,
      [npcId]: ""
    }));
  };

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
  };

  const isPostLiked = (post: AIPost) => {
    return localLikes[post.npcId] !== undefined ? localLikes[post.npcId] : post.like;
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

  const toggleVideoPlayback = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const videoElement = videoRefs.current[postId];
    
    if (!videoElement) return;
    
    if (videoElement.paused) {
      videoElement.play().then(() => {
        setPlayingVideos(prev => ({ ...prev, [postId]: true }));
      }).catch(error => {
        console.error("Error playing video:", error);
        toast({
          title: "Video playback error",
          description: "Could not play the video"
        });
      });
    } else {
      videoElement.pause();
      setPlayingVideos(prev => ({ ...prev, [postId]: false }));
    }
  };

  const toggleFullscreen = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const videoElement = videoRefs.current[postId];
    
    if (!videoElement) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error("Error exiting fullscreen:", err);
      });
    } else {
      videoElement.requestFullscreen().catch(err => {
        console.error("Error requesting fullscreen:", err);
        toast({
          title: "Fullscreen error",
          description: "Could not enter fullscreen mode"
        });
      });
    }
  };

  const handleVideoError = (postId: number, e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Video error:", e);
    setVideoErrors(prev => ({ 
      ...prev, 
      [postId]: "Failed to load video" 
    }));
    setVideoLoading(prev => ({ ...prev, [postId]: false }));
  };

  const handleVideoLoadStart = (postId: number) => {
    setVideoLoading(prev => ({ ...prev, [postId]: true }));
    setVideoErrors(prev => ({ ...prev, [postId]: "" }));
  };

  const handleVideoLoadedData = (postId: number) => {
    setVideoLoading(prev => ({ ...prev, [postId]: false }));
  };

  const retryVideoLoad = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const videoElement = videoRefs.current[postId];
    if (!videoElement) return;
    
    setVideoErrors(prev => ({ ...prev, [postId]: "" }));
    setVideoLoading(prev => ({ ...prev, [postId]: true }));
    
    // Force reload the video
    videoElement.load();
  };

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <div className="space-y-2 flex-1 pr-2">
        {posts.map((post) => (
          <div key={`${post.npcId}-${post.createTime}`} className="bg-white rounded-2xl py-2 px-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm">
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

            {post.videoUrl && (
              <div className="mt-3 rounded-xl overflow-hidden relative group">
                <video
                  ref={el => { videoRefs.current[post.npcId] = el; }}
                  src={post.videoUrl}
                  className="w-full h-auto object-cover"
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  playsInline
                  poster={post.imgUrl || undefined}
                  onClick={(e) => e.stopPropagation()}
                  onPlay={() => setPlayingVideos(prev => ({ ...prev, [post.npcId]: true }))}
                  onPause={() => setPlayingVideos(prev => ({ ...prev, [post.npcId]: false }))}
                  onEnded={() => setPlayingVideos(prev => ({ ...prev, [post.npcId]: false }))}
                  onError={e => handleVideoError(post.npcId, e)}
                  onLoadStart={() => handleVideoLoadStart(post.npcId)}
                  onLoadedData={() => handleVideoLoadedData(post.npcId)}
                >
                  <source src={post.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {videoLoading[post.npcId] && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <Loader2 size={32} className="text-white animate-spin" />
                      <span className="text-white text-sm mt-2">Loading video...</span>
                    </div>
                  </div>
                )}
                
                {videoErrors[post.npcId] && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="flex flex-col items-center text-center p-4">
                      <AlertTriangle size={32} className="text-red-500 mb-2" />
                      <span className="text-white text-sm mb-3">{videoErrors[post.npcId]}</span>
                      <button 
                        className="px-4 py-2 bg-white text-black text-sm rounded-md hover:bg-gray-100" 
                        onClick={(e) => retryVideoLoad(post.npcId, e)}
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}
                
                {!playingVideos[post.npcId] && !videoLoading[post.npcId] && !videoErrors[post.npcId] && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer"
                    onClick={(e) => toggleVideoPlayback(post.npcId, e)}
                  >
                    <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                      <Play size={28} className="text-gray-800 ml-1" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 right-0 p-2">
                  <button
                    className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white"
                    onClick={(e) => toggleFullscreen(post.npcId, e)}
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            )}
            
            {(post.tweetType === 2) && post.chooseList && post.chooseList.length > 0 && (
              <div className="mt-4">
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-gray-700 mb-[-6px]">Voting (single choice)</h3>
                  {post.choose || chosenOptions[post.npcId] !== undefined
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

            <div className="flex items-center justify-between mt-2">
              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                onClick={() => toggleExpand(post.npcId)}
              >
                <MessageSquare size={20} />
                <span className="text-sm">{post.commentCount}</span>
              </button>
              
              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                onClick={() => handleLike(post)}
              >
                <Heart size={20} className={isPostLiked(post) ? "fill-red-500 text-red-500" : ""} />
                <span className="text-sm">{post.likeCount}</span>
              </button>

              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 ml-auto"
                onClick={() => toggleExpand(post.npcId)}
              >
                {expandedPosts[post.npcId] ? (
                  <>
                    <ChevronUp size={20} />
                    <span className="text-sm">Collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} />
                    <span className="text-sm">Expand</span>
                  </>
                )}
              </button>
            </div>

            {expandedPosts[post.npcId] && (
              <div className="mt-4 space-y-4">
                {isSignedIn && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newComment[post.npcId] || ""}
                      onChange={(e) => handleCommentChange(post.npcId, e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.npcId)}
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
