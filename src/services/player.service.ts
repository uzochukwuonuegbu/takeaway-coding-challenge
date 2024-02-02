import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NotFoundError, RecordExistsError, UnauthorizedError } from "../controllers/errorHandler/httpError";
import { IPlayerRepository, IPlayerService } from "../interfaces";

const JWT_SECRET = 'asdfghjkl';

export class PlayerService implements IPlayerService {
  constructor(private authRepository: IPlayerRepository) {}

    public async register(email: string, password: string): Promise<{ token: string }> {
      const existingUser = await this.authRepository.findByEmail(email);
      if (existingUser) {
          throw new RecordExistsError('User already exists');
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await this.authRepository.create({ email, password: hashedPassword });
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      return token
    }
}