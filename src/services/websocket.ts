import { CharacterHistory } from '@/types/drama';
import { MOCK_SCENE_CHARACTER_HISTORY } from '@/mock/scene-data';

// Command types
export const Commands = {
  LOGIN: 1,
  GET_CHARACTERS: 2,
  GET_RECENT_MESSAGES: 3,
  GET_THREAD_FEED: 4,
  VOTE_THREAD: 5
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: Map<number, (data: any) => void> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    try {
    this.ws = new WebSocket('ws://localhost:8081');

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

      this.ws.onmessage = (event) => {
      try {
          // Parse the JSON data directly
          const data = JSON.parse(event.data);
          console.log('Received message:', data);

          // 通知所有订阅 GET_RECENT_MESSAGES 的处理程序
          const handler = this.messageHandlers.get(Commands.GET_RECENT_MESSAGES);
        if (handler) {
          handler(data);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
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

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(command: number, data: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    try {
      // 直接发送 JSON 数据
      this.ws.send(JSON.stringify({
        command,
        data
      }));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  onMessage(command: number, handler: (data: any) => void) {
    this.messageHandlers.set(command, handler);
  }

  // Business methods
  login(username: string, password: string) {
    this.send(Commands.LOGIN, { username, password });
  }

  getCharacters() {
    this.send(Commands.GET_CHARACTERS, {});
  }

  getRecentMessages() {
    this.send(Commands.GET_RECENT_MESSAGES, {});
  }

  getThreadFeed() {
    this.send(Commands.GET_THREAD_FEED, {});
  }

  voteThread(threadId: string, isUpvote: boolean) {
    this.send(Commands.VOTE_THREAD, { threadId, isUpvote });
  }

  public subscribe(handler: (message: CharacterHistory) => void) {
    this.messageHandlers.set(Commands.GET_RECENT_MESSAGES, handler);
    
    // 如果 WebSocket 未连接，使用本地数据
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not connected, using local mock data');
      const sceneCharacters = MOCK_SCENE_CHARACTER_HISTORY.filter(character => character.roomId === 'scene_A1');
      sceneCharacters.forEach(message => handler(message));
    }
  }

  public unsubscribe(handler: (message: CharacterHistory) => void) {
    this.messageHandlers.delete(Commands.GET_RECENT_MESSAGES);
  }
}

export const websocketService = new WebSocketService(); 