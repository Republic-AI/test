const WebSocket = require('ws');
const { MOCK_SCENE_CHARACTER_HISTORY } = require('../src/mock/scene-data');

const wss = new WebSocket.Server({ port: 8081 });

console.log('WebSocket server started on port 8081');

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send initial messages
  MOCK_SCENE_CHARACTER_HISTORY['scene_A1'].forEach(message => {
    ws.send(JSON.stringify(message));
  });

  // Simulate new messages every 10 seconds
  const interval = setInterval(() => {
    const randomMessage = MOCK_SCENE_CHARACTER_HISTORY['scene_A1'][Math.floor(Math.random() * MOCK_SCENE_CHARACTER_HISTORY['scene_A1'].length)];
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