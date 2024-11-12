import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    passport?: {
      user?: any; // You can specify a more detailed type here
    };
  }
}

declare module 'express' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}
