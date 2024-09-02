export const feedbackCSS = `
.moewe *,
.moewe *:before,
.moewe *:after {
	box-sizing: inherit;
	font-family: inherit;
	font-weight: inherit;

	box-sizing: border-box;
	border-collapse: separate;
  font-size: 1rem;
  text-align: start;
}

.moewe .card {
  padding: 1rem;
  border-width: 2px;
  border-style: solid;
  border-color: var(--moewe-c-border);
  border-radius: var(--moewe-g-radius);
  background-color: var(--moewe-c-background);
  color: var(--moewe-c-on-background);
}

.moewe .column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.moewe .row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.moewe .cross-stretch {
  align-items: stretch;
}

.moewe .cross-center {
  align-items: center;
}

.moewe .main-space-between {
  justify-content: space-between;
}


.moewe input[type="text"],
.moewe input[type="password"],
.moewe input[type="email"],
.moewe input[type="number"],
.moewe textarea {
  // card
  padding: 1rem;
  border-width: 2px;
  border-style: solid;
  border-color: var(--moewe-c-border);
  border-radius: var(--moewe-g-radius);
  background-color: var(--moewe-c-background);
  color: var(--moewe-c-on-background);

  padding: 0 0.75rem;
  height: 3rem;
  min-width: 3rem;
  width: 100%;
}

.moewe select {
  // card
  padding: 1rem;
  border-width: 2px;
  border-style: solid;
  border-color: var(--moewe-c-border);
  border-radius: var(--moewe-g-radius);
  background-color: var(--moewe-c-background);
  color: var(--moewe-c-on-background);

  padding: 0 0.75rem;
  height: 3rem;
  min-width: 3rem;
}

.moewe textarea {
    padding: 0.75rem;
    height: 6rem;
    width: 100% !important;
    min-height: 3rem;
}

.moewe .b{
  font-weight: bold;
}

.moewe .text-l{
  font-size: 1.3rem;
}

.moewe .submit-btn{
  padding: 1rem;
  border-width: 0;
  border-radius: var(--moewe-g-radius);
  background-color: var(--moewe-c-accent);
  color: var(--moewe-c-on-accent);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.moewe .close-btn{
  height: 3rem;
  width: 3rem;
  border-width: 0;
  border-radius: var(--moewe-g-radius);
  background-color: var(--moewe-c-background);
  color: var(--moewe-c-accent);
  cursor: pointer;
  text-align: center;
  font-size: 2rem;
}

.moewe dialog {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width:  min(95%, 30rem);
  max-height: 95vh;
  overflow-y: auto;

  box-shadow: 1px 6px 50px 19px rgba(0,0,0,0.33);
}

::backdrop {
  background-image: linear-gradient(
    45deg,
    magenta,
    rebeccapurple,
    dodgerblue,
    green
  );
  opacity: 0.75;
}
`;
