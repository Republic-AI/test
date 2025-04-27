const WebSocket = require('ws');

// 直接在服务器中定义 mock 数据，而不是尝试导入
const MOCK_CHARACTERS = [
  {
    roomId: 'scene_A1',
    id: 'char1',
    name: 'Emily',
    description: 'A vibrant AI character with a passion for storytelling',
    imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily'
  },
  {
    roomId: 'scene_A1',
    id: 'char2',
    name: 'Jack',
    description: 'A wise AI assistant with deep knowledge',
    imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jack'
  },
  {
    roomId: 'scene_B1',
    id: 'char3',
    name: 'Luna',
    description: 'Rising idol star with a unique voice',
    imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna'
  },
  {
    roomId: 'scene_B1',
    id: 'char4',
    name: 'Alex',
    description: 'Experienced music producer and mentor',
    imageUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex'
  }
];

const wss = new WebSocket.Server({ port: 8081 });

console.log('WebSocket server started on port 8081');

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send initial messages filtered by roomId
  const sceneACharacters = MOCK_CHARACTERS.filter(character => character.roomId === 'scene_A1');
  sceneACharacters.forEach(message => {
    ws.send(JSON.stringify(message));
  });

  // Simulate new messages every 10 seconds
  const interval = setInterval(() => {
    const sceneACharacters = MOCK_CHARACTERS.filter(character => character.roomId === 'scene_A1');
    const randomMessage = sceneACharacters[Math.floor(Math.random() * sceneACharacters.length)];
    ws.send(JSON.stringify({
      ...randomMessage,
      timestamp: Date.now()
    }));
  }, 10000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
}); 