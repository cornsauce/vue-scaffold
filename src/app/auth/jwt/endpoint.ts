import {AbstractJWTEndpoint, JWTSecretInterface, JWTUserInterface, JWTUser} from '@/scaffold/support/auth/jwt';
import {Bean, Autowire} from '@/scaffold/support/inversify';
import {Beans} from '@/scaffold/core/beans';
import {API} from '@/app/api/v1/api';
import {permissions} from '@/app/api/v1/path';

@Bean()
export class JWTEndpoint extends AbstractJWTEndpoint {
  @Autowire(Beans.API)
  private api!: API;

  public async authenticate(secret: JWTSecretInterface): Promise<JWTUserInterface> {
    return new JWTUser({secret, endpoint: this});
  }

  public async renew(user: JWTUserInterface): Promise<void> {
    return;
  }

  public async authorize(user: JWTUserInterface, permission: string): Promise<boolean> {
    const res = await this.api.permissions()(permissions);
    const len = res.data.data.rules
      .filter((rule: any) => {
        return rule.role === 'admin';
      })
      .filter((rule: any) => {
        const len = rule.policies
          .filter((policy: any) => policy.perm === permission && policy.granted)
          .length;
        return len > 0;
      })
      .length;
    return len > 0;
  }
}
