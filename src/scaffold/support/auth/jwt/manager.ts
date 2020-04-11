import {AbstractAuthManager, AuthManagerOptions} from '@/scaffold/auth';
import {JWTUserInterface, JWTGuest} from './user';
import {JWTSecretInterface} from './secret';
import {JWTEndpointInterface} from './endpoint';

interface JWTManagerOptions extends AuthManagerOptions {
  endpoint: JWTEndpointInterface;
  guest: JWTGuest;
}

export class JWTManager extends AbstractAuthManager {
  protected readonly options: JWTManagerOptions;
  private readonly currentUser?: JWTUserInterface;

  constructor(options: JWTManagerOptions) {
    super(options);

    this.options = options;
  }

  public getCurrentUser(): JWTUserInterface {
    return this.currentUser || this.options.guest;
  }

  public resolve(secret: JWTSecretInterface): Promise<JWTUserInterface> {
    return this.options.endpoint.authenticate(secret);
  }

  public revoke(user: JWTUserInterface): Promise<void> {
    throw new Error('unimplemented method');
  }
}
