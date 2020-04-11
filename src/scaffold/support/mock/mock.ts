import Mock, {MockjsSetupSettings} from 'mockjs';

export function setupMock(options: MockjsSetupSettings) {
  Mock.setup(options);
}
