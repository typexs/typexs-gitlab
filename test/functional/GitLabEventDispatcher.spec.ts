import {Bootstrap, Config} from "@typexs/base";
import {expect} from "chai";
import {EventBus} from 'commons-eventbus';
import {suite, test} from "mocha-typescript";
import * as nock from 'nock';
import {GitLabEventDispatcher} from '../../src/libs/events/GitLabEventDispatcher';
import {GitLabIssueEvent} from '../../src/libs/events/GitLabIssueEvent';
import {TEST_STORAGE_OPTIONS} from "./config";

let bootstrap: Bootstrap = null;

@suite('functional/GitLabEventDispatcher')
class GitLabEventDispatcherSpec {
  async before() {
    Bootstrap.reset();
    Config.clear();
  }

  @test
  'invalid config'() {
    expect(() => {
      return new GitLabEventDispatcher(null);
    }).to.throw();

    expect(() => {
      return new GitLabEventDispatcher({});
    }).to.throw();

    expect(() => {
      return new GitLabEventDispatcher({defaultAssignee: 'foo'});
    }).to.throw();

    expect(() => {
      return new GitLabEventDispatcher({defaultAssignee: 'foo', defaultProjectId: 1});
    }).to.throw();

    expect(() => {
      return new GitLabEventDispatcher({defaultAssignee: 'foo', defaultProjectId: 1, rootUrl: 'http://foo.bar/'});
    }).to.throw();
  }

  @test
  async 'create issue test'() {
    bootstrap = Bootstrap
      .setConfigSources([{type: 'system'}])
      .configure({
        app: {name: 'test'},
        logging: {level: 'debug', enable: true},
        storage: {default: TEST_STORAGE_OPTIONS},
        gitlab: {
          defaultAssignee: 'foo',
          defaultProjectId: 1,
          privateToken: 'fooBar',
          rootUrl: 'http://foo.bar/',
        }
      });

    bootstrap.activateLogger();
    bootstrap.activateErrorHandling();

    await bootstrap.prepareRuntime();
    await bootstrap.activateStorage();
    await bootstrap.startup();

    const event = new GitLabIssueEvent('Lorem ipsum', '... dominum', ['bug']);

    nock(/.*/)
      .post(/.*/)
      .reply(200, {});

    await EventBus.post(event);

    await bootstrap.shutdown();
  }
}

