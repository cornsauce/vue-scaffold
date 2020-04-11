export interface SecretInterface {
  expiredAt(): Date;

  allowRenew(): boolean;

  wasExpired(when: Date): boolean;
}

export interface SecretOptions {
  expiredAt: Date;
  allowRenew?: boolean;
}

export abstract class AbstractSecret implements SecretInterface {
  protected readonly options: SecretOptions;

  protected constructor(options: SecretOptions) {
    this.options = options;
  }

  public expiredAt(): Date {
    return this.options.expiredAt;
  }

  public allowRenew(): boolean {
    return this.options.allowRenew || false;
  }

  public wasExpired(when: Date): boolean {
    return this.expiredAt().getTime() > when.getTime();
  }
}
