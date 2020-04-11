interface Lifecycle {
  beforeRevoke(): void;

  revoked(): void;
}

export interface UserInterface extends Lifecycle {
  renew(): Promise<void>;

  authorize(permission: string, object?: any): Promise<boolean>;
}

interface GuestOptions {
  authorize: (permission: string, object?: any) => Promise<boolean>;
}

export class Guest implements UserInterface {
  private readonly options: GuestOptions;

  constructor(options: GuestOptions) {
    this.options = options;
  }

  public async renew(): Promise<void> {
    throw new Error('cannot revoke a guest user');
  }

  public async authorize(permission: string, object?: any): Promise<boolean> {
    return await this.options.authorize(permission, object);
  }

  public beforeRevoke(): void {
  }

  public revoked(): void {
  }
}
