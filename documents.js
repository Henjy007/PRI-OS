// ==========================================
// DOCUMENT DATABASE ARCHITECTURE
// ==========================================
const DOCUMENTS = {
  "test_001": {
    archivedOn: "09/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - BASIC TEST 001" },
      { type: "pause", duration: 1000 },
      { type: "image", url: "https://i.imgur.com/G8cFA3s.png", alt: "test_001-photo1" },
      { type: "pause", duration: 1000 },
      { type: "video", url: "https://medal.tv/clip/nvnogn9UZwgK_ya89/embed" },
      { type: "pause", duration: 1000 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  },
  
  "placeholder": {
    archivedOn: "12/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - PLACEHOLDER" },
      { type: "pause", duration: 1000 },
      { type: "video", // Uses iframe under the hood in your script
        url: "https://docs.google.com/document/d/14fDPWCguIFOlaAD6rkCCtMgKZzVlTFoikuNM9G1EcsA/edit?tab=t.0" },
      { type: "pause", duration: 1000 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  }
}
