import {Event} from "commons-eventbus/browser";

@Event()
export class GitlabIssueEvent {

  operation: 'create';

  label: string;

}
