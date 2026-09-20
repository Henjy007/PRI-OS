// ==========================================
// DOCUMENT DATABASE ARCHITECTURE
// ==========================================
const DOCUMENTS = {
  "test_001": {
    archivedOn: "09/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - BASIC TEST 001" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/6RP7CH2n/Screenshot-2026-09-15-160006.png", alt: "test_001-photo1" },
      { type: "text", value: " " },
      { type: "pause", duration: 1000 },
      { type: "video", url: "https://medal.tv/clip/nvnogn9UZwgK_ya89/embed" },
      { type: "text", value: " " },
      { type: "pause", duration: 250 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  },
  
  "test_002": {
    archivedOn: "13/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - ADVANCED TEST 002" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/jv43L4Xj/PRI-Advanced-test-002-images-0.jpg", alt: "test_002-photo1" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/wFD0tjDh/PRI-Advanced-test-002-images-1.jpg", alt: "test_002-photo2" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/dwPcVPmx/PRI-Advanced-test-002-images-2.jpg", alt: "test_002-photo3" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/pBPgNjDN/PRI-Advanced-test-002-images-3.jpg", alt: "test_002-photo4" },
      { type: "text", value: " " },
      { type: "pause", duration: 1000 },
      { type: "video", url: "https://medal.tv/clip/nwaU4cvIRV-0pP82T/embed" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/Fq0JJsW0/PRI-Advanced-test-002-images-4.jpg", alt: "test_002-photo5" },
      { type: "text", value: " " },
      { type: "pause", duration: 250 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  },

 "test_003": {
    archivedOn: "15/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - ADVANCED TEST 003" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/w2CV70c/PRI-Advanced-test-003-images-0.jpg", alt: "test_003-photo1" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/cXQ47LSk/PRI-Advanced-test-003-images-1.jpg", alt: "test_003-photo2" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/wh5KpQ39/PRI-Advanced-test-003-images-2.jpg", alt: "test_003-photo3" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/N2XpQMZH/PRI-Advanced-test-003-images-3.jpg", alt: "test_003-photo4" },
      { type: "text", value: " " },
      { type: "pause", duration: 1000 },
      { type: "video", url: "https://medal.tv/clip/nx0PySApptTEOjCuW/embed" },
      { type: "text", value: " " },
      { type: "pause", duration: 250 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  },

"test_004": {
    archivedOn: "19/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - ADVANCED TEST 004" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/601XqX6H/PRI-Advanced-test-004-images-0.jpg", alt: "test_004-photo1" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/XrLsf017/PRI-Advanced-test-004-images-1.jpg", alt: "test_004-photo2" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/JWnLB3My/PRI-Advanced-test-004-images-2.jpg", alt: "test_004-photo3" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/xnhhKx5/PRI-Advanced-test-004-images-3.jpg", alt: "test_004-photo4" },
      { type: "text", value: " " },
      { type: "pause", duration: 1000 },
      { type: "video", url: "https://medal.tv/clip/nyGlmza2B8OFiVPCu/embed" },
      { type: "text", value: " " },
      { type: "pause", duration: 250 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  },

"test_005": {
    archivedOn: "20/09/19XX",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - UNCLASSIFIED RECORD" },
      { type: "text", value: "TITLE - ADVANCED TEST 005" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/4nSQdVT2/PRI-Advanced-test-005-images-0.jpg", alt: "test_004-photo1" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/TM9nrnpN/PRI-Advanced-test-005-images-1.jpg", alt: "test_004-photo2" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/k21wmSP7/PRI-Advanced-test-005-images-2.jpg", alt: "test_004-photo3" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "image", url: "https://i.ibb.co/TxhKnCkf/PRI-Advanced-test-005-images-3.jpg", alt: "test_004-photo4" },
      { type: "text", value: " " },
      { type: "pause", duration: 1000 },
      { type: "video", url: "https://medal.tv/clip/nz6JRaOBZi6OsvisV/embed" },
      { type: "text", value: " " },
      { type: "pause", duration: 750 },
      { type: "text", value: "img_001" },
      { type: "image", url: "https://i.ibb.co/VpQ2nKB4/image.png", alt: "test_005/img_001" },
      { type: "text", value: " " },
      { type: "pause", duration: 250 },
      { type: "text", value: "End of document." },
      { type: "text", value: " " }
    ]
  },
  
}
