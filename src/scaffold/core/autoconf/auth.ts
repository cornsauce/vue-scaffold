import {Configurator} from '@/scaffold/core/application';
import {BeanConstant} from '@/scaffold/core/constant';
import {JWTManager} from '@/scaffold/support/auth/jwt';

export function configureAuth(rootConfig: App.Config): Configurator {
  return (app) => {
    if (rootConfig.auth.enabled) {
      if (rootConfig.auth.driver === 'jwt') {
        const jwtEndpoint = app.getContainer().resolve(rootConfig.auth.endpoint);
        const jwtManager = new JWTManager({
          endpoint: jwtEndpoint,
          guest: rootConfig.auth.guest,
        });

        app.registerBean(BeanConstant.AUTH_MANAGER, jwtManager);
      } else {
        throw new Error(`unsupported auth driver '${rootConfig.auth.driver}'`);
      }
    }

    return () => () => {
    };
  };
}
