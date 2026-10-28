---
layout: research
research_id: behavior-consistent-rl
permalink: /research/behavior-consistent-rl/
title: Behavior-Consistent Deep Reinforcement Learning
description: Why similar RL returns can hide different behavior across training runs, how QED uses critic disagreement, and the measured consistency–performance tradeoff.
og_image: /assets/img/publication_preview/behavior-consistent-rl.png
sections:
  - id: question
    label: The question
  - id: entropy
    label: The intuition
  - id: qed
    label: How QED works
  - id: results
    label: Results and tradeoffs
  - id: use
    label: When it is useful
  - id: limitations
    label: Limitations
---

<h2 id="question">Two successful agents can still behave differently</h2>

Train the same reinforcement learning algorithm several times with different random seeds. Even when the resulting policies earn similar rewards, they can choose different actions and produce different trajectories. Return alone does not describe how reproducible their behavior is.

{% include research_figure.liquid
  image="/assets/research/behavior/paper-01-rollouts.png"
  width="1884"
  height="704"
  title="Same task, different movements"
  alt="Three cheetah_run rollouts with standard entropy tuning vary in posture and trajectory; the QED rollouts have more similar movements."
  caption="Compare the three rows within each panel. Standard entropy tuning is on the left; QED is on the right. Blue indicates lower mean pairwise distance between state vectors at that timestep, and red indicates higher distance. These are recorded policy rollouts."
  source="https://arxiv.org/html/2605.21214v3#S1.F1"
  number="1"
%}

_Behavior-Consistent Deep Reinforcement Learning_ formalizes a complementary objective: learn policies that perform well **and** have similar behavior distributions across independent training runs.

A policy may remain stochastic while satisfying this objective. Consistency across runs is different from demanding a deterministic action sequence within every rollout.

<div class="research-metrics">
  <div class="research-metric"><strong>18 tasks</strong><span>continuous-control tasks in dm_control</span></div>
  <div class="research-metric"><strong>10 seeds</strong><span>independent runs per method in the reported evaluation</span></div>
  <div class="research-metric"><strong>About 100×</strong><span>lower inter-run policy divergence at suitable QED settings, with comparable returns</span></div>
</div>

The last quantity summarizes the paper’s reported two-order-of-magnitude reduction, not a guarantee for every task, temperature, or constraint strength. The [main experiments](https://arxiv.org/html/2605.21214v3#S6) report returns, symmetric KL, uncertainty intervals, and tradeoffs together.

<h2 id="entropy">Why might maximum-entropy RL help?</h2>

Maximum-entropy reinforcement learning balances reward with a preference for broader action distributions. In the paper’s theoretical analysis, this can anchor independently learned Boltzmann policies to a common uniform prior. Increasing temperature can reduce the extent to which differences in learned Q-values produce different action distributions.

For the Boltzmann policies considered in the analysis, choosing temperature in proportion to disagreement between Q-functions bounds pairwise policy KL divergence.

That is an assumption-specific theoretical result. It is not an unconditional guarantee for arbitrary neural policies trained with the practical algorithm.

<section class="research-illustration" data-policy-illustration aria-labelledby="prior-title">
  <h3 id="prior-title">An intuition: bring two action distributions toward a shared prior</h3>
  <p>Start with two toy policies that prefer opposite actions. Increase their mixture weight on the same uniform distribution.</p>
  <label for="prior-weight">Weight on the shared uniform prior</label>
  <input id="prior-weight" type="range" min="0" max="100" value="0">
  <output for="prior-weight" aria-live="polite">At zero shared-prior weight, the toy policies choose action A with probabilities 90% and 10%.</output>
  <small>Conceptual illustration using linear probability mixtures. It is not Boltzmann temperature tuning, a QED implementation, or a model of the observed performance tradeoff. It shows only how the chosen distributions’ KL changes. One-way KL is displayed; the paper evaluates pairwise symmetric KL.</small>
  <noscript><p>As the shared-prior mixture weight reaches 100%, both toy policies become uniform and their KL divergence is zero.</p></noscript>
</section>

See [behavior-consistent RL](https://arxiv.org/html/2605.21214v3#S3) and [high-temperature maximum-entropy RL](https://arxiv.org/html/2605.21214v3#S4) for the formal definitions and assumptions.

<h2 id="qed">What is Q-value Expectile Disagreement?</h2>

**QED** is a practical, state-dependent entropy-temperature schedule. Directly comparing many independently trained policies during each learning run would be costly.

Instead, QED uses disagreement between two critics within a single run as a proxy for uncertainty that can lead to divergence across runs.

The schedule adapts how strongly the algorithm encourages entropy across states. Its expectile-based construction and treatment of off-policy error matter: simply turning up a fixed entropy coefficient can damage learning.

The [algorithm section](https://arxiv.org/html/2605.21214v3#S5) explains the critic-disagreement proxy and why extrapolation outside the replay distribution can become unstable.

<div class="research-flow" aria-label="QED at a conceptual level">
  <div><strong>Estimate disagreement</strong>Use the double critics within a run to obtain a state-dependent uncertainty proxy.</div>
  <div><strong>Adapt temperature</strong>Adjust the entropy schedule while accounting for off-policy estimation error.</div>
  <div><strong>Evaluate both goals</strong>Measure how policies differ across runs and whether they retain useful returns.</div>
</div>

<h2 id="results">What improved, and what are the tradeoffs?</h2>

On the 18-task dm_control suite, applying QED to SAC-LN and MAD-SAC reduced pairwise policy divergence by about two orders of magnitude at appropriate settings while preserving comparable normalized return. The analysis uses independently trained runs and explicitly measures behavioral differences, rather than inferring consistency from reward curves alone.

{% include research_figure.liquid
  image="/assets/research/behavior/paper-03-results.png"
  width="1884"
  height="616"
  title="Measure both return and consistency"
  alt="Normalized return versus pairwise symmetric pre-tanh KL across 18 tasks, plus the width of a bootstrapped return interval."
  caption="In panel (a), lower KL means more similar action distributions across runs; compare returns at the same time. Suitable QED settings reduce KL by about two orders of magnitude with comparable returns. Panel (b) shows 95% bootstrap interval widths for IQM returns, not a direct measure of policy divergence."
  source="https://arxiv.org/html/2605.21214v3#S6.F3"
  number="3"
%}

The consistency–performance tradeoff is important.

Very strong constraints can lower returns and slow learning. The paper reports that behavior depends on the base algorithm and the schedule parameter; settings that work well for MAD-SAC are not automatically appropriate for a less stable learner. Reduced return variance is also algorithm-dependent.

{% include research_figure.liquid
  image="/assets/research/behavior/paper-05-temperature.png"
  width="1396"
  height="552"
  title="Adaptive temperature preserves more performance"
  alt="Return-versus-KL plot comparing fixed entropy coefficients in green with adaptive QED settings in blue."
  caption="The horizontal axis runs from larger KL on the left to smaller KL on the right. In these experiments, adaptive QED retains higher return than fixed-temperature settings at comparable divergence. Stronger constraints can still cost performance."
  source="https://arxiv.org/html/2605.21214v3#S6.F5"
  number="5"
%}

| Quantity                    | What to inspect                                                               |
| --------------------------- | ----------------------------------------------------------------------------- |
| Return                      | Does the agent still solve the control task well?                             |
| Inter-run policy divergence | Do independent training runs produce similar action distributions?            |
| Return variability          | How stable is performance across independent runs?                            |
| Sample efficiency           | How much interaction is needed to reach the desired behavior and performance? |

The [evaluation protocol](https://arxiv.org/html/2605.21214v3#A5) measures policies on each method’s induced states. That choice is part of the interpretation: differences between methods can reflect both policy differences and the states they visit.

<h2 id="use">When is behavioral consistency useful?</h2>

This objective is relevant when repeated training should yield comparable policies, when debugging a change that alters behavior without much change in return, or when deployment decisions depend on how an agent acts rather than only its aggregate score.

Behavioral consistency is a measurement objective, not a general safety certificate.

Two policies can behave similarly while both failing at a task, and diverse strategies may be desirable in other settings. Our [RLVR mode-collapse work]({{ '/research/rlvr-mode-collapse/' | relative_url }}) asks a different question: whether one model retains multiple correct solution modes. Consistency **across training runs** and diversity **among a model’s valid solutions** should not be conflated.

<h2 id="limitations">Scope and limitations</h2>

The experiments concern continuous control, the tested algorithms, and the chosen evaluation distribution. The critic-disagreement signal is a practical proxy rather than direct access to all cross-run variation. The Boltzmann-policy bound and the empirical QED method have different assumptions and should be interpreted separately.

Read the [paper’s limitations](https://arxiv.org/html/2605.21214v3#S6.SS5) for the limits of the evaluation. The earlier [similar-behavior repository](https://github.com/liv-daliberti/similar-behavior) contains project experiments, but its README predates the current QED paper; use the paper’s algorithm, settings, and appendices as the authoritative specification.
