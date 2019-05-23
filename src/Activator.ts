import {IActivator,Config} from "@typexs/base";
import {GitlabEventDispatcher} from "./libs/events/GitlabEventDispatcher";
import {EventBus} from "commons-eventbus";

export class Activator implements IActivator{

  async startup() {

    if(Config.get('gitlab.enable',false)){
      let x = new GitlabEventDispatcher();
      await EventBus.register(x);
    }
  }

}
