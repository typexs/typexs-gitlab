import {Event} from 'commons-eventbus';

@Event()
export class GitLabIssueEvent {
  /**
   * Create a new GitLab issue event/create a new issue
   *
   * @param title Title for the issue
   * @param description Description for the issue
   * @param labels Labels for the issue
   * @param assignee Assignee for the issue, overrides default
   * @param projectId Project ID for the issue, overrides default
   */
  constructor(public title: string,
              public description: string,
              public labels: string[],
              public assignee?: string,
              public projectId?: number) {
  }
}
