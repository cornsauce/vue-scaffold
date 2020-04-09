import {Secret} from './secret';
import {User} from './user';

export abstract class Provider<SecretType extends Secret, UserType extends User> {
  public abstract for(secret: SecretType): UserType;
}

