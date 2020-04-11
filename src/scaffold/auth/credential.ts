//
// TODO:
//  1. consider a necessity to integrate the credential part into auth architecture


interface SimplePasswordCredentialOptions {
  name: string;
  password: string;
}

export class SimplePasswordCredential {
  private readonly options: SimplePasswordCredentialOptions;

  constructor(options: SimplePasswordCredentialOptions) {
    this.options = options;
  }

  public getName(): string {
    return this.options.name;
  }

  public getPassword(): string {
    return this.options.password;
  }
}
