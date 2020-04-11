import {JWTSecretInterface, JWTSecret} from './secret';
import {JWTEndpointInterface} from './endpoint';
import {UserInterface} from '@/scaffold/auth';
import {Guest} from '@/scaffold/auth/user';

interface JWTUserOptions {
  endpoint: JWTEndpointInterface;
  secret: JWTSecretInterface;
}

export interface JWTUserInterface extends UserInterface {
  getSecret(): JWTSecretInterface;
}

export class JWTUser implements JWTUserInterface {
  protected readonly options: JWTUserOptions;

  constructor(options: JWTUserOptions) {
    this.options = options;
  }

  public getSecret(): JWTSecretInterface {
    return this.options.secret;
  }

  public async renew(): Promise<void> {
    if (!this.options.secret.allowRenew()) {
      throw new Error(`cannot renew for the user because of the policy settings`);
    }

    return;
  }

  public authorize(permission: string, object?: any): Promise<boolean> {
    return this.options.endpoint.authorize(this, permission);
  }

  public beforeRevoke(): void {
  }

  public revoked(): void {
  }
}

export class JWTGuest extends Guest implements JWTUserInterface {
  public getSecret(): JWTSecretInterface {
    return new JWTSecret({
      token: '',
      allowRenew: false,
      expiredAt: new Date(7226582400000), // 2199-01-01 08:00:00
    });
  }
}
