const WebSocket = require('ws');
const protobuf = require('protobufjs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Command types
const Commands = {
  LOGIN: 1,
  GET_SCENE_FEED: 3,
  VOTE_THREAD: 4
};

// Load protobuf definitions
let root;
protobuf.load(path.join(__dirname, '../proto/messages.proto'))
  .then((loadedRoot) => {
    root = loadedRoot;
    console.log('Protobuf definitions loaded successfully');
  })
  .catch(err => {
    console.error('Failed to load protobuf definitions:', err);
    process.exit(1);
  });

// WebSocket server configuration
const PORT = process.env.WS_PORT || 8080;
const wss = new WebSocket.Server({ 
  port: PORT,
  // 允许跨域连接
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});

// Store connected clients
const clients = new Set();

// Mock data store
const mockData = {
  characters: [
    {
      id: 'char1',
      name: 'Emily',
      description: 'A vibrant AI character with a passion for storytelling',
      imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily',
      job: 'Storyteller',
      jumpTo: 'scene1',
      tags: ['Creative', 'Enthusiastic']
    },
    {
      id: 'char2',
      name: 'Jack',
      description: 'A wise AI assistant with deep knowledge',
      imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
      job: 'Mentor',
      jumpTo: 'scene2',
      tags: ['Wise', 'Knowledgeable']
    }
  ],
  messages: [
    {
      id: 'msg1',
      content: "Hello everyone! I'm excited to share stories with you!",
      characterId: 'char1',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'msg2',
      content: "Let's explore the fascinating world of AI together.",
      characterId: 'char2',
      timestamp: new Date(Date.now() - 1800000).toISOString()
    }
  ],
  threads: [
    {
      id: 'thread1',
      content: 'How do you think AI will transform creative expression in the next decade? I believe we\'re just scratching the surface of what\'s possible when AI and human creativity combine.',
      author: 'Jack',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      votes: 5,
      vote: {
        options: ['upvote', 'downvote']
      }
    },
    {
      id: 'thread2',
      content: 'Digital platforms have revolutionized how we tell stories. From interactive narratives to AI-generated content, the possibilities are endless. What\'s your favorite new form of storytelling?',
      author: 'Emily',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      votes: 3,
      vote: {
        options: ['upvote', 'downvote']
      }
    }
  ],
  voteHistory: [
    {
      postId: 'thread1',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      vote: 1
    },
    {
      postId: 'thread2',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      vote: -1
    }
  ]
};

// Handle new WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  // Handle incoming messages
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);
      
      switch (data.command) {
        case Commands.LOGIN:
          handleLogin(ws, data.data);
          break;
        case Commands.GET_SCENE_FEED:
          handleGetSceneFeed(ws);
          break;
        case Commands.VOTE_THREAD:
          handleVoteThread(ws, data.data);
          break;
        default:
          console.log('Unknown command:', data.command);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Handle login request
function handleLogin(ws, data) {
  const loginData = JSON.parse(data);
  const response = {
    success: true,
    token: 'mock-token-123',
    message: 'Login successful'
  };
  sendProtobufMessage(ws, 'LoginResponse', response);
}

// Handle get scene feed request (合并最近消息和线程列表)
function handleGetSceneFeed(ws) {
  sendProtobufMessage(ws, 'SceneFeedResponse', {
    messages: mockData.messages,
    threads: mockData.threads.map(thread => ({
      id: thread.id,
      content: thread.content,
      author: thread.author,
      avatar: thread.avatar,
      timestamp: thread.timestamp,
      votes: thread.votes,
      vote: thread.vote
    }))
  });
}

// Handle vote thread request
function handleVoteThread(ws, data) {
  const voteData = JSON.parse(data);
  const thread = mockData.threads.find(t => t.id === voteData.postId);
  
  if (thread) {
    thread.votes += voteData.vote;
    
    // Add to vote history
    mockData.voteHistory.push({
      postId: voteData.postId,
      timestamp: new Date().toISOString(),
      vote: voteData.vote
    });

    sendProtobufMessage(ws, 'VoteResponse', {
      success: true,
      postId: voteData.postId,
      newVoteCount: thread.votes
    });

    // Broadcast thread feed update to all clients
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        handleGetSceneFeed(client);
      }
    });
  } else {
    sendProtobufMessage(ws, 'VoteResponse', {
      success: false,
      postId: voteData.postId,
      newVoteCount: 0
    });
  }
}

// Send protobuf message
function sendProtobufMessage(ws, messageType, data) {
  const MessageType = root.lookupType(messageType);
  const message = MessageType.create(data);
  const buffer = MessageType.encode(message).finish();
  ws.send(buffer);
}

// Start the server
console.log(`WebSocket server is running on port ${PORT}`); 