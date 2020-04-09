import {JWTSecret} from './secret';

export class JWTUser {
  private secret: JWTSecret;

  constructor(secret: JWTSecret) {
    this.secret = secret;
  }

  public getToken(): string {
    return this.secret.getToken();
  }
}
