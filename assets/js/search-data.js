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
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "publications in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-patents",
          title: "patents",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/patents/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "A record of courses that I&#39;ve taught over the years by semester.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "dropdown-publications",
              title: "publications",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
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
          section: "News",},{id: "news-preprint-released-the-illusion-of-insight-in-reasoning-models-submitted-jan-2-2026",
          title: 'Preprint released: The Illusion of Insight in Reasoning Models (submitted Jan 2, 2026)....',
          description: "",
          section: "News",},{id: "news-wmw-2026-was-great",
          title: 'WMW 2026 was great.',
          description: "",
          section: "News",},{id: "news-paper-accepted-to-findings-of-acl-the-illusion-of-insight-in-reasoning-models",
          title: 'Paper accepted to Findings of ACL: The Illusion of Insight in Reasoning Models....',
          description: "",
          section: "News",},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/liv-daliberti.bsky.social", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6C%69%76.%64%61%6C%69%62%65%72%74%69@%70%72%69%6E%63%65%74%6F%6E.%65%64%75", "_blank");
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
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=wNgmnzQAAAAJ", "_blank");
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
