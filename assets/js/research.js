/* Deterministic teaching illustrations. These do not run a model or reproduce a training experiment. */
(() => {
  "use strict";
  const modes = document.querySelector("[data-mode-illustration]");
  if (modes) {
    let concentrated = true;
    const draws = modes.querySelector("input");
    const buttons = modes.querySelectorAll("button");
    const bars = modes.querySelectorAll(".research-bar");
    const output = modes.querySelector("output");
    const render = () => {
      const n = Number(draws.value);
      const p = concentrated ? [0.97, 0.006, 0.006, 0.006, 0.006, 0.006] : Array(6).fill(1 / 6);
      const distinct = p.reduce((sum, probability) => sum + 1 - (1 - 0.9 * probability) ** n, 0);
      bars.forEach((bar, i) => {
        bar.style.height = `${p[i] * 100}%`;
        bar.querySelector("span").textContent = `${String.fromCharCode(65 + i)}: ${(p[i] * 100).toFixed(1)}%`;
      });
      buttons.forEach((button) => button.setAttribute("aria-pressed", String((button.dataset.distribution === "concentrated") === concentrated)));
      modes.querySelector("[data-draw-count]").textContent = n;
      output.textContent = `${n} attempts: ${distinct.toFixed(2)} expected distinct correct modes. Expected correct answers: ${(0.9 * n).toFixed(
        1
      )}. Accuracy stays at 90% in both toy distributions.`;
    };
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        concentrated = button.dataset.distribution === "concentrated";
        render();
      })
    );
    draws.addEventListener("input", render);
    render();
  }
  const policies = document.querySelector("[data-policy-illustration]");
  if (policies) {
    const slider = policies.querySelector("input");
    const output = policies.querySelector("output");
    const render = () => {
      const weight = Number(slider.value) / 100;
      const a = 0.9 * (1 - weight) + 0.5 * weight;
      const b = 0.1 * (1 - weight) + 0.5 * weight;
      const kl = a * Math.log(a / b) + (1 - a) * Math.log((1 - a) / (1 - b));
      output.textContent = `Action A: run 1 ${(100 * a).toFixed(0)}%, run 2 ${(100 * b).toFixed(0)}%. KL(run 1 ‖ run 2): ${Math.max(0, kl).toFixed(
        3
      )} nats. Shared-prior weight: ${slider.value}%.`;
    };
    slider.addEventListener("input", render);
    render();
  }
})();
