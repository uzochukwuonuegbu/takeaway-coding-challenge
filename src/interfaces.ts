import { NextFunction, Request, Response } from 'express-serve-static-core';
import { Model } from 'sequelize';

export type ExpressRouteFunc = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface IGameController {
  startGane(): ExpressRouteFunc;
  joinGame(): ExpressRouteFunc;
  getGameById(): ExpressRouteFunc;
}

export interface IPlayerController {
  // login(): ExpressRouteFunc;
  register(): ExpressRouteFunc;
}

export interface IGameService {
  startGame(data: any): Promise<Game>;
  joinGame(data: any): Promise<Game>;
}

export interface IPlayerService {
  register(email: string): Promise<{ playerId: string }>;
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
  create(dara: any): Promise<Player>;
  findById(id: string): Promise<Player | null>;
  find(query?: any): Promise<Player | null>;
  update(id: string, updates: any): Promise<string>;
  delete(id: string): Promise<void>;
  findAll(query?: any): Promise<Player[]>;
  findByEmail(email: string): Promise<Player>;
}

// Models
enum GameStatus {
  'progress' = 'progress',
  'finished' = 'finished'
}
interface GameAttributes {
  id: string;
  player1: string;
  player2: string;
  nextMove: string;
  status: GameStatus
  result: number;
  winner?: string;
}

interface PlayerAttributes {
  id: string;
  email: string;
}

export class Player extends Model<PlayerAttributes> implements PlayerAttributes {
  public id!: string;
  public email!: string;
}

export class Game extends Model<GameAttributes> implements GameAttributes {
  public id!: string;
  public player1!: string;
  public player2!: string;
  public nextMove!: string;
  public status!: GameStatus;
  public winner!: string;
  public result!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
