import {Provider} from '@/support/auth';
import {JWTUser} from './user';
import {JWTSecret} from './secret';

export class JWTProvider extends Provider<JWTSecret, JWTUser> {
  public for(secret: JWTSecret): JWTUser {
    return new JWTUser(secret);
  }
}
