import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { Game } from '../interfaces';

Game.init(
    {
        id: {
            type: UUIDV4,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false,
          },
          player1: {
            type: UUIDV4,
            allowNull: false,
          },
          player2: {
            type: UUIDV4,
            allowNull: true,
          },
          status: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          nextMove: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          result: {
            type: DataTypes.NUMBER,
            allowNull: false,
          },
      },
      {
        sequelize,
        tableName: 'games',
        timestamps: false,
      }
  );

export default Game;