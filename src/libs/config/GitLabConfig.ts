import {Log} from '@typexs/base';

/**
 * GitLab config
 */
export interface GitLabConfig {
  /**
   * Default assignee for issues
   */
  defaultAssignee: string;
  /**
   * Default project ID for issues
   */
  defaultProjectId: number;
  /**
   * Private token
   */
  privateToken: string;
  /**
   * Root URL of API
   */
  rootUrl: string;
}

/**
 * Whether or not something has defaultAssignee
 *
 * @param something Something
 */
function hasDefaultAssignee(something: object): something is { defaultAssignee: unknown } {
  return 'defaultAssignee' in something;
}

/**
 * Whether or not something has defaultProjectId
 *
 * @param something Something
 */
function hasDefaultProjectId(something: object): something is { defaultProjectId: unknown } {
  return 'defaultProjectId' in something;
}

/**
 * Whether or not something has rootUrl
 *
 * @param something Something
 */
function hasRootUrl(something: object): something is { rootUrl: unknown } {
  return 'rootUrl' in something;
}

/**
 * Whether or not something has privateToken
 *
 * @param something Something
 */
function hasPrivateToken(something: object): something is { privateToken: unknown } {
  return 'privateToken' in something;
}

/**
 * Whether or not something unknown is a GitLabConfig
 *
 * @param something Something unknown
 */
export function isGitLabConfig(something: unknown): something is GitLabConfig {
  if (typeof something !== 'object' || something === null) {
    Log.error(`GitLab config is not an object.`);
    return false;
  }

  if (!hasDefaultAssignee(something) || typeof something.defaultAssignee !== 'string') {
    Log.error(`GitLab config misses defaultAssignee.`);
    return false;
  }

  if (!hasDefaultProjectId(something) || typeof something.defaultProjectId !== 'number') {
    Log.error(`GitLab config misses defaultProjectId.`);
    return false;
  }

  if (!hasRootUrl(something) || typeof something.rootUrl !== 'string') {
    Log.error(`GitLab config misses rootUrl.`);
    return false;
  }

  if (!hasPrivateToken(something) || typeof something.privateToken !== 'string') {
    Log.error(`GitLab config misses privateToken.`);
    return false;
  }

  return true;
}
