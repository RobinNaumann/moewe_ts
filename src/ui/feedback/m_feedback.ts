export interface FeedbackViewType {
  key: string;
  name: string;
}

export const defaultFeedbackTypes = [
  { key: "issue", name: "Issue" },
  { key: "feature", name: "Feature Request" },
  { key: "question", name: "Question" },
];

export interface FeedbackViewLabels {
  title: string;
  description: string;
  hintTitle: string;
  hintMessage: string;
  descriptionContact: string | null;
  hintContact: string | null;
  submit: string;
  msgSent: string;
  msgError: string;
}

export const defaultFeedbackLabels = {
  title: "Feedback",
  description: "Thank you for helping us improve!",
  hintTitle: "title",
  hintMessage: "message",
  descriptionContact:
    "If you want us to contact you, please leave your email or social media handle.",
  hintContact: "contact",
  submit: "submit",
  msgSent: "Feedback sent!\nThank you",
  msgError: "could not send",
};

export interface FeedbackViewTheme {
  borderRadius: string;
  colorAccent: string;
  colorOnAccent: string;
  darkMode: boolean;
}

export const defaultFeedbackTheme = {
  borderRadius: "0.5rem",
  colorAccent: "#2b4785",
  colorOnAccent: "#fff",
  darkMode: false,
};
