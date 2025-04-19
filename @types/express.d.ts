// types/express.d.ts
declare module 'express' {
  interface Request {
    user?: {
      name: string;
      email: string;
    };
  }
}
