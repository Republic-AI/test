# DramAI WebSocket Server

This is the WebSocket server for DramAI Dreamscape, handling real-time communication between clients and the server.

## Features

- WebSocket-based real-time communication
- Protobuf message encoding/decoding
- Handles various commands:
  - Login
  - Get characters list
  - Get recent messages
  - Get thread feed
  - Vote on threads

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure you have the Protobuf definitions file at `../proto/messages.proto`

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The WebSocket server will be running at `ws://localhost:8080`

## WebSocket Commands

The server accepts Protobuf-encoded messages with the following commands:

- `LOGIN`: Log in with a user ID
- `GET_CHARACTERS`: Get the list of available characters
- `GET_RECENT_MESSAGES`: Get recent messages
- `GET_THREAD_FEED`: Get the thread feed
- `VOTE_THREAD`: Vote on a thread

## Development

The server uses:
- `ws` for WebSocket functionality
- `protobufjs` for Protobuf message handling
- `nodemon` for development auto-reload 