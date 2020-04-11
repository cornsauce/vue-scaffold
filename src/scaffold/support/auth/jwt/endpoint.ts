import {JWTUserInterface} from './user';
import {JWTSecretInterface} from './secret';
import {Bean} from '@/scaffold/support/inversify';

export interface JWTEndpointInterface {
  authenticate(secret: JWTSecretInterface): Promise<JWTUserInterface>;

  renew(user: JWTUserInterface): Promise<void>;

  authorize(user: JWTUserInterface, permission: string): Promise<boolean>;
}

@Bean()
export abstract class AbstractJWTEndpoint implements JWTEndpointInterface {
  public abstract authenticate(secret: JWTSecretInterface): Promise<JWTUserInterface>;

  public abstract renew(user: JWTUserInterface): Promise<void>;

  public abstract authorize(user: JWTUserInterface, permission: string): Promise<boolean>;
}
