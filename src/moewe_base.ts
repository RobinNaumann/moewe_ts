import type { AppConfig } from "./models";
import { MoeweConfig } from "./moewe_config";
import { MoeweEvents } from "./moewe_events";
import { MoeweLogger } from "./moewe_logger";

export interface MoeweParams {
  host: string;
  port?: number;
  project: string;
  app: string;
  appVersion?: string;
  buildNumber?: number;
  deviceModel?: string;
}

/**
 * the entry point for moewe
 * @param host the host of the moewe server
 * @param port the port of the moewe server. defaults to 80
 * @param project the project id
 * @param app the app id
 * @param appVersion the version of the app
 * @param buildNumber the build number of the app
 * @param deviceModel the model of the device
 */
export class Moewe {
  private static _i: Moewe | null = null;
  public readonly config: MoeweConfig = new MoeweConfig();
  public readonly log: MoeweLogger = new MoeweLogger();
  public readonly events: MoeweEvents = new MoeweEvents();

  public readonly host: string;
  public readonly port: number;
  public readonly project: string;
  public readonly app: string;
  public readonly appVersion: string;
  public readonly buildNumber: number;
  public readonly deviceModel: string | null;

  constructor({
    host,
    port = 80,
    project,
    app,
    appVersion = "1.0.0",
    buildNumber = 1,
    deviceModel,
  }: MoeweParams) {
    this.host = host;
    this.port = port;
    this.project = project;
    this.app = app;
    this.appVersion = appVersion;
    this.buildNumber = buildNumber;
    this.deviceModel = deviceModel ?? null;

    Moewe._i = this;
  }

  static get i(): Moewe {
    if (Moewe._i === null) {
      throw new Error("Moewe not initialized");
    }
    return Moewe._i;
  }

  crashHandlerInit() {
    console.log(
      "[MOEWE] automatic crash handling for js/ts not implemented yet"
    );
  }

  async init({ timeout = true }: { timeout?: boolean }): Promise<void> {
    try {
      await this.config.init({ timeout: timeout });
      this.crashHandlerInit();
    } catch (e) {
      console.log("[MOEWE] error while running init");
    }
  }

  /**
   * send an event to the moewe server
   * @param key the key of the event. this is used to group events
   * @param data the payload of the event
   */
  event(key: string, data: Record<string, any> = {}): void {
    this.push("event", key, data);
  }

  /**
   * send a crash event to the moewe server
   * @param error the error that caused the crash
   * @param stackTrace the stack trace of the crash
   */
  crash(error: any, stackTrace?: string): void {
    const data = {
      error: error.toString(),
      stack_trace: stackTrace?.toString(),
    };
    this.push("crash", "crash", data);
  }

  /**
   * send a feedback event to the moewe server
   * @param title the title of the feedback
   * @param message the message of the feedback
   * @param type the type of the feedback
   * @param contact the contact information of the user
   */
  feedback(title: string, message: string, type: string, contact?: string) {
    const data = { title: title, message: message, contact: contact };
    this._send("feedback", type, data);
  }

  /** @internal */
  async _getAppConfig(): Promise<AppConfig | null> {
    try {
      const url = `https://${this.host}:${this.port}/api/use/${this.project}/${this.app}/config`;
      const response = await fetch(url);

      if (response.status != 200) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      return { id: data["id"], name: data["name"], config: data["config"] };
    } catch (e) {
      console.log("[moewe] failed to get app config: $e");
      return null;
    }
  }

  private async _send(
    type: string,
    key: string,
    data: Record<string, any>
  ): Promise<void> {
    try {
      const event = { type, key, data };

      const url = `https://${this.host}:${this.port}/api/use/${this.project}/${this.app}/log`;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify(event);
      const response = await fetch(url, { method: "POST", headers, body });

      if (response.status != 200) {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (e) {
      throw new Error(`[moewe] failed to send event`);
    }
  }

  /**
   * send an event to the moewe server without response handling
   * @param type the type of the event
   * @param key the key of the event
   * @param data the data of the event
   * @internal
   */
  async push(type: string, key: string, data: Record<string, any>) {
    try {
      await this._send(type, key, data);
    } catch (e) {
      console.log(`[moewe] failed to push event: ${e}`);
    }
  }
}

/**
 * a quality of life wrapper for `Moewe.i`
 * @returns the Moewe instance
 */
export const moewe = () => Moewe.i;
