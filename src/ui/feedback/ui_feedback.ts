import { h, render } from "../plain_ui";
import { feedbackCSS } from "./d_feedback_css";
import {
  defaultFeedbackLabels,
  defaultFeedbackTheme,
  defaultFeedbackTypes,
  type FeedbackViewLabels,
  type FeedbackViewTheme,
  type FeedbackViewType,
} from "./m_feedback";

export function showFeedbackDialog({
  types,
  labels,
  theme,
}: {
  types?: FeedbackViewType[];
  labels?: Partial<FeedbackViewLabels>;
  theme?: Partial<FeedbackViewTheme>;
}) {
  types = types ?? defaultFeedbackTypes;
  labels = { ...defaultFeedbackLabels, ...(labels ?? {}) };
  theme = { ...defaultFeedbackTheme, ...(theme ?? {}) };

  const colorBack = theme.darkMode ? "#000" : "#fff";
  const colorOnBack = theme.darkMode ? "#fff" : "#000";
  const colorBorder = theme.darkMode ? "#222" : "#ddd";

  let close: any = () => {};

  close = render<{ phase: "edit" | "sent" | "error"; value: any }>(
    "body",
    {
      phase: "edit",
      value: {
        title: "",
        type: types?.length > 0 ? types[0].key : "",
        message: "",
        contact: "",
      },
    },
    (s, set) => {
      console.log(s.value);
      const valid = () =>
        s.value.title.length > 0 && s.value.message.length > 0;

      return h(
        "div",
        { class: "moewe" },
        h(
          "style",
          null,
          `:root {
	--moewe-g-radius: ${theme.borderRadius};
	--moewe-c-accent: ${theme.colorAccent};
  --moewe-c-on-accent: ${theme.colorOnAccent};
  --moewe-c-background: ${colorBack};
  --moewe-c-on-background: ${colorOnBack};
  --moewe-c-border: ${colorBorder};
}
${feedbackCSS}`
        ),
        h(
          "dialog",
          { open: true, class: "card column cross-stretch" },
          h(
            "div",
            { class: "row cross-center main-space-between" },
            h("span", { class: "b text-l" }, labels.title!),
            h(
              "button",
              {
                class: "close-btn",
                onClick: () => close(),
              },
              "×"
            )
          ),
          ["edit"].includes(s.phase) &&
            h(
              "div",
              {
                class: "column cross-stretch",
              },

              h("div", {}, labels.description!),
              h("input", {
                style: "width: 100%;",
                type: "text",
                placeholder: labels.hintTitle,
                value: s.value.title,
                onInput: (v: any) =>
                  set({ ...s, value: { ...s.value, title: v } }),
              }),
              types.length > 0 &&
                h(
                  "select",
                  {
                    value: s.value.type,
                    onInput: (v: any) =>
                      set({ ...s, value: { ...s.value, type: v } }),
                  },
                  ...types.map((t) => h("option", { value: t.key }, t.name))
                ),
              h("textarea", {
                rows: 4,
                type: "text",
                placeholder: labels.hintMessage,
                value: s.value.message,
                onInput: (v: any) => {
                  console.log(s);
                  set({ ...s, value: { ...s.value, message: v } });
                },
              }),

              h("div", { style: "height: 1rem;" }),

              labels.descriptionContact! &&
                h("div", {}, labels.descriptionContact!),
              labels.hintContact! &&
                h("input", {
                  style: `width: 100%;`,
                  type: "text",
                  placeholder: labels.hintContact,
                  value: s.value.contact,
                  onInput: (v: any) =>
                    set({ ...s, value: { ...s.value, contact: v } }),
                }),
              h(
                "button",
                {
                  class: "submit-btn",
                  style: ` ${
                    valid() ? "" : "filter: grayscale(1); opacity: 0.8;"
                  } `,
                  onClick: () => {
                    console.log("submit");
                    if (!valid()) return;
                    set({ ...s, phase: "sent" });
                  },
                },
                "submit"
              )
            ),
          ["sent", "error"].includes(s.phase) &&
            h(
              "div",
              {
                class: "column  cross-center",
                style: "padding: 3rem; white-space: pre-wrap;",
              },
              h(
                "span",
                { class: "b text-l", style: " text-align: center;" },
                s.phase === "sent" ? labels.msgSent! : labels.msgError!
              )
            )
        )
      );
    }
  );
}
