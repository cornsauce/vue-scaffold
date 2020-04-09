import Mock, {MockjsSetupSettings} from 'mockjs';

function enableMock(options: MockjsSetupSettings) {
  Mock.setup(options);
}
