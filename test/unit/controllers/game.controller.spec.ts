import { GameController } from '../../../src/controllers/game.controller';
import { joinGameSchema } from '../../../src/controllers/validators/game.validator';
import { IGameService } from '../../../src/interfaces';

const mockGameService: IGameService = {
    startGame: jest.fn(),
    joinGame: jest.fn(),
    makeMove: jest.fn(),
    getGameById: jest.fn(),
    getGames: jest.fn(),
};

const gameController = new GameController(mockGameService);

describe('GameController', () => {
    describe('startGame', () => {
        it('should start a game and return a success response', async () => {
            const reqMock = {
                body: {
                    "startNumber": 25,
                    "player1": "82b300ed-5345-4c0f-8ff8-efe95e29e8df"
                }
            };
            const resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const nextMock = jest.fn();

            await gameController.startGame()(reqMock as any, resMock as any, nextMock);

            expect(mockGameService.startGame).toHaveBeenCalledWith(reqMock.body);
            expect(resMock.status).toHaveBeenCalledWith(201);
            expect(resMock.json).toHaveBeenCalled();
            expect(nextMock).not.toHaveBeenCalled();
        });

        it('should handle validation error and return a 400 response', async () => {
            const mockGameServiceFailure: IGameService = {
                startGame: jest.fn(),
                joinGame: jest.fn(),
                makeMove: jest.fn(),
                getGameById: jest.fn(),
                getGames: jest.fn(),
            };
            const reqMock = {
                body: {
                    // Invalid request body, missing required fields
                }
            };
            const resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const nextMock = jest.fn();
    
            await gameController.startGame()(reqMock as any, resMock as any, nextMock);
    
            expect(mockGameServiceFailure.startGame).not.toHaveBeenCalled();
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.json).toHaveBeenCalledWith({ "data": undefined, "message": "success", "status": 201 });
            expect(nextMock).not.toHaveBeenCalled();
        });
    });
    describe('joinGame', () => {
        it('should join a game and return a success response', async () => {
            const reqMock = {
                params: { id: 'gameId' },
                body: {
                    "player2": "player2Id",
                    "inputNumber": 42
                }
            };
            const resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const nextMock = jest.fn();
    
            await gameController.joinGame()(reqMock as any, resMock as any, nextMock);

            expect(mockGameService.joinGame).toHaveBeenCalledWith('gameId', { player2: 'player2Id', inputNumber: 42 });
            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.json).toHaveBeenCalledWith({ status: 200, message: 'success', data: undefined });
            expect(nextMock).not.toHaveBeenCalled();
        });
    
        it('should handle validation error and return a 400 response', async () => {
            const reqMock = {
                params: { id: 'gameId' },
                body: {
                    // Invalid request body, missing required fields
                }
            };
            const mockGameServiceFailure: IGameService = {
                startGame: jest.fn(),
                joinGame: jest.fn(),
                makeMove: jest.fn(),
                getGameById: jest.fn(),
                getGames: jest.fn(),
            };
            const resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const nextMock = jest.fn();
    
            const mockValidationError = { details: [{ message: 'Invalid name' }] };
            joinGameSchema.validate = jest.fn().mockReturnValue({ error: mockValidationError });
            reqMock.body = { x: '2' }
    
            await gameController.joinGame()(reqMock as any, resMock as any, nextMock);
    
            expect(joinGameSchema.validate).toHaveBeenCalledWith(reqMock.body);
            expect(mockGameServiceFailure.joinGame).not.toHaveBeenCalled();
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.json).toHaveBeenCalledWith({ message: 'Invalid name' });
            expect(nextMock).toHaveBeenCalled();
        });
    });
    describe('makeMove', () => {
        it('should make a move and return a success response', async () => {
            const reqMock = {
                params: { id: 'gameId', playerId: 'playerId' },
                body: {
                    "inputNumber": 42
                }
            };
            const resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const nextMock = jest.fn();
    
            await gameController.makeMove()(reqMock as any, resMock as any, nextMock);

            expect(mockGameService.makeMove).toHaveBeenCalledWith('gameId', 'playerId', { inputNumber: 42 });
            expect(resMock.status).toHaveBeenCalledWith(200);
            expect(resMock.json).toHaveBeenCalledWith({ status: 200, message: 'success', data: undefined });
            expect(nextMock).not.toHaveBeenCalled();
        });
    
        it('should handle validation error and return a 400 response', async () => {
            const reqMock = {
                params: { id: 'gameId', playerId: 'playerId' },
                body: {
                    // Invalid request body, missing required fields
                }
            };
            const mockGameServiceFailure: IGameService = {
                startGame: jest.fn(),
                joinGame: jest.fn(),
                makeMove: jest.fn(),
                getGameById: jest.fn(),
                getGames: jest.fn(),
            };
            const resMock = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const nextMock = jest.fn();
    
            const mockValidationError = { details: [{ message: 'Invalid name' }] };
            joinGameSchema.validate = jest.fn().mockReturnValue({ error: mockValidationError });
            reqMock.body = { x: '2' }
    
            await gameController.makeMove()(reqMock as any, resMock as any, nextMock);

            expect(mockGameServiceFailure.makeMove).not.toHaveBeenCalled();
            expect(resMock.status).toHaveBeenCalledWith(400);
            expect(resMock.json).toHaveBeenCalledWith({ status: 200, message: 'success', data: undefined });
            expect(nextMock).not.toHaveBeenCalled();
        });
    });
});