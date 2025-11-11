import { decode } from './decoder.ts';

function setListeners(input: HTMLInputElement, output: HTMLElement) {
  input.addEventListener("input", () => {
    output.innerText = decode(input.value);
  });
}

function setup() {
  const input = document.getElementById("wordle-input");
  if (!input || !(input instanceof HTMLInputElement)) {
    return;
  }
  const output = document.getElementById("results-text");
  if (!output) {
    return;
  }
  setListeners(input, output);
}

setup();
