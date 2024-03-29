import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../sequelize.orm';
import { Player } from '../interfaces';

Player.init(
    {
        id: {
            type: UUIDV4,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false,
          }
      },
      {
        sequelize,
        tableName: 'players',
        timestamps: false,
      }
  );

export default Player;