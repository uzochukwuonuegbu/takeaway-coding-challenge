import { Model, ModelStatic } from 'sequelize';

export abstract class BaseRepository<T extends Model> {
  protected constructor(protected readonly dbClient: ModelStatic<T>) {}

  public async create(data): Promise<T> {
    return this.dbClient.create(data);
  }

  public async findById(id): Promise<T | null> {
    return this.dbClient.findByPk(id);
  }

  public async find(query?: any): Promise<T | null> {
    return this.dbClient.findOne(query);
  }

  public async update(id: string, updates): Promise<string> {
    const query: any = {
        where: {
            id,
        }
    };
    await this.dbClient.update(updates, query);
    return id;
  }

  public async delete(id): Promise<void> {
    const query: any = {
      where: {
        id,
      },
    };
    await this.dbClient.destroy(query);
  }

  public async findAll(query?: any): Promise<T[]> {
    return this.dbClient.findAll(query);
  }
}