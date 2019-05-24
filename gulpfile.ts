import * as glob from "glob";
import * as _ from "lodash";


_.concat(
  glob.sync('node_modules/@typexs/base/gulp/*.js'),
  glob.sync('src/gulp/*'),
  glob.sync('gulp/*'),
).filter(x => !/@types\//.test(x))
  .map(x => require('./' + x));

