import {Api} from '@openstapps/gitlab-api';
import {Log} from '@typexs/base';
import {subscribe} from "commons-eventbus";
import {GitLabConfig, isGitLabConfig} from '../config/GitLabConfig';
import {GitLabIssueEvent} from "./GitLabIssueEvent";

/**
 * A GitLab event dispatcher
 */
export class GitLabEventDispatcher {
  private readonly api: Api;
  private readonly config: GitLabConfig;

  /**
   * Create a new GitLab event dispatcher
   *
   * @param config Something like a GitLab config
   */
  constructor(config: unknown) {
    if (!isGitLabConfig(config)) {
      throw new Error(`GitLab config is invalid!`);
    }

    this.config = config;

    this.api = new Api(config.rootUrl, config.privateToken);
  }

  @subscribe(GitLabIssueEvent)
  async onIssueEvent(event: GitLabIssueEvent) {
    Log.info('Handling new GitLab issue event.');

    if (typeof event.assignee == 'undefined') {
      delete event.assignee;
    }

    if (typeof event.projectId == 'undefined') {
      delete event.projectId;
    }

    // override defaults with data from event
    const data = {
      ...{
        assignee: this.config.defaultAssignee,
        projectId: this.config.defaultProjectId,
      },
      ...event,
    };

    // set description
    let description = data.description;

    // add labels
    if (Array.isArray(data.labels) && data.labels.length > 0) {
      description += `\n\n/label `;
      description += data.labels.map((label) => `~"${label}"`).join(' ');
    }

    // add assignee
    if (typeof data.assignee === 'string') {
      description += `\n\n/assign @${data.assignee}`;
    }

    Log.info(typeof data.projectId, data.projectId, data.title, description);

    // create issue
    const response = await this.api.createIssue(
      data.projectId,
      data.title,
      description,
    );

    Log.info(response);
  }
}
