export {};

declare global {
  interface CustomJwtSessionClaims {
    o?: {
      id: string;
      org_id?: string;
    };
  }
}
