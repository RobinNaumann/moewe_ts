import { moewe } from "./moewe_base";

/**
 * A logger for the moewe library
 */
export class MoeweLogger {
  constructor() {
    this._log = this._log.bind(this);
  }

  /**
   * logs a debug message to the server and prints it to the console
   * @param msg the message to log
   */
  public debug = (msg: string): void => this._log("debug", msg);

  /**
   * logs an info message to the server and prints it to the console
   * @param msg the message to log
   */
  public info = (msg: string): void => this._log("info", msg);

  /**
   * logs a warning message to the server and prints it to the console
   * @param msg the message to log
   */
  public warn = (msg: string): void => this._log("warn", msg);

  /**
   * logs an error message to the server and prints it to the console
   * @param msg the message to log
   */
  public error = (msg: string): void => this._log("error", msg);

  /**
   * logs an unknown message to the server and prints it to the console
   * @param msg the message to log
   */
  public unknown = (msg: string): void => this._log("unknown", msg);

  private _log(lvl: string, msg: string): void {
    console.log(`[MOEWE] LOG: ${lvl}: ${msg}`);
    moewe().push("log", lvl, { msg: msg });
  }
}
