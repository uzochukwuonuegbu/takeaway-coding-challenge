import { JoinGameDto, MakeMoveDto, StartGameDto } from "../../../src/controllers/dto/game.dto";
import { BadRequestError, NotFoundError } from "../../../src/controllers/errorHandler/httpError";
import { IGameRepository, IPlayerRepository } from "../../../src/interfaces";
import { GameService } from '../../../src/services/game.service';

describe('GameService', () => {
    let mockGameRepository: jest.Mocked<IGameRepository>;
    let mockPlayerRepository: jest.Mocked<IPlayerRepository>;
    let gameService: GameService;

    beforeEach(() => {
        mockGameRepository = {
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        } as unknown as jest.Mocked<IGameRepository>;

        mockPlayerRepository = {
            findById: jest.fn(),
        } as unknown as jest.Mocked<IPlayerRepository>;

        gameService = new GameService(mockGameRepository, mockPlayerRepository);
    });

    describe('startGame', () => {
        it('should start a game successfully', async () => {
            const data: StartGameDto = {
                player1: 'player1Id',
                startNumber: 25,
                player2: 'player2Id',
            };

            mockPlayerRepository.findById = jest.fn().mockReturnValue({
                player1: 'player1Id',
            });
            mockGameRepository.create = jest.fn().mockReturnValue('gameId');

            const result = await gameService.startGame(data);

            expect(mockPlayerRepository.findById).toHaveBeenCalledWith('player1Id');
            expect(mockGameRepository.create).toHaveBeenCalledWith({
                player1: 'player1Id',
                player2: 'player2Id',
                startNumber: 25,
                next_move: 'player2Id',
                status: 'progress',
                result: 25,
                winner: null,
            });
            expect(result).toBe('gameId')
        });

        it('should throw NotFoundError if player1 is not found', async () => {
            const data: StartGameDto = {
                player1: 'nonexistentPlayerId',
                startNumber: 25,
                player2: 'player2Id',
            };

            mockPlayerRepository.findById = jest.fn().mockReturnValue(null);

            await expect(gameService.startGame(data)).rejects.toThrowError(NotFoundError);
            expect(mockPlayerRepository.findById).toHaveBeenCalledWith('nonexistentPlayerId');
            expect(mockGameRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('joinGame', () => {
        it('should join a game successfully', async () => {
            const gameId = 'gameId';
            const data: JoinGameDto = {
                player2: 'player2Id',
                inputNumber: 42,
            };

            const mockGame = {
                _id: gameId,
                player2: null,
                status: 'progress',
                result: 25,
                next_move: 'player1Id',
                winner: null,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockGame);
            mockGameRepository.update = jest.fn().mockReturnValue({ id: 'xxx' });

            const result = await gameService.joinGame(gameId, data);

            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).toHaveBeenCalledWith(gameId, {
                player2: 'player2Id',
                winner: null,
                status: 'progress',
                next_move: undefined,
                result: 67
              });
            expect(result).toEqual({ id: 'xxx' });
        });

        it('should throw NotFoundError if the game is not found', async () => {
            const gameId = 'nonexistentGameId';
            const data: JoinGameDto = {
                player2: 'player2Id',
                inputNumber: 42,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(null);

            await expect(gameService.joinGame(gameId, data)).rejects.toThrowError(NotFoundError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
        });

        it('should throw BadRequestError if the game is already joined', async () => {
            const gameId = 'joinedGameId';
            const data: JoinGameDto = {
                player2: 'player2Id',
                inputNumber: 42,
            };

            const mockJoinedGame = {
                _id: gameId,
                player2: 'existingPlayerId',
                status: 'progress',
                result: 25,
                next_move: 'player1Id',
                winner: null,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockJoinedGame);

            await expect(gameService.joinGame(gameId, data)).rejects.toThrowError(BadRequestError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
        });

        it('should throw NotFoundError if the game is finished', async () => {
            const gameId = 'finishedGameId';
            const data: JoinGameDto = {
                player2: 'player2Id',
                inputNumber: 42,
            };

            const mockFinishedGame = {
                _id: gameId,
                player2: null,
                status: 'finished',
                result: 25,
                next_move: 'player1Id',
                winner: null,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockFinishedGame);

            await expect(gameService.joinGame(gameId, data)).rejects.toThrowError(NotFoundError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
        });

        it('should update the game when inputNumber is provided', async () => {
            const gameId = 'gameId';
            const data: JoinGameDto = {
                player2: 'player2Id',
                inputNumber: 42,
            };

            const mockGame = {
                _id: gameId,
                player2: null,
                status: 'progress',
                result: 25,
                next_move: 'player1Id',
                winner: null,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockGame);
            mockGameRepository.update = jest.fn().mockReturnValue('xxxx');

            const result = await gameService.joinGame(gameId, data);

            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).toHaveBeenCalledWith(gameId, {
                player2: 'player2Id',
                winner: null,
                status: 'progress',
                next_move: undefined,
                result: 67
              });
            expect(result).toEqual('xxxx');
        });

        it('should update the game and set winner if inputNumber results in a win', async () => {
            const gameId = 'gameId';
            const data: JoinGameDto = {
                player2: 'player2Id',
                inputNumber: 1, // Assuming this input results in a win
            };

            const mockGame = {
                _id: gameId,
                player2: null,
                status: 'progress',
                result: 2,
                next_move: 'player1Id',
                winner: null,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockGame);
            mockGameRepository.update = jest.fn().mockReturnValue('xxxx');

            const result = await gameService.joinGame(gameId, data);

            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).toHaveBeenCalledWith(gameId, {
                player2: 'player2Id',
                winner: 'player2Id',
                status: 'finished',
                next_move: undefined,
                result: 1,
            });
            expect(result).toEqual('xxxx');
        });
    });

    describe('makeMove', () => {
        it('should make a move successfully', async () => {
            const gameId = 'gameId';
            const playerId = 'playerId';
            const data: MakeMoveDto = {
                inputNumber: 42,
            };

            const mockGame = {
                _id: gameId,
                status: 'progress',
                result: 25,
                next_move: playerId,
                winner: null,
                player1: 'player1Id',
                player2: 'player2Id',
            };

            const mockPlayer = {
                id: playerId,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockGame);
            mockGameRepository.update = jest.fn().mockReturnValue('qqqq');
            mockPlayerRepository.findById = jest.fn().mockReturnValue(mockPlayer);

            const result = await gameService.makeMove(gameId, playerId, data);

            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).toHaveBeenCalledWith(gameId, {
                next_move: 'player1Id',
                winner: null,
                status: 'progress',
                result: 67
              });
            expect(result).toEqual({
                _id: 'gameId',
                status: 'progress',
                result: 25,
                next_move: 'playerId',
                winner: null,
                player1: 'player1Id',
                player2: 'player2Id'
              });
        });

        it('should throw NotFoundError if the game is not found', async () => {
            const gameId = 'nonexistentGameId';
            const playerId = 'playerId';
            const data: MakeMoveDto = {
                inputNumber: 42,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(null);

            await expect(gameService.makeMove(gameId, playerId, data)).rejects.toThrowError(NotFoundError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
        });

        it('should throw NotFoundError if the game is finished', async () => {
            const gameId = 'finishedGameId';
            const playerId = 'playerId';
            const data: MakeMoveDto = {
                inputNumber: 42,
            };

            const mockFinishedGame = {
                _id: gameId,
                status: 'finished',
                result: 25,
                next_move: 'player1Id',
                winner: null,
                player1: 'player1Id',
                player2: 'player2Id',
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockFinishedGame);

            await expect(gameService.makeMove(gameId, playerId, data)).rejects.toThrowError(NotFoundError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
        });

        it('should throw NotFoundError if the player is not found', async () => {
            const gameId = 'gameId';
            const playerId = 'nonexistentPlayerId';
            const data: MakeMoveDto = {
                inputNumber: 42,
            };

            const mockGame = {
                _id: gameId,
                status: 'progress',
                result: 25,
                next_move: 'player1Id',
                winner: null,
                player1: 'player1Id',
                player2: 'player2Id',
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockGame);
            mockPlayerRepository.findById = jest.fn().mockReturnValue(null);

            await expect(gameService.makeMove(gameId, playerId, data)).rejects.toThrowError(NotFoundError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
            expect(mockPlayerRepository.findById).toHaveBeenCalledWith(playerId);
        });
        it('should throw BadRequestError if it is not the player\'s turn', async () => {
            const gameId = 'gameId';
            const playerId = 'playerId';
            const data: MakeMoveDto = {
                inputNumber: 42,
            };

            const mockGame = {
                _id: gameId,
                status: 'progress',
                result: 25,
                next_move: 'otherPlayerId', // Assuming it's not the player's turn
                winner: null,
                player1: 'player1Id',
                player2: 'player2Id',
            };

            const mockPlayer = {
                id: playerId,
            };

            mockGameRepository.findById = jest.fn().mockReturnValue(mockGame);
            mockPlayerRepository.findById = jest.fn().mockReturnValue(mockPlayer);

            await expect(gameService.makeMove(gameId, playerId, data)).rejects.toThrowError(BadRequestError);
            expect(mockGameRepository.findById).toHaveBeenCalledWith(gameId);
            expect(mockGameRepository.update).not.toHaveBeenCalled();
            expect(mockPlayerRepository.findById).toHaveBeenCalledWith(playerId);
        });
    });
});