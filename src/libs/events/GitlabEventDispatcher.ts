import {GitlabIssueEvent} from "./GitlabIssueEvent";
import {subscribe} from "commons-eventbus";


export class GitlabEventDispatcher {



  @subscribe(GitlabIssueEvent)
  onIssueEvent(evetn:GitlabIssueEvent){


  }
}
