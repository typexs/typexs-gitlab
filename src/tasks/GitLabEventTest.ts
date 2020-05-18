import {ITask, TaskRuntime, ITaskRuntimeContainer} from '@typexs/base';
import {GitLabIssueEvent} from "../libs/events/GitLabIssueEvent";
import {EventBus} from "commons-eventbus";

export class GitLabEventTest implements ITask {
  @TaskRuntime()
  runtime: ITaskRuntimeContainer;

  async exec() {
    const logger = this.runtime.logger();

    const event = new GitLabIssueEvent(
      `Event test`,
      (new Date()).toISOString(),
      ['bug'],
    );

    logger.debug(`Posting event...`);
    await EventBus.postAndForget(event);
  }
}
