import {Config, IActivator} from "@typexs/base";
import {EventBus} from "commons-eventbus";
import {GitLabEventDispatcher} from "./libs/events/GitLabEventDispatcher";

export class Activator implements IActivator {
  async startup() {
    if (Config.get('gitlab', null) !== null) {
      await EventBus.register(new GitLabEventDispatcher(Config.get('gitlab')));
    }
  }
}
