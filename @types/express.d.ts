import { AuthPayload } from 'src/modules/auth/interfaces/auth-payload.interface';

// types/express.d.ts
declare module 'express' {
  interface Request {
    user?: AuthPayload;
  }
}
