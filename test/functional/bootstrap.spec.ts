import * as _ from 'lodash';
import {suite, test} from "mocha-typescript";
import {expect} from "chai";
import {TEST_STORAGE_OPTIONS} from "./config";
import {Bootstrap, Config} from "@typexs/base";


let bootstrap: Bootstrap = null;

@suite('functional/cache/cache_redis')
class Cache_redisSpec {


  static async before() {
    Bootstrap.reset();
    Config.clear();

    bootstrap = Bootstrap
      .setConfigSources([{type: 'system'}])
      .configure({
        app: {name: 'test'},
        logging:{level:'debug',enable:true},
        storage: {default: TEST_STORAGE_OPTIONS},
      });
    bootstrap.activateLogger();
    bootstrap.activateErrorHandling();
    await bootstrap.prepareRuntime();
    bootstrap = await bootstrap.activateStorage();
    bootstrap = await bootstrap.startup();
  }

  static async after() {
    bootstrap ? await bootstrap.shutdown() : null;
  }


  @test
  async 'hallo welt'() {
    console.log('do something here')
  }

}

