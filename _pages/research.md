---
layout: page
title: Research explained
permalink: /research/
description: Illustrated guides to Liv d’Aliberti’s research on RLVR solution diversity, aha moments in reasoning models, and behavior-consistent reinforcement learning.
nav: true
nav_order: 1.5
research_hub: true
last_modified_at: "2026-10-28T17:04:54-04:00"
---

How do we tell whether an AI system reasons reliably? These guides explain three complementary questions from my research, using figures from the papers, concrete examples, and the limits of what each experiment establishes.

**Start with the question that matters to you:** can one model find multiple correct solutions, does reconsideration improve an answer, or do independently trained agents behave similarly?

<div class="research-guides">
  {% for entry in site.data.research %}
    {% assign paper = entry[1] %}
    <section class="research-guide" aria-labelledby="guide-{{ entry[0] }}">
      <h2 id="guide-{{ entry[0] }}"><a href="{{ paper.path | relative_url }}">{{ paper.title }}</a></h2>
      <p class="research-guide-question">{{ paper.question }}</p>
      <a href="{{ paper.path | relative_url }}" aria-label="Read the illustrated guide: {{ paper.title | escape }}">
        <img src="{{ paper.image | relative_url }}" alt="{{ paper.image_alt | escape }}" width="{{ paper.image_width }}" height="{{ paper.image_height }}" loading="lazy" decoding="async">
      </a>
      <p>{{ paper.takeaway }}</p>
      <p><a href="{{ paper.path | relative_url }}">Explore the findings and figures →</a> · <a href="{{ paper.paper_url }}">Publication record</a></p>
    </section>
  {% endfor %}
</div>

The guides accompany the research papers. The publication record on each guide includes all authors, the full abstract, the current citation, and links to available code and data. For my other work on AI, reinforcement learning, privacy, and autonomy, see [all publications]({{ '/publications/' | relative_url }}).
