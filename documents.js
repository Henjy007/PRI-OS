// ==========================================
// DOCUMENT DATABASE ARCHITECTURE
// ==========================================
const DOCUMENTS = {
  "test_001": {
    archivedOn: "07/09/2026",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - CLASSIFIED RECORD" },
      { type: "text", value: "Subject: Initial terminal testing sequence." },
      { type: "pause", duration: 1000 },
      { type: "text", value: "Status: All subsystem parameters nominal." }
    ]
  },
  "test_002": {
    archivedOn: "08/09/2026",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - VIDEO ARCHIVE" },
      { type: "video", url: "https://cdn.medal.tv/1080p/content/uploaded/nvnogn9UZwgK_ya89.mp4" },
      { type: "text", value: "End of media transmission." }
    ]
  },
  "test_003": {
    archivedOn: "11/09/2026",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - CLASSIFIED REPORT" },
      { type: "image", url: "images/doc_page1.png", alt: "Document Page 1" },
      { type: "image", url: "images/doc_page2.png", alt: "Document Page 2" },
      { type: "pause", duration: 500 },
      { type: "video", url: "https://cdn.medal.tv/1080p/content/uploaded/nvnogn9UZwgK_ya89.mp4" },
      { type: "text", value: "End of media transmission." }
    ]
  }
};
