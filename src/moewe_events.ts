import { moewe } from "./moewe_base";

type _EventData = { [key: string]: any };

/**
 * this class allows you to send events to the moewe server
 */
export class MoeweEvents {
  constructor() {}

  appOpen = (data: _EventData): void => moewe().event("app_open", data);

  // ======== AUTHENTICATION ========

  login = (method: string, data: _EventData): void =>
    moewe().event("auth_login", { ...(data ?? {}), method: method });
  logout = (data: _EventData): void => moewe().event("auth_logout", data);
  createAccount = (method: string, data: _EventData): void =>
    moewe().event("auth_account_create", { ...(data ?? {}), method: method });
  passwordReset = (method: string, data: _EventData): void =>
    moewe().event("auth_password_reset", { ...(data ?? {}), method: method });
  passwordChange = (method: string, data: _EventData): void =>
    moewe().event("auth_password_change", { ...(data ?? {}), method: method });
  accountDelete = (method: string, data: _EventData): void =>
    moewe().event("auth_account_delete", { ...(data ?? {}), method: method });

  // ======== CONTENT ========

  search = (query: string, data: _EventData): void =>
    moewe().event("search", { ...(data ?? {}), query: query });

  // ======== PURCHASES ========

  purchase = (itemId: string, price: string, data: _EventData): void =>
    moewe().event("purchase", {
      ...(data ?? {}),
      item_id: itemId,
      price: price,
    });

  // ======== GAME ========

  tutorialStart = (data: _EventData): void =>
    moewe().event("tutorial_start", data);
  levelStart = (levelId: string, data: _EventData): void =>
    moewe().event("level_start", { ...(data ?? {}), level_id: levelId });
  levelComplete = (levelId: string, data: _EventData): void =>
    moewe().event("level_complete", { ...(data ?? {}), level_id: levelId });
  levelFailed = (levelId: string, data: _EventData): void =>
    moewe().event("level_failed", { ...(data ?? {}), level_id: levelId });
  achievement = (achivementId: string, data: _EventData): void =>
    moewe().event("achievement", {
      ...(data ?? {}),
      achievement_id: achivementId,
    });

  // ======== SOCIAL ========

  share = (item: string, method: string, data: _EventData): void =>
    moewe().event("share", { ...(data ?? {}), item: item, method: method });
  invite = (method: string, data: _EventData): void =>
    moewe().event("invite", data);
  rate = (item: string, rating: number, data: _EventData): void =>
    moewe().event("rating", { ...(data ?? {}), item: item, rating: rating });
}
