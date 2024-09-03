import type { AppConfig } from "./models";
import { moewe } from "./moewe_base";

/**
 * this class allows you to access the app config and react to flags
 */
export class MoeweConfig {
  private _config: AppConfig | null = null;

  constructor() {
    this._flag = this._flag.bind(this);
  }

  /**
   * checks if the current version is the latest version of the app
   * @returns true if the current version is the latest version of the app
   */
  public isLatestVersion(): boolean | null {
    const vStr = this.flagString("version")?.split("+");
    if (vStr == null || vStr.length < 1) return null;
    const v = parseInt(vStr[vStr.length]);
    return v == null ? null : v <= moewe().buildNumber;
  }

  /**
   * @returns the name of the app
   */
  public appName = (): string | null => this._config?.name ?? null;

  /**
   * use the flag API to get the value of a key as an integer
   * @param key  the key to get the value of
   * @returns the value of the key given key as an integer
   */
  public flagInt = (key: string) => this._flag<number>(key);

  /**
   * use the flag API to get the value of a key as a string
   * @param key  the key to get the value of
   * @returns the value of the key given key as a string
   */
  public flagString = (key: string) => this._flag<string>(key);

  /**
   * use the flag API to get the value of a key as a boolean
   * @param key  the key to get the value of
   * @returns the value of the key given key as a boolean
   */
  public flagBool = (key: string) => this._flag<boolean>(key);

  /**
   * initializes the config
   * this method should be called before using any other methods
   * if [timeout] is true, the method will timeout after 1 second
   * and return null. this is so that the app does not hang if the
   * server is not reachable. You can override this by setting
   * [timeout] to false
   */
  async init({ timeout = true }) {
    try {
      this._config = timeout
        ? (await _timeLimited(1000, moewe()._getAppConfig())) ?? null
        : await moewe()._getAppConfig();
    } catch (e) {
      console.log(
        "[MOEWE] Could not fetch app config. \n" +
          "if this is a timeout, you can disable it by calling `init(timeout: false)`"
      );
    }
  }

  private _flag<T extends number | boolean | string>(key: string): T | null {
    try {
      return (this._config?.config[key] ?? null) as any as T | null;
    } catch (e) {
      console.log("[MOEWE] Could not get flag " + key);
      return null;
    }
  }
}

function _timeLimited<T>(
  ms: number,
  promise: Promise<T>,
  timeoutError = new Error("Promise timed out")
): Promise<T> {
  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });

  // returns a race between timeout and the passed promise
  return Promise.race<T>([promise, timeout]);
}
