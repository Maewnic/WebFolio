/* ==========================================================================
   EDIT YOUR CONTENT HERE
   This is the only file you need to touch for text, links and projects.
   Save the file, refresh the page, done.

   HOW TO ADD A PROJECT
   Copy one { ... } block inside a list (video, virtual, models, sound),
   paste it right after, and change the text and link.

   MEDIA TYPES (the "type" inside media)
     "youtube"     paste any YouTube link (normal video or Shorts)
     "instagram"   paste a public Instagram reel/post link
     "soundcloud"  paste a SoundCloud track link
     "audio"       a small audio file you added to the assets folder, e.g. "assets/audio/track.mp3"
     "sketchfab"   paste a Sketchfab model link
     "image"       a picture in the assets folder, e.g. "assets/images/room.jpg"
   Leave "url" empty ("") and a grey placeholder box shows instead.
   To show several pictures/videos in one project, use a list: media: [ {...}, {...} ]
   ========================================================================== */

const PORTFOLIO = {

  /* ----- About you ----- */
  site: {
    name: "Mew",
    tagline: "Video editor & digital designer",
    intro: "This is a placeholder intro. Write one or two sentences about who you are and what you make.",
    about: "This is a placeholder about section. Say a bit more about your background, what you're interested in, and the kind of work you want to do. You can write a few sentences here.",
    photo: "",                       // e.g. "assets/images/me.jpg" (leave empty for a placeholder)
    email: "hello@example.com",      // change this to your real email
    socials: [                       // leave url empty to hide a link
      { label: "Instagram", url: "" },
      { label: "YouTube",   url: "" },
      { label: "LinkedIn",  url: "" }
    ]
  },

  /* ----- Top menu ----- */
  nav: [
    { key: "home",   label: "Home",          href: "index.html" },
    { key: "video",  label: "Video / Reels", href: "video.html" },
    { key: "design", label: "Design",        href: "design.html" }
  ],

  /* ----- The two big choices on the Home page ----- */
  paths: [
    { title: "Video / Reels", text: "Video editing and short-form reels.", href: "video.html" },
    { title: "Design",        text: "Virtual environments, 3D models and sound design.", href: "design.html" }
  ],

  /* ----- The three choices on the Design page (also the small menu on those pages) ----- */
  designPaths: [
    { key: "virtual", title: "Virtual Environments", text: "Worlds and spaces built for games, VR and virtual production.", href: "virtual-environments.html" },
    { key: "models",  title: "3D Models",            text: "Props, characters and objects.",                              href: "3d-models.html" },
    { key: "sound",   title: "Sound Design",         text: "Sound effects, ambience and audio.",                          href: "sound-design.html" }
  ],

  /* ----- VIDEO / REELS ----- */
  video: [
    {
      title: "Project title",
      description: "A short description of the project and what you did on it.",
      tags: ["Editing"],
      media: { type: "youtube", url: "" }
    },
    {
      title: "Reel title",
      description: "Vertical reels and Shorts are shown in phone shape automatically.",
      tags: ["Reel"],
      media: { type: "youtube", url: "" }
    },
    {
      title: "Instagram reel",
      description: "Paste a public Instagram reel link into url. It shows as an Instagram card.",
      tags: ["Reel"],
      media: { type: "instagram", url: "" }
    }
  ],

  /* ----- DESIGN: VIRTUAL ENVIRONMENTS ----- */
  virtual: [
    {
      title: "Environment title",
      description: "What it is, what tools you used, and what you were going for.",
      tags: ["Unreal / Unity", "VR"],
      media: { type: "image", url: "" }
    },
    {
      title: "Another environment",
      description: "Screenshots work well here. Add a walkthrough video too if you have one.",
      tags: ["Game"],
      media: { type: "image", url: "" }
    },
    {
      title: "Walkthrough",
      description: "A YouTube walkthrough of a space.",
      tags: ["Walkthrough"],
      media: { type: "youtube", url: "" }
    }
  ],

  /* ----- DESIGN: 3D MODELS ----- */
  models: [
    {
      title: "Model title",
      description: "Describe the model, the software and the polycount if you like.",
      tags: ["Blender"],
      media: { type: "sketchfab", url: "" }
    },
    {
      title: "Another model",
      description: "Or use a rendered image instead of an interactive viewer.",
      tags: ["Render"],
      media: { type: "image", url: "" }
    },
    {
      title: "Third model",
      description: "Placeholder.",
      tags: ["Prop"],
      media: { type: "image", url: "" }
    }
  ],

  /* ----- DESIGN: SOUND DESIGN ----- */
  sound: [
    {
      title: "Track title",
      description: "What the sound was made for and how you made it.",
      tags: ["SFX"],
      media: { type: "soundcloud", url: "" }
    },
    {
      title: "Ambience",
      description: "You can also use a small audio file from your assets folder.",
      tags: ["Ambience"],
      media: { type: "audio", url: "" }
    },
    {
      title: "Sound for video",
      description: "Sound design over a video clip.",
      tags: ["Video"],
      media: { type: "youtube", url: "" }
    }
  ]
};
