import { moewe, Moewe, showFeedbackDialog } from "moewe";
import { render } from "preact";
import React from "preact/compat";
import { useState } from "preact/hooks";
import "./style.css";

export function App() {
  return (
    <div>
      <h1>
        mœwe<sup style="font-size: .8rem">typescript</sup> example
      </h1>
      <p>
        This is an example of how to use the mœwe library in a preact project.
      </p>
      <p>
        online feature flag 'fav_food' ={" "}
        {moewe().config.flagString("fav_food") ?? "-"}
      </p>
      <section>
        <_ErrorBoundary>
          <_EventBtn />
          <_CrashView />
          <_FeedbackBtn />
        </_ErrorBoundary>
      </section>
    </div>
  );
}

function _FeedbackBtn() {
  return (
    <button
      class="resource"
      onClick={() => {
        showFeedbackDialog({});
      }}
    >
      <h2>{"send feedback"}</h2>
      <p>{"open the feedback dialog"}</p>
    </button>
  );
}

function _EventBtn() {
  const [count, setCount] = useState(0);

  return (
    <button
      class="resource"
      onClick={() => {
        setCount(count + 1);
        moewe().event("plus", { count });
      }}
    >
      <h2>log 'plus' event</h2>
      <p>{`value = ${count}`}</p>
    </button>
  );
}

function _CrashView() {
  const [invalid, setInvalid] = useState(false);
  if (invalid) throw "example error";
  return (
    <button class="resource" onClick={() => setInvalid(true)}>
      <h2>log crash</h2>
      <p>cause and catch error"</p>
    </button>
  );
}

class _ErrorBoundary extends React.Component<{ children: any }, any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any) {
    moewe().crash(error);
    this.setState({ hasError: true });
  }
  render() {
    return this.state.hasError ? (
      <span>
        🔥 an error was logged. <br />
        (Do handling here)
      </span>
    ) : (
      this.props.children
    );
  }
}

await new Moewe({
  host: "open.moewe.app",
  project: "112dfa10cc07b914",
  app: "713e8fdfd5408192",
}).init();

moewe().events.appOpen({});

render(<App />, document.getElementById("app"));
