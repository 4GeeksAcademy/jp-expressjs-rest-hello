import { Users } from './entities/Users';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Users;
  }
}