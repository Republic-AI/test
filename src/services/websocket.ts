import protobuf from 'protobufjs';
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
  private root: protobuf.Root | null = null;
  private messageHandlers: Map<number, (data: any) => void> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.initProtobuf();
    this.connect();
  }

  private async initProtobuf() {
    try {
      this.root = await protobuf.load('/proto/messages.proto');
      console.log('Protobuf definitions loaded successfully');
    } catch (err) {
      console.error('Failed to load protobuf definitions:', err);
    }
  }

  private connect() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    this.ws = new WebSocket('ws://localhost:8081');

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = async (event) => {
      try {
        if (!this.root) {
          console.error('Protobuf definitions not loaded');
          return;
        }

        // Decode the binary message
        const buffer = await event.data.arrayBuffer();
        const BaseMessage = this.root.lookupType('BaseMessage');
        const baseMessage = BaseMessage.decode(new Uint8Array(buffer));
        
        // Parse the JSON data
        const data = JSON.parse(baseMessage.data);
        console.log('Received message:', { command: baseMessage.command, data });

        const handler = this.messageHandlers.get(baseMessage.command);
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
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  async send(command: number, data: any) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }

    if (!this.root) {
      console.error('Protobuf definitions not loaded');
      return;
    }

    try {
      // Create base message
      const BaseMessage = this.root.lookupType('BaseMessage');
      const message = BaseMessage.create({
        command,
        data: JSON.stringify(data)
      });

      // Encode and send
      const buffer = BaseMessage.encode(message).finish();
      this.ws.send(buffer);
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
    // Send initial messages
    MOCK_SCENE_CHARACTER_HISTORY['scene_A1'].forEach(message => handler(message));
  }

  public unsubscribe(handler: (message: CharacterHistory) => void) {
    this.messageHandlers.delete(Commands.GET_RECENT_MESSAGES);
  }
}

export const websocketService = new WebSocketService(); 