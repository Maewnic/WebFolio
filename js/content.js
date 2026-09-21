/* ==========================================================================
   YOUR CONTENT LIVES HERE
   This is the only file you need to edit for text, links, images and projects.
   Save it, refresh the page, done.

   HOW IMAGES WORK
   Put images in the assets folder, one folder per project, for example:
     assets/projects/lakes-echo/cover.jpg
     assets/projects/lakes-echo/01.jpg
   Then write the path in the project below, e.g.  cover: "assets/projects/lakes-echo/cover.jpg"
   Tip: keep each image under about 400 KB (roughly 1800 px wide, JPG) so the site loads fast.

   HOW TO ADD A PROJECT
   Copy one { ... } block inside "projects", paste it after the last one, change the slug
   (a short lowercase name with no spaces), and fill in what you have.
   Anything you leave empty ("" or []) simply doesn't show, so a small project gets a
   short page and a big project gets a long one.

   ABOUT EACH PROJECT FIELD
     slug          short id used in the page address
     title         project name
     category      "immersive" | "content" | "visual" | "photo"
     type          one line under the title, e.g. "Serene VR experience"
     tagline       one short sentence shown on the project card
     summary       the intro paragraph at the top of the project page
     status        e.g. "In progress" (shows a small label). Leave "" when finished.
     size          "l" (large), "w" (wide half), "m" (medium) or "s" (small): how big the card is on the Work page
     hidden        true = keep it in the file but don't show it on the site yet
     cover         the main image (card + top of the project page)
     coverFit      "contain" shows a logo whole with space around it, "fit" shows the whole image with no space
                   (set coverBg to the background colour, e.g. "#ffffff")
     hero          optional: show a video/embed at the top instead of the cover image
     context       e.g. "RMIT University · Virtual Environment" (shows as "Made for")
     role          what you did
     collaborators [{ name, role }]
     tools         ["Unity", ...]  (these also build the Tools list on the About page)
     year          e.g. "2026"
     links         [{ label, url }] buttons under the intro, e.g. Sketchfab, Instagram
     highlights    a player that plays clips one after another (see the TSA project)
     tabs          groups of videos/reels shown as tabs (see the TSA project)
     sections      [{ title, text, media }]  story sections; text can have several paragraphs
                   separated by a blank line. Empty sections are skipped.
     mediaRows     groups of videos/reels shown together, [{ title, text, media: [ ... ] }]
     gallery       [{ src, alt }] for a picture gallery; galleryLayout: "grid" or "masonry"

   MEDIA TYPES (used inside media / hero / mediaRows / tabs / highlights)
     { type: "youtube",    url: "https://..." }      normal videos and Shorts
     { type: "instagram",  url: "https://..." }      public Instagram reels/posts
     { type: "soundcloud", url: "https://..." }
     { type: "sketchfab",  url: "https://..." }      interactive 3D model (use the full sketchfab.com link)
     { type: "audio",      url: "assets/audio/x.mp3" }
     { type: "image",      url: "assets/projects/x/01.jpg", alt: "..." }
     { type: "video",      url: "assets/video/x.mp4" }   your own video file (highlights only; keep files small)
     { type: "embed",      url: "https://...", poster: "assets/x.jpg", label: "Try it here" }
                                                         a live web page you made, loaded inside the page when clicked
   ========================================================================== */

const PORTFOLIO = {

  /* ----------------------------- ABOUT YOU ----------------------------- */
  site: {
    name: "Munich",
    fullName: "Witthawin Batsomboon",
    alias: "Maewnic",   // your online username; shown in About, Contact, the footer and search text
    intro: "A Digital Media creative exploring immersive experiences, visual storytelling and digital environments.",
    location: "Melbourne · RMIT Digital Media",
    education: "Bachelor of Design (Digital Media), RMIT University (2024–2027), specialising in virtual environment design",
    from: "From Thailand, studying in Melbourne",
    languages: "English (fluent), Thai (native)",

    heroImage: "assets/hero-palms.jpg",   // big image on the home page
    heroAlt: "Munich standing beneath tall palm trees against a blue sky",
    aboutPhoto: "assets/me.jpg",   // your photo for the About page
    homeAboutImage: "assets/home-about.jpg",   // the photo in the "About me" block on the home page

    // Words between *stars* are shown in italics.
    aboutTeaser: "I like *turning ideas* into experiences people can *see, explore* and engage with, whether that's a virtual environment, a video or a piece of content.",

    heroTags: ["Create", "Explore", "Connect"],   // the small glass label next to your photo on the home page

    about: [
      "I'm Munich (I go by @Maewnic online).",
      "I enjoy creating digital experiences that combine visual design, technology and storytelling. My work currently focuses on immersive environments and interactive experiences, while I also explore video, social content, photography and visual design.",
      "I'm particularly interested in turning ideas into experiences people can see, explore and engage with, whether that's through a virtual environment, a video, or a piece of digital content.",
      "Outside of making things, I enjoy meeting people, having conversations, discovering new ideas, singing, watching movies and animation, and exploring whatever catches my curiosity."
    ],

    // Contact. Leave a value as "" and it won't show.
    email: "Witthawin.munich@gmail.com",
    linkedin: "https://www.linkedin.com/in/witthawin-batsomboon/",
    github: "",
    instagram: "https://www.instagram.com/maewnic/",
    youtube: ""
  },

  /* ----------------------------- CATEGORIES ----------------------------- */
  // A category only appears on the site once it has at least one visible project.
  categories: [
    { key: "immersive", label: "Immersive & Interactive", blurb: "Virtual environments, VR and interactive experiences." },
    { key: "content",   label: "Content & Media",         blurb: "Video, short-form content and storytelling." },
    { key: "visual",    label: "Visual Design",           blurb: "3D, illustration and visual design work." },
    { key: "photo",     label: "Photography",             blurb: "Photographs, presented as images." }
  ],

  /* ----------------------------- HOME: SELECTED WORK ----------------------------- */
  // These rotate on the home page every 7 seconds (the big one at the top, the rest in a row). Use project slugs.
  featured: ["lakes-echo", "hikari", "tsa-content", "given-watch"],

  /* ----------------------------- PROJECTS ----------------------------- */
  projects: [

    /* ============================ IMMERSIVE & INTERACTIVE ============================ */

    {
      slug: "lakes-echo",
      title: "Lake's Echo",
      category: "immersive",
      type: "Serene VR experience",
      tagline: "A misty lakeside in VR, designed around one goal: the most serene place possible.",
      summary: "A VR experience built around a single goal: creating the most serene environment possible. Psychology research on spatial and sensory design shaped a misty lakeside in Unity, centred on a lone pavilion.",
      status: "",
      size: "l",
      hidden: false,
      cover: "assets/projects/lakes-echo/cover.jpg",
      hero: { type: "youtube", url: "https://youtu.be/8VPb5HJ2Dcs" },
      context: "RMIT University · Heighten: Multi-Sensory Experience",
      year: "Aug – Oct 2025",
      role: "",
      collaborators: [{ name: "Yu Sen Ng", role: "Sound Design" }],
      tools: ["Unity", "ProBuilder"],
      links: [],
      sections: [
        {
          title: "Concept",
          text: "Serene started with research. I looked into psychology research on spatial and sensory design to understand what makes a place feel calm, then used it to shape the environment: a misty lakeside with a lone pavilion as a visual anchor.",
          media: []
        },
        {
          title: "Experience",
          text: "Visitors drift through the scene at their own pace. There's no goal to reach and nothing to solve, only the space, the mist and the sound.",
          media: []
        },
        {
          title: "Development",
          text: "The fog does two jobs. It reduces the render distance, which keeps the scene light enough for VR, and it softens the mountains into layered, painterly silhouettes.",
          media: []
        },
        {
          title: "Collaboration",
          text: "The sound was developed together with a sound design student, so the audio and the environment were shaped around each other.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },

    {
      slug: "hikari",
      title: "Hikari",
      category: "immersive",
      type: "Social VR venue · VRChat",
      tagline: "A Japanese-themed restaurant, bar and onsen in VRChat, and the community around it.",
      summary: "A Japanese-themed restaurant, bar and onsen in VRChat, with live singers, games and a community of 800+ members. I'm part of the founding team: I built much of the world, designed the brand, and looked after VIP memberships and staff operations. I no longer run it day to day.",
      status: "",
      size: "l",
      hidden: false,
      cover: "assets/projects/hikari/cover.jpg",
      context: "",
      year: "Dec 2024 – Jun 2026",
      role: "Founding team: world building, brand design, VIP and staff operations",
      collaborators: [],
      tools: ["Unity", "ProBuilder", "VRChat"],
      links: [{ label: "Hikari on Instagram", url: "https://www.instagram.com/hikarizo.vrc/" }],
      sections: [
        {
          title: "The world",
          text: "Guests arrive through a torii gate entrance into an interconnected VIP lounge, with a full sauna and onsen area linked by bridges and walkways. They can order from an in-world chef, listen to live singers, and play chess, Othello and pool, while staff dressed as maiko and geisha host the evening.\n\nHikari ran as a weekly event on Wednesdays at 8pm (GMT+7), mainly for Thai players.\n\nEarly builds used free and marketplace assets. Over time I moved toward original geometry made with ProBuilder in Unity, especially for the indoor spaces.",
          media: [{ type: "instagram", url: "https://www.instagram.com/reel/DWu4b81Ado0/" }]
        },
        {
          title: "Brand",
          text: "I designed Hikari's identity: the 光 (hikari, \"light\") logo with koi pond and torii motifs, promotional posters, social thumbnails, and physical keychains tied to the VIP membership tiers.",
          media: []
        },
        {
          title: "Community & operations",
          text: "The community grew to 800+ members across platforms, with 10,000+ visitors to the world. I moderated engagement, resolved community issues, and coordinated a small team of volunteer creators, tracking milestones and delegating tasks.\n\nI managed the VIP membership system and staff operations, with a flexible internal accounting structure that tracked monthly and one-off daily VIP purchases against volunteer staff attendance, so revenue could be shared with the staff every month.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },

    {
      slug: "keep-it-in",
      title: "Keep It In!",
      category: "immersive",
      type: "Interactive · Unity",
      tagline: "A surreal chase toward a toilet, built around story, sound and level design.",
      summary: "A short Unity experience that explores emotional state through environment and sound alone, with no dialogue and no UI. It's the piece where I focused most on storytelling and level design.",
      status: "",
      size: "l",
      hidden: false,
      cover: "assets/projects/keep-it-in/cover.jpg",
      hero: { type: "youtube", url: "https://youtu.be/7GCy969uqHU" },
      context: "RMIT University · Virtual Environment",
      year: "Aug – Oct 2025",
      role: "",
      collaborators: [],
      tools: ["Unity", "Reaper"],
      links: [],
      sections: [
        {
          title: "The experience",
          text: "It starts at a food truck, where you're handed a questionable hot dog. A plaza leads into a maze, and from somewhere far away you hear toilet flushes, both a hint and a taunt. As you get closer the vignette tightens. Then comes an anticlimactic flush, and the screen fades to white.",
          media: []
        },
        {
          title: "Sound",
          text: "The sound design is custom recorded and edited in Reaper, layered over ambient effects. With no dialogue or on-screen UI, the environment and the audio carry the player's emotional state.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },


    {
      slug: "drift",
      title: "DRIFT",
      category: "immersive",
      type: "VR experience · Unity",
      tagline: "An astronaut drifts from their ship as panic turns to calm.",
      summary: "A VR experience about an astronaut drifting away from their ship. Panic slowly turns into calm acceptance as they take in the beauty of space. The black hole, planets, sun, nebula and skybox are shaders that react to the music.",
      status: "In progress",
      size: "m",
      hidden: false,
      cover: "assets/projects/drift/cover.jpg",
      context: "RMIT University · AI Studio",
      year: "2026",
      role: "",
      collaborators: [],
      tools: ["Unity", "Claude Code", "Suno"],
      links: [],
      sections: [
        {
          title: "How it's made",
          text: "The shaders are driven by one shared audio script that feeds the music's amplitude and frequency into the shader settings. I used Claude Code to help write and tune the shaders, and the music was generated with Suno. I'm also working on getting everything to run well in VR.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },
    {
      slug: "haul",
      title: "HAUL",
      category: "immersive",
      type: "Game · Procedural rhetoric",
      tagline: "A shopping game where the only way to win is to walk away.",
      summary: "A game about shopping where the player wins by walking away. It's a procedural rhetoric piece: the point about consumption is made through the rules, not through text.",
      status: "",
      size: "s",
      hidden: false,
      cover: "assets/projects/haul/cover.jpg",
      hero: { type: "youtube", url: "https://youtu.be/gFsbdSgHLlI" },
      context: "RMIT University · Minimalism, Limits & Constraints",
      year: "",
      role: "",
      collaborators: [],
      tools: [],
      links: [],
      sections: [],
      gallery: [],
      galleryLayout: "grid"
    },
    {
      slug: "liminal-lavatory",
      title: "Liminal Lavatory",
      category: "immersive",
      type: "VR multisensory experience",
      tagline: "The Keep It In! bathroom maze, reworked as a VR multisensory experience.",
      summary: "A sub-project that reuses the bathroom maze from Keep It In! and turns it into a VR multisensory experience.",
      status: "",
      size: "s",
      hidden: false,
      cover: "assets/projects/liminal-lavatory/cover.jpg",
      hero: { type: "youtube", url: "https://youtu.be/C0TI0wnjY78" },
      context: "RMIT University · Heighten: Multi-Sensory Experience",
      year: "",
      role: "",
      collaborators: [],
      tools: ["Unity"],
      links: [],
      sections: [],
      gallery: [],
      galleryLayout: "grid"
    },


    {
      slug: "scroll-to-space",
      title: "Scroll to Space",
      category: "immersive",
      type: "Interactive website",
      tagline: "An educational website where scrolling up is climbing into space.",
      summary: "A scroll-driven infographic that turns scrolling into a climb from the ground to space. It's built with vanilla JavaScript and CSS, using real atmospheric data.",
      status: "",
      size: "w",
      hidden: false,
      cover: "assets/projects/scroll-to-space/cover.jpg",
      hero: { type: "embed", url: "https://maewnic.github.io/Assignment3_ScrollToSpace/", poster: "assets/projects/scroll-to-space/cover.jpg", label: "Try it here" },
      context: "RMIT University",
      year: "Oct 2025",
      role: "",
      collaborators: [],
      tools: ["JavaScript", "CSS", "HTML"],
      links: [{ label: "Open the website", url: "https://maewnic.github.io/Assignment3_ScrollToSpace/" }],
      sections: [
        {
          title: "How it works",
          text: "The page loads scrolled to the bottom, so scrolling up mirrors climbing. An altitude counter blends a linear scale for the first 80 km with an exponential one after that, reaching 10,000 km. The background darkens from sky blue to black along the way, and hovering reveals captions about each layer.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },

    {
      slug: "study-music-player",
      title: "Study Music Player",
      category: "immersive",
      type: "Interactive website",
      tagline: "An ambient music player with a built-in Pomodoro timer.",
      summary: "An ambient study music player with a Pomodoro timer built in: 25-minute study blocks and 5-minute breaks that cycle automatically and sync with playback.",
      status: "",
      size: "w",
      hidden: false,
      cover: "assets/projects/study-music-player/cover.jpg",
      hero: { type: "embed", url: "https://maewnic.github.io/Assignment2/mediaPlayer/", poster: "assets/projects/study-music-player/cover.jpg", label: "Try it here" },
      context: "RMIT University",
      year: "Aug 2025",
      role: "",
      collaborators: [],
      tools: ["JavaScript", "CSS", "HTML", "Illustrator"],
      links: [{ label: "Open the player", url: "https://maewnic.github.io/Assignment2/mediaPlayer/" }],
      sections: [
        {
          title: "Design",
          text: "The play and pause button is oversized and centred, and the spacebar toggles playback. The headphones icon is a hand-drawn Illustrator design, and the background is a photo of the Twelve Apostles that I took myself.\n\nI moved the volume slider to a more accessible place and built custom range sliders to match the rest of the look.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },

    /* ================================ CONTENT & MEDIA ================================ */

    {
      slug: "tsa-content",
      title: "TSA",
      category: "content",
      type: "Video production · Content creation",
      tagline: "Game-show style event recaps, plus promo and sponsor reels.",
      summary: "Content for the Melbourne University Thai Student Association (MUTSA). I made most of the event recap videos. I narrate what's happening, film it, edit it, caption it and do the voice acting over it, so each recap plays like a short TV game show instead of a typical club event video. I also make meme-style promo reels and sponsor reels.",
      status: "",
      size: "l",
      hidden: false,
      cover: "assets/projects/tsa-content/cover.jpg",
      coverFit: "contain",       // logo: shown whole instead of cropped
      coverBg: "#ffffff",
      context: "Melbourne University Thai Student Association (MUTSA)",
      year: "Sep 2024 – Present",
      role: "PR content creator: narration, filming, editing, captions and voice acting",
      collaborators: [],
      tools: ["CapCut"],
      links: [
        { label: "TSA on Instagram", url: "https://www.instagram.com/tsa_unimelb/" }
      ],

      // HIGHLIGHT REELS: one big reel at a time with left/right arrows (loops around).
      // Each one can have a label shown in the top-right corner: "Recap", "Promo" or "Sponsor".
      // Instagram reels can't auto-play the next one, so the arrows do the switching.
      highlightsText: "A few of my favourites across the three kinds of content. Use the arrows to move through them.",
      highlights: [
        { type: "instagram", url: "https://www.instagram.com/reel/DXBQEq8iafh/", label: "Recap" },
        { type: "instagram", url: "https://www.instagram.com/reel/DHXv7YfSWy7/", label: "Recap" },
        { type: "instagram", url: "https://www.instagram.com/reel/DP0_X91iWNm/", label: "Promo" },
        { type: "instagram", url: "https://www.instagram.com/reel/Db2VteHpvpA/", label: "Sponsor" },
        { type: "instagram", url: "https://www.instagram.com/reel/DIoE2tPJSIv/", label: "Recap" },
        { type: "instagram", url: "https://www.instagram.com/reel/DXqvghGidtw/", label: "Sponsor" }
      ],

      // THREE CATEGORIES shown as tabs, newest first. Only the first few load at once,
      // the rest appear with "Show more". Empty tabs stay hidden.
      tabs: [
        { title: "Recap Videos", text: "", media: [
          { type: "instagram", url: "https://www.instagram.com/reel/DbcY8tZJgGe/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DX5nCMHpOAT/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DXoGNSLCXbd/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DXBQEq8iafh/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DV0HKtlCQIB/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DPJKJEniR0J/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DOixCDkCVW9/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DM-IBt-pNYG/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DK8mEV9J9fQ/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DI_Ma31J1Zs/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DIoE2tPJSIv/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DHXv7YfSWy7/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DAihzqdyoB2/" }
        ] },
        { title: "Promo Videos", text: "", media: [
          { type: "instagram", url: "https://www.instagram.com/reel/DYyz9GsJ_tQ/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DYt0fYjp0Eu/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DXY3dUAiZek/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DQFrYImE7Lt/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DP8JU6-iY98/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DP0_X91iWNm/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DKMxUe9JriQ/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DIGLnx5JwU6/" }
        ] },
        { title: "Sponsor Videos", text: "", media: [
          { type: "instagram", url: "https://www.instagram.com/reel/DcQPXCdJIAe/" },
          { type: "instagram", url: "https://www.instagram.com/reel/Db2VteHpvpA/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DbumuT8JR3n/" },
          { type: "instagram", url: "https://www.instagram.com/reel/DXqvghGidtw/" }
        ] }
      ],

      sections: [],
      gallery: [],
      galleryLayout: "grid"
    },

    {
      slug: "dms-facilitator",
      title: "DMS Facilitator",
      category: "content",
      type: "Graphic design · Social posts",
      tagline: "Event posters and Instagram posts for the RMIT Digital Media Students.",
      summary: "Posters and Instagram posts I designed for DMS (Digital Media Students), the community for RMIT's Bachelor of Design (Digital Media) students. It grew out of my facilitator role in semester 2, 2026.",
      status: "",
      size: "m",
      hidden: false,
      cover: "assets/projects/dms-facilitator/cover.png",
      coverFit: "contain",
      coverBg: "#eef2fa",
      context: "RMIT University · Digital Media Students (DMS)",
      year: "Semester 2, 2026",
      role: "Student facilitator: poster and social post design",
      collaborators: [],
      tools: [],
      links: [
        { label: "DMS on Instagram", url: "https://www.instagram.com/rmitdmstudents/" }
      ],
      // POSTS: paste Instagram post links here. The post itself is embedded, no image needed.
      mediaRows: [
        { title: "Posts", text: "", media: [
          // newest first. Add a new post at the top, one line each, separated by commas
          { type: "instagram", url: "https://www.instagram.com/p/Ddfiu3PqOK9/" },
          { type: "instagram", url: "https://www.instagram.com/p/DdWDDsxK8bZ/" },
          { type: "instagram", url: "https://www.instagram.com/p/Dck4HE2EqaU/" },
          { type: "instagram", url: "https://www.instagram.com/p/DcYGSSjEvs-/" }
        ] }
      ],
      sections: [],
      gallery: [],
      galleryLayout: "grid"
    },

    {
      slug: "permsin",
      title: "Permsin",
      category: "content",
      type: "Design internship · Video & print",
      tagline: "A video podcast and a catalogue cover for a Thai steel company.",
      summary: "During my design internship at Permsin Steel Works PCL in Samut Sakhon, Thailand, I designed a product catalogue. I came back in December 2024, after starting university, to produce a video podcast called เหล็กTalk.",
      status: "",
      size: "s",
      hidden: false,
      cover: "assets/projects/permsin/cover.jpg",
      coverFit: "fit",
      coverBg: "#282828",
      context: "Permsin Steel Works PCL · Design Internship",
      year: "2024",
      role: "Design intern: catalogue design and video podcast production",
      collaborators: [],
      tools: [],
      links: [],
      sections: [
        { title: "Video podcast: เหล็กTalk", text: "", media: [{ type: "youtube", url: "https://youtu.be/dp0DqXh2xhg" }] },
        { title: "Catalogue cover",           text: "", media: [] }    // e.g. { type: "image", url: "assets/projects/permsin/catalogue.jpg", alt: "Catalogue cover" }
      ],
      gallery: [],
      galleryLayout: "grid"
    },

    /* ================================== VISUAL DESIGN ================================== */

    {
      slug: "given-watch",
      title: "Given Watch",
      category: "visual",
      type: "3D diorama",
      tagline: "A painted-style diorama of a Rolex passed down from my father, with a lotus.",
      summary: "A 3D diorama built around a Rolex passed down from my father, paired with a lotus, which represents growth in Thai Buddhism. I went for an illustrative look instead of a commercial showroom render.",
      status: "",
      size: "l",
      hidden: false,
      cover: "assets/projects/given-watch/cover.jpg",
      hero: { type: "sketchfab", url: "https://sketchfab.com/3d-models/given-watch-43e90112cd2f402995447d18973c80bf" },
      context: "RMIT University",
      year: "Mar – May 2026",
      role: "",
      collaborators: [],
      tools: ["Maya", "Substance Painter", "Clip Studio Paint", "Sketchfab"],
      links: [{ label: "View on Sketchfab", url: "https://skfb.ly/pKMOO" }],
      sections: [
        {
          title: "The look",
          text: "I textured the piece in Clip Studio Paint first, then brought it into Substance Painter for a painted, illustrative finish that references the look of Puss in Boots: The Last Wish.",
          media: []
        },
        {
          title: "Making it",
          text: "The watch was modelled and animated in Maya, and the lighting was staged in Sketchfab.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    },

    {
      slug: "glanx",
      title: "Glanx",
      category: "visual",
      type: "Brand & interface design",
      tagline: "A made-up smart glasses brand: logo, interface, packaging, posters and website.",
      summary: "My high school Art Design board from 2023. I invented Glanx, a smart glasses company set in the near future, and designed its logo, operating system interface, packaging, poster, billboard and website. This is where I started combining my own photography with graphic design, using Photoshop and Lightroom.",
      status: "",
      size: "m",
      hidden: false,
      cover: "assets/projects/glanx/cover.jpg",
      coverAlt: "Glanx packaging and poster designs from the design board",
      hero: { type: "image", url: "assets/projects/glanx/board.jpg", alt: "The full Glanx design board: three panels of logo, interface, packaging, poster and website work" },
      context: "High school · Art Design class",
      year: "2023",
      role: "Concept, photography, graphic design and editing",
      collaborators: [],
      tools: ["Photoshop", "Lightroom"],
      links: [],
      sections: [
        {
          title: "The brief",
          text: "Set in the near future, when smart glasses have stopped looking chunky and weird and look like ordinary glasses. Glanx is a new company that has nailed what smart glasses need: a 3D display using stereoscopic technology, a built-in gyroscope that tracks head movement so a screen or 3D object stays where you place it, duo speakers, and a camera for photos and video.\n\nThey can stay this thin because the computing happens in the cloud and links to your phone, and they charge through a magnetic field from the phone.",
          media: []
        },
        {
          title: "Logo",
          text: "I started with a page of sketches and letterforms, then developed the ones I liked in colour. The final mark is a pair of linked G shapes that also read as a pair of glasses, in a blue-to-pink gradient.",
          media: [{ type: "image", url: "assets/projects/glanx/logo.jpg", alt: "Glanx logo sketches, developments and the final logo" }]
        },
        {
          title: "Operating system",
          text: "Bubbles OS is the interface you see through the lens: weather, music, maps and a voice assistant in soft, glassy bubbles. I sketched the layouts first, then designed a set of icons and widgets and placed them over my own photos to show how it would look in real life.",
          media: [{ type: "image", url: "assets/projects/glanx/os.jpg", alt: "Operating system sketches, icons and the final Bubbles OS screens seen through glasses" }]
        },
        {
          title: "Packaging",
          text: "Tall boxes for two models, using portraits I photographed and edited, the logo and the same blue-to-pink colours. The board shows the development stage, the final designs and mockups of the boxes.",
          media: [{ type: "image", url: "assets/projects/glanx/packaging.jpg", alt: "Glanx packaging development, final designs and box mockups" }]
        },
        {
          title: "Poster and billboard",
          text: "The poster is built around one line, \u201CTake a glance into the future with Glanx\u201D, with the product and a portrait layered into shapes and patterns. The same look carries over to a wide billboard.",
          media: [
            { type: "image", url: "assets/projects/glanx/poster.jpg", alt: "Glanx poster concepts, developments and the final Introducing Glanx poster" },
            { type: "image", url: "assets/projects/glanx/billboard.jpg", alt: "Glanx billboard concepts, final billboard and poster mockups" }
          ]
        },
        {
          title: "Website",
          text: "I sketched the website first, developed two layouts, then finished a full landing page with the product, its features and a subscribe area. It is shown on screens in the mockups at the bottom of the board.",
          media: [{ type: "image", url: "assets/projects/glanx/website.jpg", alt: "Glanx website concepts, developments, the final page and screen mockups" }]
        },
        {
          title: "About these photos",
          text: "The original files were on my school cloud account, which was deleted after I left, so this project is shown from photos of the printed board.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid"
    }

    /* ----- READY-MADE TEMPLATE (copy it out of this comment to use it) -----

    ,{
      slug: "photography",
      title: "Photography",
      category: "photo",
      type: "Photography",
      tagline: "",
      summary: "",
      size: "m",
      cover: "assets/photography/01.jpg",
      galleryLayout: "masonry",
      gallery: [
        { src: "assets/photography/01.jpg", alt: "" },
        { src: "assets/photography/02.jpg", alt: "" }
      ]
    }
    ----- */
  ],

  /* ----------------------------- EXPERIENCE ----------------------------- */
  experience: [
    {
      title: "Student Facilitator",
      org: "RMIT University, Bachelor of Design (Digital Media)",
      period: "Aug 2026 – Present",
      text: "Organising activities and events for Bachelor of Design (Digital Media) students in a paid facilitator role. Co-organised a free Melbourne Now or Never gallery as a team of two, drawing up to 30 attendees."
    },
    {
      title: "General Committee, formerly PR Officer",
      org: "Melbourne University Thai Student Association (MUTSA)",
      period: "Sep 2024 – Present",
      text: "Joined as a PR intern (Sep 2024 – Jun 2025), became Public Relations Officer (Jul 2025 – Aug 2026), and joined the General Committee in Sep 2026. I give feedback and practical suggestions while major initiatives are planned, and produce multimedia content, including event recap videos and reels, to keep members engaged and support communication with sponsors."
    },
    {
      title: "Student Representative, Design in Digital Media",
      org: "RMIT Student Staff Consultative Committee (SSCC)",
      period: "Apr 2025 – Present",
      text: "Student representation and engagement within the Digital Media program."
    },
    {
      title: "Design Intern",
      org: "Permsin Steel Works PCL, Samut Sakhon, Thailand",
      period: "Mar – Jun 2024, Dec 2024",
      text: "Designed a product catalogue during the first stint, then came back in December 2024, after starting at university, to produce the video podcast."
    }
  ],

  /* ----------------------------- SKILLS ----------------------------- */
  // Software is not listed here on purpose: the "Tools" list on the About page is built
  // automatically from the tools you put in your projects.
  // The short skills block on the home page (the full list is on the About page).
  homeSkills: [
    { title: "Immersive & Interactive", items: ["Virtual environments", "VR experiences", "Level design", "Sound design"] },
    { title: "Content & Media",         items: ["Video editing", "Short-form video", "Social media content", "Storytelling"] },
    { title: "Visual Design",           items: ["3D design", "Graphic design", "Photography", "Illustration"] },
    { title: "People & Community",      items: ["Community building", "Workshop facilitation", "Public speaking", "Peer mentoring"] }
  ],

  skills: [
    { group: "Immersive & Interactive", items: ["Virtual environments", "VR / immersive experience", "3D environment design", "Interactive media", "Level design", "Sound design"] },
    { group: "Visual & Design",         items: ["3D design", "Graphic design", "Visual composition", "Photography", "Illustration"] },
    { group: "Content & Media",         items: ["Video editing", "Short-form video", "Social media content", "Content creation", "Digital storytelling"] },
    { group: "Creative Practice",       items: ["Concept development", "Experience design", "Visual storytelling", "Collaboration", "Creative direction / ideation"] },
    { group: "People & Community",      items: ["Community building", "Workshop facilitation", "Peer mentoring", "Public speaking", "Collaborative communication"] }
  ]
};
