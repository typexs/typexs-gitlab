import {IBootstrap} from '@typexs/base';
import {Config} from 'commons-config';
import {GitLabEventDispatcher} from './libs/events/GitLabEventDispatcher';
import {EventBus} from 'commons-eventbus';

export class Startup implements IBootstrap {
  async bootstrap() {
    if (Config.get('gitlab', null) !== null) {
      const dispatcher = new GitLabEventDispatcher(Config.get('gitlab'));
      await EventBus.register(dispatcher);
    }
  }
}
