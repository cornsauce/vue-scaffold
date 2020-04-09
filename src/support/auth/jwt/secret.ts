import {Secret} from '@/support/auth';

export class JWTSecret extends Secret {
  private readonly token: string;

  constructor(token: string) {
    super();

    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }
}
