import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Model } from 'sequelize';
import { JoinGameDto, MakeMoveDto, StartGameDto } from './controllers/dto/game.dto';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface IGameController {
  startGame(): ExpressRouteFunc;
  joinGame(): ExpressRouteFunc;
  getGameById(): ExpressRouteFunc;
  getGames(): ExpressRouteFunc;
  makeMove(): ExpressRouteFunc;
}

export interface IPlayerController {
  // login(): ExpressRouteFunc;
  registerPlayer(): ExpressRouteFunc;
  getPlayers(): ExpressRouteFunc;
  getPlayerById(): ExpressRouteFunc;
}

export interface IGameService {
  startGame(data: StartGameDto): Promise<Game>;
  joinGame(id: string, playerId: string, inputNumber: number): Promise<Game>;
  makeMove(id: string, playerId: string, inputNumber: number): Promise<Game>;
  getGameById(id: string): Promise<Game>;
  getGames(filter: any): Promise<Game[]>;
}

export interface IPlayerService {
  register(connection: any): Promise<{ playerId: string }>;
  getPlayers(filter: any): Promise<Player[]>;
  getPlayerById(id: string): Promise<Player>;
}

export interface IGameRepository {
  create(data: any): Promise<Game>;
  findById(id: string): Promise<Game | null>;
  find(query?: any): Promise<Game | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Game[]>;
}

export interface IPlayerRepository {
  create(data: any): Promise<Player>;
  findById(id: string): Promise<Player | null>;
  find(query?: any): Promise<Player | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Player[]>;
  findOrCreate(playerId: string, data: any): Promise<Player>;
}

// Models
export enum GameStatus {
  'progress' = 'progress',
  'finished' = 'finished'
}
interface GameAttributes {
  id: string;
  player1: string;
  player2: string;
  next_move: string;
  status: GameStatus
  result: number;
  winner?: string;
}

interface PlayerAttributes {
  id: string;
}

export class Player extends Model<PlayerAttributes> implements PlayerAttributes {
  public id!: string;
}

export class Game extends Model<GameAttributes> implements GameAttributes {
  public id!: string;
  public player1!: string;
  public player2!: string;
  public next_move!: string;
  public status!: GameStatus;
  public winner!: string;
  public result!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
