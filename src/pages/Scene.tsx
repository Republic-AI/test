import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CocosEmbed, { useCocos } from '@/components/CocosEmbed';
import SceneThreadFeed from '@/components/SceneThreadFeed';
import VoteHistoryPanel from '@/components/VoteHistoryPanel';
import { CharacterHistory, AIPost, VoteHistory, ChatMessage } from '@/types/drama';
// 导入NPC相关函数
import { getNpcName } from '@/config/npc';
// 推文模块
  // 拉取推文
  // 推文操作 
  // 投票拉取历史记录
  
// 删除Mock数据导入
// import { MOCK_SCENE_CHARACTER_HISTORY, MOCK_SCENE_THREAD, MOCK_VOTE_HISTORY } from '@/mock/scene-data';

import { toast } from '@/components/ui/use-toast';
import CharacterHistorySidebar from '@/components/CharacterHistorySidebar';
import { websocketService } from '@/services/websocket';
import { Commands } from '@/services/websocket';

interface UserInfo {
  userId: string;
  id: string;
  location: string;
  avatar: string;
  points: number;
}

const Scene: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sceneId = searchParams.get('sceneId') || 'MainMenu';
  
  // 映射场景ID到实际使用的数据
  const getEffectiveSceneId = (id: string) => {
    // 根据 NPC ID 映射到对应的场景
    const npcId = parseInt(id);
    
    // 牧场场景 (roomId: 4)
    if ([10016, 10017, 10018, 10019, 10020, 10021].includes(npcId)) {
      return '4';
    }
    
    // 偶像场景 (roomId: 3)
    if ([10012, 10009, 10006, 10022].includes(npcId)) {
      return '3';
    }
    
    // 默认返回原始ID
    return id;
  };

  const effectiveSceneId = getEffectiveSceneId(sceneId);
  const [lastSceneId, setLastSceneId] = useState<string>(effectiveSceneId);

  // 当场景ID变化时，强制重新加载数据
  useEffect(() => {
    if (sceneId !== lastSceneId) {
      setLastSceneId(sceneId);
      // 不需要显式调用fetchSceneData()，因为effectiveSceneId的变化会触发主要useEffect
      console.log('Scene ID changed:', { from: lastSceneId, to: sceneId });
    }
  }, [sceneId, lastSceneId]);

  // 添加新的函数来获取游戏场景ID
  const getGameSceneId = (id: string) => {
    const npcId = parseInt(id);
    
    // 牧场场景的NPC
    if ([10016, 10017, 10018, 10019, 10020, 10021].includes(npcId)) {
      return '4';
    }
    
    // 偶像场景的NPC
    if ([10012, 10009, 10006, 10022].includes(npcId)) {
      return '3';
    }
    
    return id;
  };

  const gameSceneId = getGameSceneId(sceneId);

  const [characterHistory, setCharacterHistory] = useState<CharacterHistory[]>([]);
  const [aiPosts, setAiPosts] = useState<AIPost[]>([]);
  const [voteHistory, setVoteHistory] = useState<VoteHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [postsLoading, setPostsLoading] = useState<boolean>(true);
  const [votesLoading, setVotesLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { sendMessageToGame, navigateToScene } = useCocos();
  const [isUserInfoFolded, setIsUserInfoFolded] = useState(false);
  const [npcSwitchLoading, setNpcSwitchLoading] = useState(false); // 添加NPC切换加载状态

  // Check login status on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const storedLoginStatus = localStorage.getItem('isSignedIn');
    
    if (storedUserInfo && storedLoginStatus) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsSignedIn(true);
    }
  }, []);

  // 处理事件处理器和事件依赖项
  const handleSceneFeed = React.useCallback((data: any) => {
    if (data && data.tweetVoList) {
      console.log('Received scene feed data:', {
        roomId: data.roomId,
        currentSceneId: searchParams.get('sceneId'),
        effectiveSceneId: getEffectiveSceneId(searchParams.get('sceneId') || 'MainMenu'),
        tweetCount: data.tweetVoList.length,
        tweets: data.tweetVoList.map((tweet: any) => ({
          id: tweet.id,
          content: tweet.content.substring(0, 50) + '...',
          commentCount: tweet.commentCount,
          likeCount: tweet.likeCount,
          commentsLength: tweet.tweetCommentVoList?.length || 0
        }))
      });
      setAiPosts(data.tweetVoList);
      setPostsLoading(false); // 推文数据加载完成
      console.log('Updated aiPosts with', data.tweetVoList.length, 'tweets for roomId:', data.roomId);
    }
  }, []);
  
  const handleVoteHistory = React.useCallback((event: any) => {
    console.log('🗳️ handleVoteHistory called with event:', event);
    
    if (event && event.data && event.data.voteHistoryInfoList) {
      console.log('🗳️ Received vote history data:', {
        eventData: event.data,
        voteHistoryInfoList: event.data.voteHistoryInfoList,
        currentEffectiveSceneId: effectiveSceneId
      });
      
      // 转换投票历史数据格式
      const formattedVoteHistory = event.data.voteHistoryInfoList.map((vote: any, index: number) => {
        console.log(`🗳️ Processing vote ${index}:`, vote);
        
        // 根据场景确定选项格式
        let userChoice: string | undefined;
        let options: string[];
        
        if (effectiveSceneId === '3') {
          // 偶像场景：A、B、C三个选项
          options = ['A', 'B', 'C'];
          // 这里需要根据实际API响应来映射选项
          if (vote.myYesCount > 0) userChoice = 'A';
          else if (vote.myNoCount > 0) userChoice = 'B';
          // 如果有第三个选项的数据，可以在这里添加
        } else {
          // 牧场场景：YES、NO两个选项
          options = ['YES', 'NO'];
          if (vote.myYesCount > 0) userChoice = 'YES';
          else if (vote.myNoCount > 0) userChoice = 'NO';
        }
        
        return {
          roomId: effectiveSceneId, // 直接使用当前的effectiveSceneId
          requestId: vote.requestId || index,
          content: vote.content,
          hasVoted: vote.myYesCount > 0 || vote.myNoCount > 0,
          userChoice: userChoice,
          correctOption: "unknown", // 这个字段在API响应中没有提供
          options: options,
          timestamp: new Date().toISOString(),
          yesCount: vote.yesCount?.toString() || "0",
          noCount: vote.noCount?.toString() || "0",
          myYesCount: vote.myYesCount?.toString() || "0",
          myNoCount: vote.myNoCount?.toString() || "0"
        };
      });
      
      console.log('🗳️ Formatted vote history:', formattedVoteHistory);
      setVoteHistory(formattedVoteHistory);
      setVotesLoading(false); // 投票数据加载完成
      console.log('🗳️ Updated voteHistory state with', formattedVoteHistory.length, 'votes for roomId:', effectiveSceneId);
    } else {
      console.log('🗳️ No vote history data in event:', { 
        event, 
        hasData: !!event?.data, 
        hasVoteList: !!event?.data?.voteHistoryInfoList 
      });
    }
  }, [effectiveSceneId]);
  
  const handleCharacterHistory = React.useCallback((event: any) => {
    if (event && event.data && event.data.playerNpcChatDataMap) {
      console.log('Received character history data:', event.data);
      // 构建角色历史数据
      const characters: CharacterHistory[] = [];
      
      for (const npcId in event.data.playerNpcChatDataMap) {
        // 使用getNpcName获取NPC名称，为不同NPC提供合适的描述
        const id = parseInt(npcId);
        let description = ""; 
        
        // 针对不同NPC提供合适的描述
        if (id === 10016) description = "Left fame behind—now paints silence, sorrow, and secret dreams.";
        else if (id === 10017) description = "Bakes love daily—her smile's the town's unofficial sunshine.";
        else if (id === 10018) description = "Commands every room—cool mind, loyal heart, secrets under control.";
        else if (id === 10019) description = "Moves quietly, thinks sharply—wisdom wrapped in grace and elegance.";
        else if (id === 10020) description = "Earth in her hands—quiet strength beneath sun-warmed simplicity.";
        else if (id === 10021) description = "Golden boy on court—searching hard for his real self.";
        else if (id === 10012) description = "A passionate dancer with dreams of debuting in a top idol group.";
        else if (id === 10009) description = "The company's star trainee known for his angelic voice.";
        else if (id === 10006) description = "A revolutionary who is determined to change the world.";
        else if (id === 10022) description = "A young musical genius producer with extraordinary vision.";
        else description = `Character #${id}`;
        
        const character: CharacterHistory = {
          roomId: getEffectiveSceneId(searchParams.get('sceneId') || 'MainMenu'),
          npcId: id,
          name: getNpcName(id), // 使用getNpcName获取名称
          description: description,
          imageUrl: `/images/scene/headDir_${id}.png` // 修复图片路径
        };
        characters.push(character);
      }
      setCharacterHistory(characters);
      console.log('Updated characterHistory with', characters.length, 'characters');
    }
  }, []);

  // 处理推文操作响应（点赞、评论等）
  const handleOperateTweetResponse = React.useCallback((event: any) => {
    console.log('💬 Received OPERATE_TWEET response:', event);
    
    if (event && event.code === 0) {
      // 操作成功，记录响应数据
      const responseData = event.data;
      console.log('💬 Tweet operation successful:', {
        tweetId: responseData?.tweetId,
        type: responseData?.type,
        content: responseData?.content,
        replyId: responseData?.replyId,
        nickName: responseData?.nickName,
        commentId: responseData?.commentId,
        userNo: responseData?.userNo,
        chooseIndex: responseData?.chooseIndex,
        rateList: responseData?.rateList,
        timestamp: new Date().toISOString()
      });
      
      // 根据操作类型显示不同的成功消息
      let successMessage = "Operation successful";
      switch (responseData?.type) {
        case 1:
          successMessage = "Like successful";
          break;
        case 2:
          successMessage = `Comment successful${responseData?.commentId ? ` (Comment ID: ${responseData.commentId})` : ''}`;
          break;
        case 3:
          successMessage = "Vote successful";
          break;
      }
      
      toast({
        title: successMessage,
        description: `Operation completed, data is syncing...`
      });
      
      console.log('💬 Refreshing feed data...');
      
      // 延迟更长时间后刷新数据，确保服务器端数据已更新
      setTimeout(() => {
        console.log('💬 Sending GET_SCENE_FEED request to refresh data...');
        websocketService.send(Commands.GET_SCENE_FEED, { 
          roomId: Number(effectiveSceneId), 
          page: 0, 
          size: 99 
        });
      }, 1000); // 增加到1秒延迟
    } else {
      console.error('💬 Tweet operation failed:', {
        code: event?.code,
        message: event?.message,
        data: event?.data
      });
      toast({
        title: "Operation failed",
        description: event?.message || "Tweet operation failed, please try again",
        variant: "destructive"
      });
    }
  }, [effectiveSceneId]);

  // 初始化加载和设置WebSocket事件处理器
  useEffect(() => {
    console.log('Initial load with sceneId:', sceneId, 'effectiveSceneId:', effectiveSceneId);
    
    // 注册WebSocket事件处理器
    websocketService.subscribe(handleSceneFeed);
    websocketService.on(Commands.VOTE_THREAD, handleVoteHistory);
    websocketService.on(Commands.GET_CHARACTER_HISTORY, handleCharacterHistory);
    websocketService.on(Commands.OPERATE_TWEET, handleOperateTweetResponse); // 添加推文操作响应监听
    
    // 延迟加载数据，确保WebSocket连接有时间建立
    const timer = setTimeout(() => {
      // 加载场景数据
      setLoading(true);
      setPostsLoading(true); // 重置推文加载状态
      setVotesLoading(true); // 重置投票加载状态
      try {
        console.log(`开始获取场景数据，场景ID: ${effectiveSceneId}`);
        
        // 确保WebSocket连接已建立
        if (websocketService.isConnectionOpen()) {
          // 获取场景推文数据
          websocketService.send(Commands.GET_SCENE_FEED, { 
            roomId: Number(effectiveSceneId), 
            page: 0, 
            size: 99 
          });
          
          // 获取投票历史记录
          console.log('🗳️ Requesting vote history for roomId:', Number(effectiveSceneId));
          websocketService.getVoteHistory(Number(effectiveSceneId));
          
          // 获取角色历史
          websocketService.send(Commands.GET_CHARACTER_HISTORY, {
            roomId: Number(effectiveSceneId)
          });
          
          // 给WebSocket响应一些时间
          setTimeout(() => {
            setLoading(false);
            // 如果在超时后仍然没有数据，停止loading状态
            setTimeout(() => {
              setPostsLoading(false);
              setVotesLoading(false);
            }, 2000); // 额外2秒等待数据
          }, 1500);
        } else {
          console.warn("WebSocket连接尚未建立，等待连接...");
          // WebSocket未连接，延迟重试
          setTimeout(() => {
            if (websocketService.isConnectionOpen()) {
              websocketService.send(Commands.GET_SCENE_FEED, { 
                roomId: Number(effectiveSceneId), 
                page: 0, 
                size: 99 
              });
              websocketService.getVoteHistory(Number(effectiveSceneId));
              websocketService.send(Commands.GET_CHARACTER_HISTORY, {
                roomId: Number(effectiveSceneId)
              });
            } else {
              console.error("WebSocket连接失败");
            }
            setLoading(false);
            // 重置loading状态
            setPostsLoading(false);
            setVotesLoading(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching scene data:", error);
        toast({
          title: "Error loading scene data",
          description: "Could not load the scene data. Using default content.",
          variant: "destructive"
        });
        setLoading(false);
      }
    }, 1000); // 延迟1000ms确保WebSocket连接已建立
    
    return () => {
      // 清理事件处理器和定时器
      clearTimeout(timer);
      websocketService.unsubscribe(handleSceneFeed);
      websocketService.off(Commands.VOTE_THREAD, handleVoteHistory);
      websocketService.off(Commands.GET_CHARACTER_HISTORY, handleCharacterHistory);
      websocketService.off(Commands.OPERATE_TWEET, handleOperateTweetResponse); // 清理推文操作响应监听器
    };
  }, [effectiveSceneId, handleSceneFeed, handleVoteHistory, handleCharacterHistory, handleOperateTweetResponse]);

  // 删除重复的WebSocket监听器
  useEffect(() => {
    console.log('Current data state:', {
      characterHistory: characterHistory.length,
      aiPosts: aiPosts.length,
      voteHistory: voteHistory.length,
      loading,
      effectiveSceneId
    });
  }, [characterHistory, aiPosts, voteHistory, loading, effectiveSceneId]);

  const handleLogin = (userInfo: UserInfo) => {
    // 更新状态
    setIsSignedIn(true);
    setUserInfo(userInfo);
    
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in."
    });
  };

  const handleLogout = () => {
    // 更新状态
    setIsSignedIn(false);
    setUserInfo(null);
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
  };

  // 根据 sceneId 获取对应的 tag
  const getTagFromSceneId = (sceneId: string): string => {
    // 根据实际场景ID映射到对应的tag
    const effectiveId = getEffectiveSceneId(sceneId);
    if (effectiveId === '4') return 'ranch';  // 牧场场景
    if (effectiveId === '3') return 'idol';   // 偶像场景
    return 'ranch'; // 默认返回 ranch
  };

  // 处理 tag 选择
  const handleTagSelect = (tagId: string) => {
    // 根据 tag 导航到对应的 roomId
    let targetSceneId = 'MainMenu';
    if (tagId === 'ranch') {
      targetSceneId = '4';  // 牧场场景
    } else if (tagId === 'idol') {
      targetSceneId = '3';  // 偶像场景
    }
    
    // 更新 URL 并导航到新场景
    navigate(`/scene?sceneId=${targetSceneId}`);
    navigateToScene(targetSceneId);
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  // 示例：更新场景
  const handleUpdateScene = () => {
    sendMessageToGame({
      type: 'UPDATE_SCENE',
      data: {
        sceneId: '1',
        name: 'Test Scene',
        elements: []
      }
    });
  };

  // 更新点赞方法，使用WebSocket
  function handleLike(tweetId: number): void {
    // 立即更新本地UI状态
    setAiPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === tweetId) {
          // 如果之前没有点赞，点赞数+1；如果之前已点赞，则取消点赞（数量-1）
          const newLikeCount = post.like ? post.likeCount - 1 : post.likeCount + 1;
          return {
            ...post,
            like: !post.like,
            likeCount: newLikeCount
          };
        }
        return post;
      });
    });
    
    // 发送WebSocket请求 - type=1 表示点赞
    websocketService.operateTweet(tweetId, 1, "", 0, 0);
  }

  // 处理投票方法
  function handleVote(tweetId: number, optionIndex: number): void {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to participate in voting"
      });
      return;
    }
    
    // 找到对应的推文
    const targetPost = aiPosts.find(post => post.id === tweetId);
    if (!targetPost) {
      console.error('找不到对应的推文:', tweetId);
      return;
    }

    // 检查是否已经投过票
    if (targetPost.choose) {
      toast({
        title: "Already voted",
        description: "You have already voted on this thread"
      });
      return;
    }
    
    // 立即更新本地UI状态
    setAiPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === tweetId) {
          // 计算新的投票率分布
          const currentRateList = post.rateList ? [...post.rateList] : [];
          const updatedRateList = [...currentRateList];
          
          // 确保数组有足够的长度
          while (updatedRateList.length <= optionIndex) {
            updatedRateList.push(0);
          }
          
          // 增加选中选项的投票率
          const increment = 10; // 每次投票增加10%
          updatedRateList[optionIndex] = Math.min(100, updatedRateList[optionIndex] + increment);
          
          // 调整其他选项的百分比，确保总和合理
          const totalOthers = updatedRateList.reduce((sum, rate, idx) => 
            idx !== optionIndex ? sum + rate : sum, 0);
          
          if (totalOthers > 0) {
            const reductionRatio = Math.max(0, (100 - updatedRateList[optionIndex]) / totalOthers);
            for (let i = 0; i < updatedRateList.length; i++) {
              if (i !== optionIndex) {
                updatedRateList[i] = Math.max(0, updatedRateList[i] * reductionRatio);
              }
            }
          }
          
          return {
            ...post,
            choose: true, // 标记为已投票
            rateList: updatedRateList
          };
        }
        return post;
      });
    });
    
    // 构建rateList - 发送当前的投票分布
    const currentPost = aiPosts.find(post => post.id === tweetId);
    const currentRateList = currentPost?.rateList ? [...currentPost.rateList] : [];
    
    // 确保rateList有足够的长度并更新选中的选项
    while (currentRateList.length <= optionIndex) {
      currentRateList.push(0);
    }
    
    // 增加选中选项的投票数
    currentRateList[optionIndex] = (currentRateList[optionIndex] || 0) + 1;
    
    console.log('🗳️ 发送投票请求:', {
      tweetId,
      optionIndex,
      rateList: currentRateList,
      timestamp: new Date().toISOString()
    });
    
    // 发送WebSocket请求 - type=3 表示选择/投票，使用实际的tweetId和rateList
    websocketService.operateTweet(tweetId, 3, "", 0, optionIndex, currentRateList);
  }

  // 处理选择NPC事件
  const handleSelectNpc = (npcId: number) => {
    // 根据NPC ID获取对应的roomId
    const newRoomId = getNpcRoomId(npcId);
    const currentRoomId = effectiveSceneId;
    
    // 如果roomId发生变化，重新加载推文数据
    if (newRoomId !== currentRoomId) {
      console.log(`NPC ${npcId} selected, switching from roomId ${currentRoomId} to ${newRoomId}`);
      
      // 设置NPC切换加载状态
      setNpcSwitchLoading(true);
      
      // 立即清空当前推文数据，确保显示新数据
      setAiPosts([]);
      setVoteHistory([]);
      setCharacterHistory([]);
      
      // 重置loading状态
      setPostsLoading(true);
      setVotesLoading(true);
      
      // 更新URL参数以反映新的场景
      navigate(`/scene?sceneId=${newRoomId}`);
      
      // 立即重新加载推文数据
      setLoading(true);
      
      // 确保WebSocket连接已建立
      if (websocketService.isConnectionOpen()) {
        // 获取新场景的推文数据
        websocketService.send(Commands.GET_SCENE_FEED, { 
          roomId: Number(newRoomId), 
          page: 0, 
          size: 99 
        });
        
        // 获取新场景的投票历史记录
        websocketService.getVoteHistory(Number(newRoomId));
        
        // 获取新场景的角色历史
        websocketService.send(Commands.GET_CHARACTER_HISTORY, {
          roomId: Number(newRoomId)
        });
        
        // 给WebSocket响应一些时间
        setTimeout(() => {
          setLoading(false);
          setNpcSwitchLoading(false);
          // 如果在超时后仍然没有数据，停止loading状态
          setTimeout(() => {
            setPostsLoading(false);
            setVotesLoading(false);
          }, 2000); // 额外2秒等待数据
        }, 1500);
      } else {
        console.warn("WebSocket连接尚未建立，等待连接...");
        setTimeout(() => {
          if (websocketService.isConnectionOpen()) {
            websocketService.send(Commands.GET_SCENE_FEED, { 
              roomId: Number(newRoomId), 
              page: 0, 
              size: 99 
            });
            websocketService.getVoteHistory(Number(newRoomId));
            websocketService.send(Commands.GET_CHARACTER_HISTORY, {
              roomId: Number(newRoomId)
            });
          }
          setLoading(false);
          setNpcSwitchLoading(false);
          // 重置loading状态
          setPostsLoading(false);
          setVotesLoading(false);
        }, 2000);
      }
      
      // 通知游戏引擎场景切换
      navigateToScene(newRoomId);
      
      // 显示切换提示
      toast({
        title: "Switching Scene",
        description: `Switching to ${newRoomId === '3' ? 'Idol Scene' : 'Ranch Scene'}...`
      });
    }
  };

  // 添加根据NPC ID获取roomId的辅助函数
  const getNpcRoomId = (npcId: number): string => {
    // 牧场场景 (roomId: 4)
    if ([10016, 10017, 10018, 10019, 10020, 10021].includes(npcId)) {
      return '4';
    }
    
    // 偶像场景 (roomId: 3)
    if ([10012, 10009, 10006, 10022].includes(npcId)) {
      return '3';
    }
    
    // 默认返回当前场景ID
    return effectiveSceneId;
  };

  // 添加根据场景ID过滤NPC的函数
  const filterNpcsByScene = (characters: CharacterHistory[], sceneId: string): CharacterHistory[] => {
    const roomId = sceneId;
    
    return characters.filter(character => {
      // 牧场场景 (roomId: 4) 的NPC
      if (roomId === '4') {
        return [10016, 10017, 10018, 10019, 10020, 10021].includes(character.npcId);
      }
      
      // 偶像场景 (roomId: 3) 的NPC
      if (roomId === '3') {
        return [10012, 10009, 10006, 10022].includes(character.npcId);
      }
      
      // 默认显示所有NPC
      return true;
    });
  };

  // 过滤后的角色列表
  const filteredCharacters = filterNpcsByScene(characterHistory, effectiveSceneId);

  // 添加根据场景ID过滤推文的函数
  const filterPostsByScene = (posts: AIPost[], sceneId: string): AIPost[] => {
    const roomId = sceneId;
    
    return posts.filter(post => {
      // 牧场场景 (roomId: 4) 的NPC推文
      if (roomId === '4') {
        return [10016, 10017, 10018, 10019, 10020, 10021].includes(post.npcId);
      }
      
      // 偶像场景 (roomId: 3) 的NPC推文
      if (roomId === '3') {
        return [10012, 10009, 10006, 10022].includes(post.npcId);
      }
      
      // 默认显示所有推文
      return true;
    });
  };

  // 添加根据场景ID过滤投票的函数
  const filterVotesByScene = (votes: VoteHistory[], sceneId: string): VoteHistory[] => {
    console.log('🗳️ Filtering votes:', {
      totalVotes: votes.length,
      sceneId: sceneId,
      votes: votes.map(v => ({ roomId: v.roomId, content: v.content }))
    });
    
    // 投票历史已经通过roomId进行了过滤，因为我们在获取数据时就指定了roomId
    // 但为了保险起见，我们可以再次过滤
    const filtered = votes.filter(vote => vote.roomId === sceneId);
    
    console.log('🗳️ Filtered votes result:', {
      filteredCount: filtered.length,
      filtered: filtered.map(v => ({ roomId: v.roomId, content: v.content }))
    });
    
    return filtered;
  };

  // 处理投票历史面板的投票点击
  const handleVoteHistoryClick = (voteIndex: number, option: string) => {
    console.log(`🗳️ Vote history clicked: index ${voteIndex}, option ${option}`);
    
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to participate in voting"
      });
      return;
    }
    
    // 获取对应的投票记录
    const vote = filteredVotes[voteIndex];
    if (!vote) {
      console.error('找不到对应的投票记录:', voteIndex);
      return;
    }
    
    // 检查是否已经投过票
    if (vote.hasVoted || vote.userChoice) {
      toast({
        title: "Already voted",
        description: "You have already voted on this thread"
      });
      return;
    }
    
    console.log('🗳️ 发送投票历史请求:', {
      voteIndex,
      option,
      vote: vote,
      roomId: effectiveSceneId,
      timestamp: new Date().toISOString()
    });
    
    // 根据选项确定投票类型
    let voteValue: number;
    if (effectiveSceneId === '3') {
      // 偶像场景：A=0, B=1, C=2
      const optionMap: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2 };
      voteValue = optionMap[option] ?? 0;
    } else {
      // 牧场场景：YES=1, NO=0
      voteValue = option === 'YES' ? 1 : 0;
    }
    
    // 发送投票请求到后端
    // 使用新的voteOnHistory方法发送投票历史的投票
    websocketService.voteOnHistory(
      Number(effectiveSceneId),
      vote.requestId,
      option,
      voteValue,
      vote.content
    );
    
    // 立即更新本地状态以提供即时反馈
    setVoteHistory(prevVotes => {
      return prevVotes.map((v, idx) => {
        if (idx === voteIndex) {
          return {
            ...v,
            hasVoted: true,
            userChoice: option,
            // 更新投票计数
            myYesCount: option === 'YES' ? '1' : v.myYesCount,
            myNoCount: option === 'NO' ? '1' : v.myNoCount
          };
        }
        return v;
      });
    });
    
    toast({
      title: "Vote successful",
      description: `You selected ${option}`
    });
  };

  // 过滤后的推文和投票列表
  const filteredPosts = filterPostsByScene(aiPosts, effectiveSceneId);
  const filteredVotes = filterVotesByScene(voteHistory, effectiveSceneId);

  console.log('📊 Rendering Scene with:', {
    effectiveSceneId,
    totalVoteHistory: voteHistory.length,
    filteredVotes: filteredVotes.length,
    filteredPosts: filteredPosts.length,
    loading
  });

  // 处理评论方法
  function handleComment(tweetId: number, comment: string): void {
    if (!isSignedIn) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to post a comment"
      });
      return;
    }
    
    console.log('💬 Submitting comment:', {
      tweetId,
      comment,
      effectiveSceneId,
      timestamp: new Date().toISOString()
    });
    
    // 发送WebSocket请求提交评论 - type=2 表示评论，使用tweetId
    websocketService.operateTweet(tweetId, 2, comment, 0, 0);
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        characters={filteredCharacters} 
        className="flex-shrink-0"
        isSignedIn={isSignedIn}
        userInfo={userInfo}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isUserInfoFolded={isUserInfoFolded}
        onSelectNpc={handleSelectNpc}
        npcSwitchLoading={npcSwitchLoading}
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onTagSelect={handleTagSelect} 
          className="flex-shrink-0" 
          selectedTag={getTagFromSceneId(sceneId)}
          onLogoClick={handleLogoClick}
        />
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading scene...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
            {/* Game Embed */}
            <div className="w-full md:w-[510px] h-full flex-shrink-0 mb-4 md:mb-0 overflow-y-auto">
              <CocosEmbed sceneId={gameSceneId} className="h-full" />
            </div>
            
            {/* Content Columns Container */}
            <div className="flex-1 flex gap-4 h-full">
              {/* Thread Feed */}
              <div className="flex-1 h-full overflow-y-auto border border-gray-200 rounded-lg p-4">
                <SceneThreadFeed 
                  posts={filteredPosts} 
                  isSignedIn={isSignedIn}
                  loading={postsLoading}
                  onLike={handleLike}
                  onVote={handleVote}
                  onComment={handleComment}
                />
              </div>
              
              {/* Vote History */}
              <div className="flex-1 h-full overflow-y-auto border border-gray-200 rounded-lg p-4">
                <VoteHistoryPanel 
                  voteHistory={filteredVotes} 
                  currentSceneId={effectiveSceneId}
                  loading={votesLoading}
                  onVoteClick={handleVoteHistoryClick}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Scene;
