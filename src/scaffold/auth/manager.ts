import {SecretInterface} from './secret';
import {UserInterface, Guest} from './user';

export interface AuthManagerInterface {
  getCurrentUser(): UserInterface;

  resolve(secret: SecretInterface): Promise<UserInterface>;

  revoke(user: UserInterface): Promise<void>;
}

export interface AuthManagerOptions {
  guest: Guest;
}

export abstract class AbstractAuthManager implements AuthManagerInterface {
  protected readonly options: AuthManagerOptions;

  protected constructor(options: AuthManagerOptions) {
    this.options = options;
  }

  public abstract getCurrentUser(): UserInterface;

  public abstract resolve(secret: SecretInterface): Promise<UserInterface>;

  public abstract revoke(user: UserInterface): Promise<void>;
}

