import { CharacterHistory } from '@/types/drama';
import { MOCK_SCENE_CHARACTER_HISTORY } from '@/mock/scene-data';

// 环境配置
const ENV = {
  TEST: 'test',
  PROD: 'production'
};

// WebSocket 服务器配置
const WS_SERVERS = {
  [ENV.TEST]: 'wss://dramai.world/api/ws',
  [ENV.PROD]: 'wss://dramai.world/api/ws'
};

// 当前环境
const CURRENT_ENV = process.env.NODE_ENV === 'development' ? ENV.TEST : ENV.PROD;

// Command types
export const Commands = {
  LOGIN: 10000,
  GET_SCENE_FEED: 10112,  // SceneThreadFeed
  VOTE_THREAD: 10119,  // VoteHistoryPanel
  GET_CHARACTER_HISTORY: 10025,  // CharacterHistorySidebar
  OPERATE_TWEET: 10113,  // SceneThreadFeed
};

// 定义新的接口类型
interface LoginRequestData {
  loginType: number;
  name: string;
  password: string;
  nickName: string;
  avatar: number;
  sex: number;
  timeZone: number;
  clientOs: string;
  userId: string;
  inviteCode: string;
  invite: string;
  address: string;
}

interface Tweet {
  id: number;
  content: string;
  author: string;
  avatar: string;
  timestamp: string;
  voteCount: number;
  commentCount: number;
  isLiked: boolean;
}

interface SceneFeedResponse {
  roomId: number;
  tweetVoList: Tweet[];
}

interface LoginResponseData {
  token: string;
  timestamp: number;
  player: {
    playerId: string;
    charater: number;
    loginType: number;
    address: string;
  };
}

interface InetwarkResponseData {
  requestId: number;
  playerId?: number;
  type: number;
  command: number;
  code: number;
  message: string;
  data: LoginResponseData | SceneFeedResponse;
}

interface WebSocketEvent {
  command: number;
  data: any;
  code: number;
  message: string;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private eventHandlers: Map<number, ((event: WebSocketEvent) => void)[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isLoggedIn = false;
  private pendingRequests: { command: number; data: any }[] = [];

  constructor() {
    if (CURRENT_ENV === ENV.PROD) {
      console.log('Running in production environment, connecting to production WebSocket server');
    } else {
      console.log('Running in development environment, connecting to test WebSocket server');
    }
    this.connect();
  }

  private connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    try {
      const wsUrl = WS_SERVERS[CURRENT_ENV];
      console.log(`Connecting to ${CURRENT_ENV} WebSocket server: ${wsUrl}`);
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log(`WebSocket connected to ${CURRENT_ENV} server`);
        this.reconnectAttempts = 0;
        
        if (CURRENT_ENV === ENV.PROD) {
          const loginData: LoginRequestData = {
            loginType: 1,
            name: process.env.VITE_WS_USERNAME || '',
            password: process.env.VITE_WS_PASSWORD || '',
            nickName: process.env.VITE_WS_NICKNAME || '',
            avatar: 0,
            sex: 1,
            timeZone: 2,
            clientOs: 'web',
            userId: process.env.VITE_WS_USER_ID || '',
            inviteCode: '',
            invite: '',
            address: ''
          };
          this.login(loginData);
        } else {
          const loginData: LoginRequestData = {
            loginType: 1,
            name: 'test_user',
            password: 'test_password',
            nickName: 'Test User',
            avatar: 0,
            sex: 1,
            timeZone: 2,
            clientOs: 'web',
            userId: '',
            inviteCode: '',
            invite: '',
            address: ''
          };
          this.login(loginData);
        }
      };

      this.ws.onmessage = (event) => {
        try {
          if (typeof event.data === 'string') {
            const response = JSON.parse(event.data) as InetwarkResponseData;
            console.log('Received message from server:', {
              timestamp: new Date().toISOString(),
              rawMessage: event.data,
              command: response.command,
              code: response.code,
              errorMessage: response.message
            });

            // 处理登录响应
            if (response.command === Commands.LOGIN) {
              this.processLoginResponse(response);
            }

            // 触发对应命令的事件处理器
            const handlers = this.eventHandlers.get(response.command);
            if (handlers) {
              const event: WebSocketEvent = {
                command: response.command,
                data: response.data,
                code: response.code,
                message: response.message
              };
              handlers.forEach(handler => handler(event));
            }
          } else {
            console.warn('Received non-text message, ignoring:', event.data);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isLoggedIn = false;
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          setTimeout(() => this.connect(), 1000 * this.reconnectAttempts);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  }

  // 注册事件处理器
  on(command: number, handler: (event: WebSocketEvent) => void) {
    if (!this.eventHandlers.has(command)) {
      this.eventHandlers.set(command, []);
    }
    this.eventHandlers.get(command)?.push(handler);
  }

  // 移除事件处理器
  off(command: number, handler: (event: WebSocketEvent) => void) {
    const handlers = this.eventHandlers.get(command);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  send(command: number, data: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    if (command !== Commands.LOGIN && !this.isLoggedIn) {
      console.log('Not logged in, adding request to pending queue:', command);
      this.pendingRequests.push({ command, data });
      return;
    }

    try {
      const message = {
        requestId: 0, // 不再使用 requestId 进行消息匹配
        type: 1,
        command,
        data
      };
      
      const jsonMessage = JSON.stringify(message);
      console.log('Sending message to server:', {
        timestamp: new Date().toISOString(),
        message: jsonMessage,
        command: command,
        data: data
      });
      this.ws.send(jsonMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  // 测试所有业务功能
  public testAllFeatures() {
    console.log('Testing all features...');
    
    // 测试获取场景Feed
    this.getSceneFeed();
    
    // 测试获取角色历史
    this.getCharacterHistory();
    
    // 测试投票功能
    this.voteThread('test_thread', true);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  // Business methods
  login(loginData: LoginRequestData) {
    this.send(Commands.LOGIN, loginData);
  }

  getSceneFeed(roomId: number = 0, page: number = 0, size: number = 100) {
    this.send(Commands.GET_SCENE_FEED, { roomId , page, size });
  }

  operateTweet(tweetId: number, type: number, content: string, replyId: number, chooseIndex:  number) {
    this.send(Commands.OPERATE_TWEET, {
      tweetId,
      type,
      content,
      replyId,
      chooseIndex
    });
  }

  voteThread(threadId: string, isUpvote: boolean) {
    this.send(Commands.VOTE_THREAD, {
      postId: threadId,
      vote: isUpvote ? 1 : -1
    });
  }

  getCharacterHistory(pageSize: number = 10, pageNum: number = 1) {
    this.send(Commands.GET_CHARACTER_HISTORY, {
      pageSize,
      pageNum
    });
  }

  public subscribe(handler: (message: any) => void) {
    this.on(Commands.GET_SCENE_FEED, (event: WebSocketEvent) => {
      if (event.command === Commands.GET_SCENE_FEED) {
        handler(event.data);
      }
    });
  }

  public unsubscribe(handler: (message: any) => void) {
    this.off(Commands.GET_SCENE_FEED, (event: WebSocketEvent) => {
      if (event.command === Commands.GET_SCENE_FEED) {
        handler(event.data);
      }
    });
  }

  // 处理 Google 登录
  googleLogin(googleUser: any) {
    const loginData: LoginRequestData = {
      loginType: 2, // Google 登录类型
      name: googleUser.getBasicProfile().getEmail(),
      password: '', // Google 登录不需要密码
      nickName: googleUser.getBasicProfile().getName(),
      avatar: 0, // 默认头像
      sex: 1, // 默认性别
      timeZone: 2, // 默认时区
      clientOs: "web",
      userId: googleUser.getBasicProfile().getId(),
      inviteCode: '',
      invite: '',
      address: ''
    };

    this.login(loginData);
  }

  private processLoginResponse(response: InetwarkResponseData) {
    if (response.code === 0) {
      console.log('Login successful');
      this.isLoggedIn = true;
      const loginData = response.data as LoginResponseData;
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('playerId', loginData.player.playerId);
      this.processPendingRequests();
    } else {
      console.error('Login failed:', response.message);
    }
  }

  private processPendingRequests() {
    if (!this.isLoggedIn) return;

    while (this.pendingRequests.length > 0) {
      const request = this.pendingRequests.shift();
      if (request) {
        this.send(request.command, request.data);
      }
    }
  }
}

export const websocketService = new WebSocketService(); 