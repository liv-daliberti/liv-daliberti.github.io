---
layout: post
title: Improved Analysis - Cryptography and Advanced Algorithm Design
date: 2025-01-07 10:05:00
description: Final Project
tags: Ph.D, Cryptography, Math, Analysis
categories: life-posts
---

My background as an applied researcher for a defense contractor gave me broad exposure to applications of cryptographic protocols and opportunities to implement state of the art algorithms for government applications. However, one area I consistently struggled as a researcher was in writing the analysis section of my publications. Sufficient analayis was regularly the focus of peer-review critiques, and I knew I had to address that gap. Moreover, I wanted to take theoretically rigorous courseload in my first semester back to school. It has been nearly 6 years since I'd been a fulltime student, so I wanted to swiftly re-adjust to a less business-oriented, more theoretically rigorous environment.

I decided to address the analysis issue head-on by enrolling in [533-Cryptography](https://sites.google.com/view/alex-lombardi/home/cos-433533-fall-2024-princeton) with Professor Alex Lombardi and [521-Advanced Algorithm Design](https://www.cs.princeton.edu/courses/archive/fall24/cos521/) with Professor Pravesh Kothari. These course not only broadened my knowledge of advanced cryptographic methods and algorithmic techniques, but also forced me to improve my academic writing. Every assignment was an opportunity to refine how I presented and defended my arguments. 

Cryptography was a lot of fun, and I felt comfortable in the course for most of the semester. My favorite technique that we covered in 533-Cryptography is Proofs by Reduction, as [beautifully explained by Dr. Dachman-Soled](https://user.eng.umd.edu/~danadach/Intro_Crypto_Spring_15/reductions.pdf). I had not used this technique prior to this course, and I know that this is something that I will carry forward in my work, including in my work outside of the field of cryptography. 

In direct contrast, I really struggled with 521-Advanced Algorithm Design. My prior educational experience had not included an intro to algorithms / algorithms for computer science course. Other people around me in the room certainly came in with a lot of background understanding of the field of algorithms that I hurriedly tried to backfill. My first homework set was a disaster. Looking back, I'm embarassed as I re-read my solutions; I got a deserved 68%. It is, in fact, really hard to get back into the mindset of being a student after over half a decade in industry. Every week from early October to late November, I would ask myself if I was ready to give up. Luckily, with a lot of help from my TA and a serious amount of banging my head against a desk, I did make it through the course.

My workload as a Ph.D. student looks quite different than my defense contracting job. I spend a lot less time trying to convince people that they should consider using an algorithm / technique within their system, and instead, a lot more time thinking about the mathematics of those algorithms and systems. Most days, last semester, I came in and just sat and worked on a given homework problem all day. Some days I made no progress. My partner calls this kind of work "skull-dragging", and I certainly do feel like I'm dragging my oozing brain along the pathway of knowledge. 

However, this kind of thinking - algorithm design and analysis - is exactly the skillset I hope to improve during my Ph.D. Moreover, I hope to use the skills learned to ultimately contribute to the development of new decision-making algorithms. So, I'm glad to have taken the first step on that journey. The first step is often, anecdotally, the hardest to take and the largest delta of change. I hope that I'm optimizing my experience towards a reward maximizing state moving forward.   

Here are my final capstones for each of the classes that I took last Fall:

For 533-Cyprography --  [a project on a privacy-preserving biometric authentication protocol]({{ "/assets/pdf/crypto_final.pdf" | relative_url }}). I'd originally started work on this protocol before my Ph.D. as part of my job, and now, after taking 533-Cryptography, I'm  glad to have gone back and written up the protocol description and security anaylsis. 

For 521-Advanced Algorithm Design -- [a reformulation of a multiplicative weight update (MWU) linear program (LP) solver as an adversarial bandit]({{ "/assets/pdf/algo_final.pdf" | relative_url }}). My classmate and I showed that optimality under the static whack-a-mole MWU described in [Bhattacharya et al., 2022](https://arxiv.org/pdf/2207.07519) for packing-covering LPs is equivalent to the optimal policy obtained using an n-armed adversarial bandit, like in [Bandit Algorithms, Chapter 11](https://tor-lattimore.com/downloads/book/book.pdf). 