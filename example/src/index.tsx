import { Moewe, showFeedbackDialog } from "moewe";
import { render } from "preact";
import "./style.css";

export function App() {
  return (
    <div>
      <h1>mœwe web example</h1>
      <section>
        <button
          class="resource"
          onClick={() => {
            console.log("show feedback dialog");
            showFeedbackDialog({
              theme: {
                darkMode: false,
              },
            });
          }}
        >
          <h2>{"send feedback"}</h2>
          <p>{"open the feedback dialog"}</p>
        </button>
      </section>
    </div>
  );
}

new Moewe({
  host: "open.moewe.app",
  project: "112dfa10cc07b914",
  app: "713e8fdfd5408192",
});

/*moewe().events.appOpen({});
moewe().log.error("error message");
moewe().crash("crash message");

moewe().config.flagBool("flagBoolean");*/

render(<App />, document.getElementById("app"));
