// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "Personal essays and research updates from Liv G. d&#39;Aliberti on Ph.D. life, AI research, reinforcement learning, and learning in public.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Publications by Liv G. d&#39;Aliberti on reinforcement learning, AI reasoning, interpretable decision-making, privacy-preserving computation, and applied machine learning.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Teaching record for Liv G. d&#39;Aliberti, including computer science, deep learning, and software engineering courses.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-patents",
          title: "patents",
          description: "Patent applications and applied research inventions by Liv G. d&#39;Aliberti.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/patents/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "Curriculum vitae for Liv G. d&#39;Aliberti, Computer Science Ph.D. student at Princeton University.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-i-passed-my-generals-exam",
      
        title: "I Passed My Generals Exam",
      
      description: "Learning Machine Behavior and the Princeton C.S. generals exam",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2026/generals-exam/";
        
      },
    },{id: "post-improved-analysis-cryptography-and-advanced-algorithm-design",
      
        title: "Improved Analysis - Cryptography and Advanced Algorithm Design",
      
      description: "Final Project",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Cryptography/";
        
      },
    },{id: "post-why-i-left-my-great-job-to-become-a-ph-d-student",
      
        title: "Why I left my great job to become a Ph.D. student",
      
      description: "Life is two steps forward, and now, this is my one step back",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/why-I-left/";
        
      },
    },{id: "news-start-my-computer-science-ph-d-at-princeton-university",
          title: 'Start my Computer Science Ph.D. at Princeton University!',
          description: "",
          section: "News",},{id: "news-workshop-paper-accepted-law-2025-neurips-accepted-aug-22-2025-workshop-dec-7-2025-san-diego-convention-center",
          title: 'Workshop paper accepted @ LAW 2025, NeurIPS (accepted Aug 22, 2025; workshop Dec...',
          description: "",
          section: "News",},{id: "news-workshop-paper-accepted-poster-at-wmw-2026-feb-4-6-2026-mila",
          title: 'Workshop paper accepted (poster) at WMW 2026 (Feb 4-6, 2026, Mila).',
          description: "",
          section: "News",},{id: "news-preprint-released-the-illusion-of-insight-in-reasoning-models",
          title: 'Preprint released: The Illusion of Insight in Reasoning Models.',
          description: "",
          section: "News",},{id: "news-wmw-2026-was-great",
          title: 'WMW 2026 was great.',
          description: "",
          section: "News",},{id: "news-patent-published-holographic-graph-transformer-network-hgtn-system-and-method",
          title: 'Patent published: HOLOGRAPHIC GRAPH TRANSFORMER NETWORK (HGTN) SYSTEM AND METHOD.',
          description: "",
          section: "News",},{id: "news-paper-accepted-to-findings-of-acl-the-illusion-of-insight-in-reasoning-models",
          title: 'Paper accepted to Findings of ACL: The Illusion of Insight in Reasoning Models....',
          description: "",
          section: "News",},{id: "news-preprint-released-behavior-consistent-deep-reinforcement-learning",
          title: 'Preprint released: Behavior-Consistent Deep Reinforcement Learning.',
          description: "",
          section: "News",},{id: "news-i-passed-my-princeton-c-s-generals-exam",
          title: 'I passed my Princeton C.S. generals exam!',
          description: "",
          section: "News",},{id: "news-workshop-paper-accepted-at-autorl-at-rlc-2026-behavior-consistent-deep-reinforcement-learning",
          title: 'Workshop paper accepted at AutoRL at RLC 2026: Behavior-Consistent Deep Reinforcement Learning.',
          description: "",
          section: "News",},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/liv-daliberti.bsky.social", "_blank");
        },
      },{
        id: 'social-dblp',
        title: 'DBLP',
        section: 'Socials',
        handler: () => {
          window.open("https://dblp.org/pid/374/8954", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6C%69%76.%64%61%6C%69%62%65%72%74%69@%70%72%69%6E%63%65%74%6F%6E.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/liv-daliberti", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/liv-d-aliberti-89b546130", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-3139-5960", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Liv-Daliberti/", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=wNgmnzQAAAAJ", "_blank");
        },
      },{
        id: 'social-work',
        title: 'Work',
        section: 'Socials',
        handler: () => {
          window.open("https://citp.princeton.edu/people/liv-daliberti", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/livdaliberti", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
