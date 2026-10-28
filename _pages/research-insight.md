---
layout: research
research_id: illusion-of-insight
permalink: /research/illusion-of-insight/
title: The Illusion of Insight in Reasoning Models
description: Do reasoning models have aha moments? Evidence from over a million traces, the difference between spontaneous and triggered shifts, and the role of uncertainty.
og_image: /assets/img/publication_preview/illusion-insight.png
sections:
  - id: question
    label: The question
  - id: definition
    label: What counts as insight?
  - id: results
    label: The results
  - id: uncertainty
    label: Why uncertainty matters
  - id: use
    label: Using the findings
  - id: limitations
    label: Limitations
---

<h2 id="question">A change of approach is not the same as a breakthrough</h2>

A reasoning trace can look like a story of discovery: an initial approach, a phrase such as “wait, let me reconsider,” and a different answer. The important empirical question is whether the change actually makes the model more likely to solve the problem.

In _The Illusion of Insight in Reasoning Models_, we investigate that question across training checkpoints, tasks, decoding temperatures, and model families. We distinguish an observable **reasoning shift** from a stronger operational claim about an **“aha” event**.

A verbal cue or an ultimately correct answer does not establish that the intervening shift caused an improvement.

{% include research_figure.liquid
  image="/assets/research/insight/paper-01-aha.png"
  width="896"
  height="648"
  title="What an “aha” story looks like"
  alt="Schematic: two earlier checkpoints answer an age-ordering problem incorrectly; a later checkpoint says Wait and answers Alice correctly."
  caption="The paper illustrates the familiar story: earlier failures, a “wait” cue, then success. This is a schematic of the claim being tested, not evidence that the cue caused the improvement."
  source="https://arxiv.org/html/2601.00514v2#S1.F1"
  number="1"
  compact=true
%}

<div class="research-metrics">
  <div class="research-metric"><strong>1M+</strong><span>reasoning traces in the analysis</span></div>
  <div class="research-metric"><strong>3 domains</strong><span>mathematics, cryptic crosswords, and Rush Hour puzzles</span></div>
  <div class="research-metric"><strong>Across training</strong><span>checkpoint evaluations, rather than only a final model</span></div>
</div>

{% include research_figure.liquid
  image="/assets/research/insight/paper-03-domains.png"
  width="1828"
  height="628"
  title="Three tasks, three kinds of reasoning"
  alt="Example cryptic crossword, a polynomial solved by factoring, and a Rush Hour sliding-block puzzle."
  caption="Read left to right: reinterpret a cryptic clue, revise a mathematical approach, or change a spatial plan. These examples show what a meaningful change of approach can involve in each domain."
  source="https://arxiv.org/html/2601.00514v2#S3.F3"
  number="3"
%}

These quantities describe the study’s coverage. They are not independent evidence that a shift helps: that requires measuring correctness and testing interventions. The [data and methods sections](https://arxiv.org/html/2601.00514v2#S4) explain the task construction, model coverage, and annotation process.

<h2 id="definition">What would count as an “aha” moment?</h2>

The paper’s operational definition asks for more than a mid-trace expression of doubt. It connects a shift to a previously unsolved problem, prior stability, and an improvement in empirical correctness across the relevant checkpoint evaluations.

This is a measurable definition for the study; it is not a test for subjective experience.

<div class="research-flow" aria-label="Three distinct questions in the study">
  <div><strong>Detect a shift</strong>Did the trace materially change its approach, rather than merely include a familiar phrase?</div>
  <div><strong>Measure performance</strong>How does the shift relate to the model’s probability of solving the problem?</div>
  <div><strong>Test an intervention</strong>Does deliberately triggering reconsideration help under a specified uncertainty condition?</div>
</div>

The annotation pipeline combines candidate detection with checks for a material revision, and the paper reports validation and sensitivity analyses.

A phrase such as “let’s check” can introduce a real revision, a repeated calculation, or an unhelpful continuation. Counting the phrase alone would conflate these cases. See the [formal definition](https://arxiv.org/html/2601.00514v2#S3) and [annotation details](https://arxiv.org/html/2601.00514v2#A2).

<h2 id="results">What did the study find?</h2>

**Spontaneous shifts were uncommon and generally did not improve accuracy.** Their occurrence did not develop into a reliably beneficial self-correction mechanism as reinforcement learning progressed. The relationship between shifts and correctness also depended on decoding temperature and uncertainty, so a single vivid trace is a poor substitute for systematic evaluation.

**A separate, deliberately triggered intervention could help.** When the model’s token-level entropy was high, prompting reconsideration improved accuracy in the evaluated settings.

This supports investigating uncertainty-aware interventions. It does not make naturally occurring shifts equivalent to useful self-correction.

{% include research_figure.liquid
  image="/assets/research/insight/paper-04-prevalence.png"
  width="896"
  height="560"
  title="Formal “aha” events remain rare"
  alt="Heatmap of formal aha-event prevalence for Qwen2.5-1.5B at temperature 0.7: values range from 0.57 percent to 2.99 percent as thresholds vary."
  caption="Each cell changes the thresholds for prior failures and prior stability. For this model and temperature, qualifying events remain below 3% even under the most permissive thresholds shown. This prevalence result is separate from the triggered-intervention analysis."
  source="https://arxiv.org/html/2601.00514v2#S6.F4"
  number="4"
  compact=true
%}

The main [results section](https://arxiv.org/html/2601.00514v2#S6) separates these analyses. The reported interventions should be read together with their task, model, temperature, and triggering conditions.

<h2 id="uncertainty">Why does entropy enter the picture?</h2>

Token entropy summarizes how spread out a model’s next-token probabilities are. It gives an observable signal for uncertainty in the generation process. A model with a concentrated next-token distribution and one with a diffuse distribution may respond differently to an instruction to reconsider.

In this work, entropy is a signal used to study and select interventions.

It is not a universal confidence score, a proof that a model is wrong, or a direct measurement of human-like doubt. The [uncertainty and intervention protocol](https://arxiv.org/html/2601.00514v2#S5.SS3) specifies how the paper uses it.

<h2 id="use">How can researchers use this result?</h2>

When evaluating a reasoning method, separate the language of self-correction from its measured benefit. Record the final answer, actual revisions, generation conditions, and the rule that triggers any external intervention. Compare against an appropriate baseline instead of selecting only compelling examples.

This paper is useful for designing evaluations of reasoning traces, testing uncertainty-aware inference, and interpreting claims about emergent “aha” behavior during reinforcement learning. The [code repository](https://github.com/liv-daliberti/Illusion-of-Reasoning) contains the training, inference, and analysis implementation; the publication record below provides the current citation.

<h2 id="limitations">Scope and limitations</h2>

The evidence concerns the evaluated models and three domains, the study’s operational definitions, and its annotation and uncertainty protocols. Reasoning traces are observable outputs; they do not provide direct access to every internal computation. Rare events and alternative definitions can also affect what an analysis detects.

The findings challenge a particular interpretation of mid-trace shifts. They do not establish that all self-correction methods fail or that reasoning models cannot improve their answers. Read the paper’s [limitations](https://arxiv.org/html/2601.00514v2#S8) before transferring a result to another model or task.
