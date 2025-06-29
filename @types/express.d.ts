// types/express.d.ts
declare module 'express' {
  interface Request {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }
}
