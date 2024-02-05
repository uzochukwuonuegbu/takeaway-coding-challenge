import cors from "cors";
import app from "./app";
import { createServer } from 'node:http';
import { WebSocketServer } from "ws";

app.use(cors());

// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../swagger.js';
import { getGameController, getGameService, getPlayerService } from "./dependency-injection";

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
const server = createServer(app);
server.listen(
  PORT, () => {
    console.log(`web server running at ${PORT}`);
  });



  //  PROOF OF CONCEPT using WebSockets

const clients = {}
const wsServer = new WebSocketServer({ server });
wsServer.on('connection', (socket) => {
  let playerId;
  const playerService = getPlayerService()
  playerService.register(socket).then((data) => {
    console.log(`connected.`, data);
    playerId = data.playerId
    socket.send(JSON.stringify({ type: `player-joined-${data.playerId}` }))
    // acts as cache
    clients[playerId] = socket
  })

  const gameService = getGameService()
  socket.on("message", message => {
    const data = JSON.parse(message.toString());

    switch(data.type) {
      case 'start-game':
        gameService.startGame({ ...data, player1: playerId }).then((res) => {
          socket.send(JSON.stringify({ type: `game-started`, player2: res.player2, gameId: res.id }))
        }).catch((err) => {
          throw err
        })
        break;
      case 'join-game':
        const { gameId, playerId: player2, inputNumber } = data
        gameService.joinGame(gameId, player2, inputNumber).then((res) => {
          clients[res.next_move].send(JSON.stringify({ type: `game-moved`, result: res.result, gameId: res.id }))
        }).catch((err) => {
          throw err
        })
      case 'make-move':
        // add more checks etc
        gameService.makeMove(data.gameId, playerId, data.inputNumber).then((res) => {
          clients[res.next_move].send(JSON.stringify({ type: `game-moved`, result: res.result, gameId: res.id }))
        }).catch((err) => {
          throw err
        })
    }
    socket.send(`Receieved message- ${message}`)
  });

  socket.on("disconnect", () => {
    // Proof of concept
    // send others a notification ---
    Object.values(clients).map((client: any) => {
      client.send(JSON.stringify({ type: `player-disconnected-${playerId}`}))
    })
    socket.send('Cient disconnected')
    // save some metadata?
  });
});
