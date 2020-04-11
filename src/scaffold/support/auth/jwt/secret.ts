import {AbstractSecret} from '@/scaffold/auth';
import {SecretInterface, SecretOptions} from '@/scaffold/auth/secret';

export interface JWTSecretInterface extends SecretInterface {
  getToken(): string;
}

interface JWTSecretOptions extends SecretOptions {
  token: string;
}

export class JWTSecret extends AbstractSecret implements JWTSecretInterface {
  protected readonly options: JWTSecretOptions;

  constructor(options: JWTSecretOptions) {
    super(options);

    this.options = options;
  }

  public getToken(): string {
    return this.options.token;
  }
}
