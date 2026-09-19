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
     size          "l" (large), "m" (medium) or "s" (small): how big the card is on the Work page
     hidden        true = keep it in the file but don't show it on the site yet
     cover         the main image (card + top of the project page)
     hero          optional: show a video/embed at the top instead of the cover image
     role          what you did
     collaborators [{ name, role }]
     tools         ["Unity", ...]  (these also build the Tools list on the About page)
     year          e.g. "2026"
     sections      [{ title, text, media }]  story sections; text can have several paragraphs
                   separated by a blank line. Empty sections are skipped.
     mediaRows     groups of videos/reels shown together, [{ title, text, media: [ ... ] }]
     gallery       [{ src, alt }] for a picture gallery; galleryLayout: "grid" or "masonry"
     links         [{ label, url }] e.g. Sketchfab, YouTube

   MEDIA TYPES (used inside media / hero / mediaRows)
     { type: "youtube",    url: "https://..." }      normal videos and Shorts
     { type: "instagram",  url: "https://..." }      public Instagram reels/posts
     { type: "soundcloud", url: "https://..." }
     { type: "sketchfab",  url: "https://..." }      interactive 3D model
     { type: "audio",      url: "assets/audio/x.mp3" }
     { type: "image",      url: "assets/projects/x/01.jpg", alt: "..." }
   ========================================================================== */

const PORTFOLIO = {

  /* ----------------------------- ABOUT YOU ----------------------------- */
  site: {
    name: "Munich",
    fullName: "Witthawin Batsomboon",
    intro: "A Digital Media creative exploring immersive experiences, visual storytelling and digital environments.",
    location: "Melbourne · RMIT Digital Media",
    education: "Bachelor of Digital Design, RMIT University",
    from: "From Thailand, studying in Melbourne",

    heroImage: "",            // big image on the home page, e.g. "assets/projects/lakes-echo/cover.jpg"
    heroAlt: "",
    aboutPhoto: "",           // your photo for the About page, e.g. "assets/me.jpg"

    aboutTeaser: "I like turning ideas into experiences people can see, explore and engage with, whether that's a virtual environment, a video or a piece of content.",

    about: [
      "I'm Munich, a Digital Media student at RMIT University based in Melbourne.",
      "I enjoy creating digital experiences that combine visual design, technology and storytelling. My work currently focuses on immersive environments and interactive experiences, while I also explore video, social content, photography and visual design.",
      "I'm particularly interested in turning ideas into experiences people can see, explore and engage with, whether that's through a virtual environment, a video, or a piece of digital content.",
      "Outside of making things, I enjoy meeting people, having conversations, discovering new ideas, singing, watching movies and animation, and exploring whatever catches my curiosity."
    ],

    // Contact. Leave a value as "" and it won't show.
    email: "",                // add the email you want people to use
    linkedin: "https://www.linkedin.com/in/witthawin-batsomboon/",
    instagram: "",
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
  // The first one is shown biggest. Use project slugs.
  featured: ["lakes-echo", "hikari", "keep-it-in", "tsa-content"],

  /* ----------------------------- PROJECTS ----------------------------- */
  projects: [

    {
      slug: "lakes-echo",
      title: "Lake's Echo",
      category: "immersive",
      type: "Serene VR experience",
      tagline: "A research-informed VR experience about calm, atmosphere and sound.",
      summary: "A research-informed VR experience exploring how environmental design, spatial immersion, visual atmosphere and sound can contribute to a feeling of calm and serenity.",
      status: "",
      size: "l",
      hidden: false,
      cover: "",
      year: "",
      role: "",
      collaborators: [{ name: "Yu Sen Ng", role: "Sound Design" }],
      tools: ["Unity", "ProBuilder"],
      // Fill these in as you have the material. Empty ones are skipped.
      sections: [
        { title: "Concept",       text: "", media: [] },
        { title: "Experience",    text: "", media: [] },
        { title: "Process",       text: "", media: [] },
        { title: "Development",   text: "", media: [] },
        { title: "Collaboration", text: "", media: [] }
      ],
      gallery: [],
      galleryLayout: "grid",
      links: []
    },

    {
      slug: "hikari",
      title: "Hikari",
      category: "immersive",
      type: "Social VR venue · VRChat",
      tagline: "A Japanese-themed restaurant and bar in VRChat, and the community that runs it.",
      summary: "Hikari is a Japanese-themed restaurant and bar in VRChat with a live performance stage and games like chess, Othello and pool. I built the world, designed the brand and lead the community that hosts weekly events there.",
      status: "",
      size: "l",
      hidden: false,
      cover: "",
      year: "",
      role: "World builder, brand designer and community lead",
      collaborators: [],
      tools: ["Unity", "ProBuilder", "VRChat"],
      sections: [
        {
          title: "The world",
          text: "Hikari runs as a weekly event on Wednesdays at 8pm (GMT+7), mainly for Thai players.\n\nEarlier builds used more free and marketplace assets. More recently I've moved toward original geometry made in Unity with ProBuilder, especially for the indoor spaces.",
          media: []
        },
        {
          title: "Brand",
          text: "I designed Hikari's identity, including the 光 (hikari, \"light\") logo with koi pond and torii motifs, promotional posters, social thumbnails, and physical keychains tied to the VIP membership tiers.",
          media: []
        },
        {
          title: "Community",
          text: "The community has 800+ members and has had 10,000+ visitors. Staff dress as maiko and geisha to host guests during events.\n\nI also manage the VIP membership system and the accounting, tracking VIP purchases and sharing the revenue with our volunteer staff every month.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid",
      links: []
    },

    {
      slug: "keep-it-in",
      title: "Keep It In!",
      category: "immersive",
      type: "Interactive · Unity",
      tagline: "A surreal toilet chase, built around story and level design.",
      summary: "A surreal interactive Unity project set in a toilet-themed chase environment. It's the piece where I focused most on storytelling and level design.",
      status: "",
      size: "m",
      hidden: false,
      cover: "",
      year: "",
      role: "",
      collaborators: [],
      tools: ["Unity"],
      sections: [],
      gallery: [],
      galleryLayout: "grid",
      links: []
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
      cover: "",
      year: "2026",
      role: "",
      collaborators: [],
      tools: ["Unity", "Shaders", "Suno"],
      sections: [
        {
          title: "How it's made",
          text: "The shaders are driven by one shared audio script that feeds the music's amplitude and frequency into the shader settings. I used AI to help write and tune the shaders, and the music was generated with Suno. I'm also working on getting everything to run well in VR.",
          media: []
        }
      ],
      gallery: [],
      galleryLayout: "grid",
      links: []
    },

    {
      slug: "meadow-whispers",
      title: "Meadow Whispers",
      category: "immersive",
      type: "Virtual environment · Unity",
      tagline: "A Unity virtual environment.",
      summary: "A virtual environment built in Unity.",
      status: "",
      size: "s",
      hidden: false,
      cover: "",
      year: "",
      role: "",
      collaborators: [],
      tools: ["Unity"],
      sections: [],
      gallery: [],
      galleryLayout: "grid",
      links: []
    },

    {
      slug: "relaxing-audio-experience",
      title: "Relaxing Audio Experience",
      category: "immersive",
      type: "Interactive · Unity",
      tagline: "A calm study space with audio and a focus timer.",
      summary: "An interactive Unity experience that combines a calming environment, study audio and a Pomodoro-style focus timer.",
      status: "",
      size: "s",
      hidden: false,
      cover: "",
      year: "",
      role: "",
      collaborators: [],
      tools: ["Unity"],
      sections: [],
      gallery: [],
      galleryLayout: "grid",
      links: []
    },

    {
      slug: "tsa-content",
      title: "TSA Event Recaps & Reels",
      category: "content",
      type: "Video production · Content creation",
      tagline: "Event recaps that play like a short TV game show, plus promo and sponsor reels.",
      summary: "Content for the University of Melbourne Thai Student Association. I made most of the recap videos for their events. I narrate what's happening, film it, edit it, caption it and do the voice acting over it, so each recap plays like a short TV game show rather than a typical club event video.",
      status: "",
      size: "l",
      hidden: false,
      cover: "",
      year: "",
      role: "Narration, filming, editing, captions and voice acting",
      collaborators: [],
      tools: [],
      // Add your videos here. Vertical Shorts/reels are shown in phone shape.
      mediaRows: [
        {
          title: "Event recaps",
          text: "",
          media: []                 // e.g. { type: "youtube", url: "https://youtu.be/..." }
        },
        {
          title: "Promo & sponsor reels",
          text: "Meme-style promo reels and sponsor reels for the association.",
          media: []                 // e.g. { type: "instagram", url: "https://www.instagram.com/reel/..." }
        }
      ],
      sections: [],
      gallery: [],
      galleryLayout: "grid",
      links: []
    },

    {
      slug: "3d-diorama",
      title: "3D Diorama",
      category: "visual",
      type: "3D model",
      tagline: "A painted-style watch and lotus diorama.",
      summary: "A 3D diorama of a Rolex wristwatch on a pink lotus base. I learned Substance 3D Painter from scratch for this one, using the painted 3D look of Puss in Boots: The Last Wish as the art reference.",
      status: "",
      size: "m",
      hidden: false,
      cover: "",
      year: "",
      role: "",
      collaborators: [],
      tools: ["Maya", "Substance 3D Painter"],
      sections: [],
      gallery: [],
      galleryLayout: "grid",
      links: []                     // e.g. { label: "View on Sketchfab", url: "https://sketchfab.com/..." }
    }

    /* ----- READY-MADE TEMPLATES (copy one out of this comment to use it) -----

    ,{
      slug: "video-podcast",
      title: "Video Podcast",
      category: "content",
      type: "Video production",
      tagline: "",
      summary: "",
      size: "s",
      hero: { type: "youtube", url: "" },
      tools: [],
      sections: []
    }

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
      org: "RMIT University",
      period: "Aug 2026 – Present",
      text: "Organising activities for Digital Media students and supporting the wider university community."
    },
    {
      title: "Student Representative, Design in Digital Media",
      org: "RMIT Student Staff Consultative Committee (SSCC)",
      period: "",
      text: "Student representation and engagement within the Digital Media program."
    },
    {
      title: "PR / Content Creator",
      org: "University of Melbourne Thai Student Association",
      period: "",
      text: "Creating social media content, event recaps, photography and short-form video."
    }
  ],

  /* ----------------------------- SKILLS ----------------------------- */
  // Software is not listed here on purpose: the "Tools" list on the About page is built
  // automatically from the tools you put in your projects.
  skills: [
    { group: "Immersive & Interactive", items: ["Virtual environments", "VR / immersive experience", "3D environment design", "Interactive media", "Level design"] },
    { group: "Visual & Design",         items: ["3D design", "Graphic design", "Visual composition", "Photography", "Illustration"] },
    { group: "Content & Media",         items: ["Video editing", "Short-form video", "Social media content", "Content creation", "Digital storytelling"] },
    { group: "Creative Practice",       items: ["Concept development", "Experience design", "Visual storytelling", "Collaboration", "Creative direction / ideation"] }
  ]
};
