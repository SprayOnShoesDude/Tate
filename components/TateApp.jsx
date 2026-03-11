"use client";
import { useState, useEffect, useRef } from "react";

const LIGHT = {
  sky: "#e8f4fd", skyDeep: "#c5e3f7", cloud: "#ffffff",
  accent: "#7bb8d4", accentSoft: "#a8d4e8", accentDeep: "#4a90b8",
  blush: "#e8c5d4", lavender: "#c5c8e8",
  text: "#3a5a6e", textSoft: "#7a9ab0", textFaint: "#b0c8d4", gold: "#d4a84b",
  bg: "linear-gradient(180deg, #c5e3f7 0%, #e8f4fd 45%, #f0eeff 100%)",
  cardBg: "rgba(255,255,255,0.68)", cardBorder: "rgba(255,255,255,0.95)",
  headerBg: "rgba(232,244,253,0.9)", navBg: "rgba(232,244,253,0.94)",
  readerBg: "rgba(248,245,240,0.99)", readerHeader: "rgba(248,245,240,0.95)",
};

const DARK = {
  sky: "#141e2a", skyDeep: "#0e1620", cloud: "#1e2d3d",
  accent: "#5a9ab8", accentSoft: "#4a8aaa", accentDeep: "#7bbcd4",
  blush: "#5a3a48", lavender: "#3a3d5a",
  text: "#c8dce8", textSoft: "#7a9ab0", textFaint: "#4a6a7a", gold: "#c49a3a",
  bg: "linear-gradient(180deg, #0e1620 0%, #141e2a 45%, #1a1628 100%)",
  cardBg: "rgba(20,32,44,0.85)", cardBorder: "rgba(90,154,184,0.15)",
  headerBg: "rgba(14,22,32,0.95)", navBg: "rgba(14,22,32,0.97)",
  readerBg: "rgba(16,22,30,0.99)", readerHeader: "rgba(16,22,30,0.97)",
};

const books = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", cover: "🌙", progress: 68, mood: "Reflective", listeners: 2341, accent: "#7bb8d4", bg: "linear-gradient(135deg, #c5dff0, #e8f4fd)" },
  { id: 2, title: "Demon Copperhead", author: "Barbara Kingsolver", cover: "🌿", progress: 32, mood: "Gritty", listeners: 1890, accent: "#8dbfa0", bg: "linear-gradient(135deg, #c8e6d4, #eaf5ee)" },
  { id: 3, title: "Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "🕰️", progress: 91, mood: "Nostalgic", listeners: 3102, accent: "#b8a0d4", bg: "linear-gradient(135deg, #ddd0f0, #f2eeff)" },
  { id: 4, title: "Yellowface", author: "R.F. Kuang", cover: "🪶", progress: 15, mood: "Tense", listeners: 4210, accent: "#d4a87b", bg: "linear-gradient(135deg, #f0dfc5, #fdf5e8)" },
];

const friends = [
  { name: "Ava", avatar: "🌸", reading: "The Midnight Library", progress: 72, streak: 14 },
  { name: "Marcus", avatar: "☁️", reading: "Yellowface", progress: 45, streak: 31 },
  { name: "Priya", avatar: "🌙", reading: "Demon Copperhead", progress: 88, streak: 7 },
  { name: "Theo", avatar: "🕊️", reading: "Tomorrow, and Tomorrow", progress: 60, streak: 22 },
];

const annotations = [
  { user: "Ava 🌸", text: "This paragraph destroyed me. The metaphor is perfect.", paragraph: 1, likes: 42 },
  { user: "Matt Haig 🪶", text: "This was the hardest chapter to write.", paragraph: 3, likes: 891 },
  { user: "Marcus ☁️", text: "Plot twist incoming — don't get too comfortable.", paragraph: 5, likes: 127 },
];

const reviews = [
  { user: "bookish.ava", text: "read this wrapped in a blanket on a sunday ☁️ pure peace", emoji: "🌸", likes: 3401 },
  { user: "theo.reads", text: "finished this at 2am softly crying, 10/10", emoji: "🕊️", likes: 2819 },
  { user: "priya.pages", text: "the writing feels like drifting through clouds honestly", emoji: "🌙", likes: 1923 },
];

const chapters = [
  {
    number: 4, title: "The Library Between Lives",
    paragraphs: [
      "The library contained every book that had ever been written, and every book that could have been written. It was not a metaphor. It was not a dream. It was the space between worlds, where every choice existed simultaneously — a cathedral of infinite possibility stretching endlessly into the soft grey light.",
      "Nora stepped forward, her fingers trailing across the spines of books she recognized and books she'd never read. Each one pulsed faintly, like a sleeping heartbeat. The light here was neither day nor night; it was the colour of early morning when the world holds its breath before deciding what kind of day to be.",
      "The librarian watched from the desk ahead, patient as stone, warm as candlelight. Around her, dust motes hung suspended in the air — or perhaps they were not dust at all, but the remnants of unwritten sentences, stories that had never quite found their way into the world.",
      "\"How do I choose?\" Nora whispered. Her voice didn't echo here. It simply dissolved into the hush, absorbed by ten thousand spines of ten thousand lives she hadn't lived.",
      "\"You don't,\" said the librarian. \"You simply begin. And in beginning, you become.\"",
      "Nora reached for the nearest book. Its cover was the colour of a winter morning — pale and full of promise. When she opened it, the pages smelled of rain on cobblestones, of Earl Grey, of something she couldn't name but had always been searching for.",
      "She read the first line. Then the second. By the third, she had forgotten she was standing in a library at all. She was somewhere else entirely — a cottage on the edge of a cliff, storm clouds massing over a steel-grey sea, a letter in her hand that she hadn't yet opened but already knew would change everything.",
      "That was the thing about books, she thought. They didn't take you away from your life. They took you deeper into it, into the parts you didn't know were missing until a sentence reached into your chest and pulled something loose.",
      "She turned the page. The library breathed around her — a slow, gentle exhalation, as if it had been waiting a very long time for someone to finally pay attention.",
    ]
  },
  {
    number: 5, title: "What the Spine Remembers",
    paragraphs: [
      "Time moved differently here. Nora was not sure how long she had been reading — it could have been minutes, or it could have been something that had no name in the language of clocks. The librarian had not moved. The light had not changed.",
      "At some point, she became aware of other presences in the stacks. Shapes that drifted between the shelves like smoke given memory. They did not speak. They did not look at her. They moved with the quiet purpose of people searching for something they could not quite describe.",
      "She recognized one of them — or thought she did. A woman in a yellow coat, her hair loose, her face turned away. There was something familiar in the slope of her shoulders, the way she reached for a book and then pulled her hand back at the last moment, as if reconsidering.",
      "\"Who are they?\" Nora asked.",
      "\"Readers,\" said the librarian, without looking up. \"Everyone who ever needed a story and didn't know which one.\"",
      "\"Are they stuck?\"",
      "\"No one is stuck here. They are simply... between.\" The librarian folded her hands. \"As you are.\"",
      "Nora looked back at the woman in the yellow coat. She had stopped in front of a shelf that seemed to glow faintly — a warm amber light, the color of a lamp in a window on a cold night. Her hand reached out again. This time, she didn't pull back.",
      "The book she chose was small and green, with no title on the spine. She held it the way you hold something you've been looking for your whole life without knowing it — carefully, and with a kind of disbelief.",
      "Nora felt something shift inside her. Not a decision, exactly. More like the moment before a decision, the breath before the word, when all of it is still possible and nothing has yet been lost.",
    ]
  },
  {
    number: 6, title: "A Door That Was Always Open",
    paragraphs: [
      "She found her own shelf by accident — which is to say, she found it the only way anything true is ever found.",
      "She had been walking for what felt like hours, trailing her fingers along the cool spines, reading titles in languages she didn't know and somehow understood. And then her hand stopped. Not because she told it to. Because the book stopped it.",
      "It was the size of a paperback but heavier than it should have been, as if it contained more than paper and ink — as if it contained weather. The cover was the deep blue of the sky at the exact moment between dusk and dark, when the first star appears and you're not sure if you imagined it.",
      "Her name was on the spine. Not printed — written, in handwriting she recognized as her own, though she had no memory of writing it.",
      "She stood there for a long time.",
      "\"That one,\" said the librarian from somewhere behind her, \"has been waiting the longest.\"",
      "\"What's in it?\"",
      "\"Everything you chose. And everything you didn't. And the space between those two things, which is where most of a life actually happens.\"",
      "Nora opened it. The first page was blank. The second was blank too. But on the third, in small and careful letters, were the words: *You are here. You have always been here. The only question is what you do next.*",
      "She closed the book gently. She held it against her chest. Outside — if there was an outside — something that might have been morning was beginning to happen.",
      "She walked back to the librarian's desk, the book tucked under her arm, and she said: \"I think I'd like to begin.\"",
      "The librarian smiled. It was the smile of someone who has heard those words ten thousand times and still finds them, every single time, quietly extraordinary.",
      "\"Good,\" she said. \"That is always the right answer.\"",
    ]
  }
];

const bookHeatData = {
  1: [2,4,7,9,6,3,8,5,4,7,10,6,3,5,8,2,9,4,6,3],
  2: [1,3,5,4,8,6,2,7,9,5,3,6,4,8,7,2,5,3,6,9],
  3: [3,6,4,8,5,9,7,2,6,4,8,5,3,7,6,9,4,5,8,6],
  4: [5,2,8,6,3,7,4,9,5,6,2,8,7,3,5,4,9,6,3,7],
};

const paraHeatData = {
  0: [3,8,2,9,5,4,6,3,7],
  1: [2,4,7,1,3,6,2,8,5],
  2: [4,6,3,5,2,9,4,7,6,8,3,5,2],
};

function Cloud({ style, dark }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      background: dark ? "rgba(90,154,184,0.07)" : "rgba(255,255,255,0.55)",
      filter: "blur(22px)",
      animation: "driftSlow 7s ease-in-out infinite",
      ...style
    }} />
  );
}

function BookHeatmap({ bookId, accent }) {
  const data = bookHeatData[bookId] || [];
  const max = Math.max(...data, 1);
  return (
    <div>
      <div style={{ fontSize: 10, color: "#b0c8d4", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "'Nunito', sans-serif", marginBottom: 5 }}>
        ANNOTATION HEAT · {data.length} CHAPTERS
      </div>
      <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 24 }}>
        {data.map((val, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 2,
            height: `${Math.max(20, (val / max) * 100)}%`,
            background: `${accent}${Math.round(30 + (val / max) * 200).toString(16).padStart(2, "0")}`,
            minWidth: 3,
          }} />
        ))}
      </div>
    </div>
  );
}

function ReaderProgress({ containerRef, accent }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);
  const r = 7, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px 5px 7px", background: "#f5ede0", border: "1px solid rgba(180,155,120,0.3)", borderRadius: 8, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}>
      <svg width="16" height="16" viewBox="0 0 18 18">
        <circle cx="9" cy="9" r={r} fill="none" stroke="rgba(160,130,100,0.2)" strokeWidth="2" />
        <circle cx="9" cy="9" r={r} fill="none" stroke={accent} strokeWidth="2"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          strokeLinecap="round" transform="rotate(-90 9 9)"
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
      </svg>
      <span style={{ fontSize: 11, fontWeight: 600, color: "#7a6050", fontFamily: "'Nunito', sans-serif", minWidth: 24, textAlign: "center" }}>{Math.round(pct)}%</span>
    </div>
  );
}

function ScrollProgressBar({ color, containerRef }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);
  return (
    <div style={{ height: 2, background: "rgba(123,184,212,0.12)", position: "sticky", top: 49, zIndex: 9 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color || "#7bb8d4", transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function TateApp() {
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(false);
  const C = darkMode ? DARK : LIGHT;
  const w = (a) => darkMode ? `rgba(255,255,255,${a * 0.06})` : `rgba(255,255,255,${a})`;
  const wb = (a) => darkMode ? `rgba(90,154,184,${a * 0.4})` : `rgba(255,255,255,${a})`;

  const [tab, setTab] = useState("home");
  const [profileTab, setProfileTab] = useState("stats");
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("read");
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [activeBook, setActiveBook] = useState(books[0]);
  const [ink, setInk] = useState(2847);
  const [streak] = useState(19);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(68);
  const [cheered, setCheered] = useState({});
  const intervalRef = useRef(null);
  const readerRef = useRef(null);
  const holdTimer = useRef(null);
  const [userAnnotations, setUserAnnotations] = useState([]);
  const [annotationModal, setAnnotationModal] = useState(null);
  const [annotationDraft, setAnnotationDraft] = useState("");
  const [likedAnnotations, setLikedAnnotations] = useState({});
  const [likePopup, setLikePopup] = useState(null);
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replies, setReplies] = useState({});
  const [viewBookModal, setViewBookModal] = useState(null);
  const [searchState, setSearchState] = useState({ query: "", aiOpen: false, focused: false });
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [marketBookDetail, setMarketBookDetail] = useState(null);
  const [activeGenre, setActiveGenre] = useState(null);
  const [conversationOpen, setConversationOpen] = useState(null);
  const [convReplyDraft, setConvReplyDraft] = useState("");
  const [convReplyingTo, setConvReplyingTo] = useState(null);
  const [annThreads, setAnnThreads] = useState({
    "0-1": [
      { user: "Priya 🌙", text: "Right?? I had to put the book down for a minute.", likes: 12, liked: false },
      { user: "Theo 🕊️", text: "Same. The whole chapter hits different on a reread.", likes: 8, liked: false },
    ],
    "0-3": [
      { user: "bookish.ava", text: "The fact that he wrote this as a note to his future self makes this even heavier.", likes: 31, liked: false },
    ],
  });

  const addToCart = (book) => {
    setCart(c => {
      const exists = c.find(i => i.title === book.title);
      if (exists) return c.map(i => i.title === book.title ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...book, qty: 1 }];
    });
  };
  const removeFromCart = (title) => setCart(c => c.filter(i => i.title !== title));
  const cartTotal = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => setPlayerProgress(p => Math.min(p + 0.1, 100)), 300);
    } else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const handleAISearch = async () => {
    if (!aiQuery.trim()) return;
    setLoadingAI(true); setAiResponse("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are tate's AI Reading Companion — a gentle, poetic digital librarian. When users describe a mood, feeling, or moment, recommend 3 books with soft atmospheric descriptions. Format each as: **Title** by Author — [1-sentence dreamy mood description]. Keep it gentle, evocative, and beautiful. No bullet points, flowing prose only.",
          messages: [{ role: "user", content: `I want a book that feels like: ${aiQuery}` }]
        })
      });
      const data = await res.json();
      setAiResponse(data.content?.[0]?.text || "The clouds are quiet right now. Try again.");
    } catch { setAiResponse("The mist has settled. Check your connection and try again."); }
    setLoadingAI(false);
  };

  const cheer = (name) => {
    setCheered(c => ({ ...c, [name]: !c[name] }));
    setInk(i => cheered[name] ? i - 10 : i + 10);
  };

  const card = (extra = {}) => ({
    background: C.cardBg, borderRadius: 20,
    border: `1px solid ${C.cardBorder}`,
    boxShadow: darkMode ? "0 2px 18px rgba(0,0,0,0.3)" : "0 2px 18px rgba(123,184,212,0.1)",
    ...extra
  });

  const isReading = tab === "books" && activeBook.reading === "read";

  const navItems = [
    { id: "home", icon: "✦", label: "Home" },
    { id: "books", icon: "📖", label: "Library" },
    { id: "discover", icon: "🌙", label: "Discover" },
    { id: "social", icon: "☁️", label: "Social" },
    { id: "profile", icon: "🌿", label: "Profile" },
  ];

  // ─── MARKETPLACE DATA ───────────────────────────────────────────
  const allBooks = [
    { id: 1, title: "James", author: "Percival Everett", cover: "🌊", price: "$14.99", genre: "Literary Fiction", rating: 4.9, reviews: 3241, accent: "#7bb8d4", bg: "linear-gradient(135deg, #c5dff0, #e8f4fd)", tag: "Booker Winner", desc: "A reimagining of Huckleberry Finn through the perspective of the enslaved Jim — lyrical, devastating, and quietly revolutionary." },
    { id: 2, title: "All Fours", author: "Miranda July", cover: "🌸", price: "$13.99", genre: "Literary Fiction", rating: 4.7, reviews: 1872, accent: "#d4a8c0", bg: "linear-gradient(135deg, #f0d8e8, #fdf0f8)", tag: "Staff Pick", desc: "A woman in her 40s takes an unplanned detour on a cross-country drive and loses herself — and finds something stranger." },
    { id: 3, title: "The Women", author: "Kristin Hannah", cover: "🕊️", price: "$16.99", genre: "Historical", rating: 4.8, reviews: 5108, accent: "#a8b8d4", bg: "linear-gradient(135deg, #d8e0f0, #eef2ff)", tag: "Bestseller", desc: "A young woman follows her brother to Vietnam and discovers that women, too, can be heroes — and broken by war." },
    { id: 4, title: "Intermezzo", author: "Sally Rooney", cover: "🌙", price: "$12.99", genre: "Literary Fiction", rating: 4.6, reviews: 2890, accent: "#b8a0d4", bg: "linear-gradient(135deg, #ddd0f0, #f2eeff)", tag: "New", desc: "Two grieving brothers navigate love and loss in Rooney's most expansive novel yet." },
    { id: 5, title: "The God of the Woods", author: "Liz Moore", cover: "🌿", price: "$11.99", genre: "Mystery", rating: 4.5, reviews: 1654, accent: "#8dbfa0", bg: "linear-gradient(135deg, #c8e6d4, #eaf5ee)", tag: "Editor's Pick", desc: "A girl vanishes from an Adirondack summer camp in 1975 — and her disappearance will unravel secrets buried for decades." },
    { id: 6, title: "Orbital", author: "Samantha Harvey", cover: "☁️", price: "$10.99", genre: "Literary Fiction", rating: 4.8, reviews: 980, accent: "#7bb8d4", bg: "linear-gradient(135deg, #c5dff0, #e8f4fd)", tag: "Booker Winner", desc: "Six astronauts orbit the Earth sixteen times in one day. A meditation on distance, home, and the fragile blue below." },
    { id: 7, title: "Long Island", author: "Colm Tóibín", cover: "🌾", price: "$13.49", genre: "Literary Fiction", rating: 4.4, reviews: 1230, accent: "#d4b87b", bg: "linear-gradient(135deg, #f0dfc5, #fdf5e8)", tag: "New", desc: "Eilis returns to Ireland after decades in America, carrying a secret that could unravel everything she has built." },
    { id: 8, title: "The Frozen River", author: "Ariel Lawhon", cover: "🌨️", price: "$12.49", genre: "Historical", rating: 4.7, reviews: 2103, accent: "#a8c8d4", bg: "linear-gradient(135deg, #d8eef8, #eef8ff)", tag: "Bestseller", desc: "Based on the true story of Martha Ballard — midwife, healer, witness — who investigates a murder in 1789 Maine." },
    { id: 9, title: "Here One Moment", author: "Liane Moriarty", cover: "🌱", price: "$14.49", genre: "Mystery", rating: 4.5, reviews: 1876, accent: "#90c090", bg: "linear-gradient(135deg, #d0ead8, #eefaee)", tag: "Staff Pick", desc: "A woman on a flight begins predicting the deaths of other passengers. Who will believe her — and can fate be changed?" },
    { id: 10, title: "Starter Villain", author: "John Scalzi", cover: "🌩️", price: "$9.99", genre: "Sci-Fi", rating: 4.6, reviews: 3412, accent: "#b0a0d4", bg: "linear-gradient(135deg, #d8d0f0, #f0eeff)", tag: "Bestseller", desc: "A man inherits his uncle's supervillain empire — complete with a volcano lair and unionized cats." },
    { id: 11, title: "Happy Place", author: "Emily Henry", cover: "🌻", price: "$11.49", genre: "Romance", rating: 4.7, reviews: 4891, accent: "#d4c07b", bg: "linear-gradient(135deg, #f0e8c5, #fffaee)", tag: "Bestseller", desc: "Former couple Harriet and Wyn must pretend to still be together for one last vacation with their friends." },
    { id: 12, title: "In the Lives of Puppets", author: "TJ Klune", cover: "🤖", price: "$10.99", genre: "Sci-Fi", rating: 4.8, reviews: 2234, accent: "#8dbfa0", bg: "linear-gradient(135deg, #c8e6d4, #eaf5ee)", tag: "Editor's Pick", desc: "A boy raised by robots ventures into a mechanical world to rescue his android father — a Pinocchio story reimagined." },
  ];

  const marketGenres = [
    { name: "All", icon: "✦", color: C.accent },
    { name: "Literary Fiction", icon: "🪶", color: C.accent },
    { name: "Mystery", icon: "🌙", color: "#b8a0d4" },
    { name: "Romance", icon: "🌸", color: "#d4a8c0" },
    { name: "Sci-Fi", icon: "☁️", color: "#8dbfa0" },
    { name: "Historical", icon: "🕰️", color: "#d4b87b" },
  ];

  const marketSearch = searchState.query;
  const setMarketSearch = (v) => setSearchState(s => ({ ...s, query: v }));
  const showAIPanel = searchState.aiOpen;
  const setShowAIPanel = (v) => setSearchState(s => ({ ...s, aiOpen: v }));
  const searchFocused = searchState.focused;
  const setSearchFocused = (v) => setSearchState(s => ({ ...s, focused: v }));

  const genreFiltered = activeGenre && activeGenre !== "All"
    ? allBooks.filter(b => b.genre === activeGenre)
    : allBooks;
  const searchFiltered = marketSearch
    ? allBooks.filter(b =>
        b.title.toLowerCase().includes(marketSearch.toLowerCase()) ||
        b.author.toLowerCase().includes(marketSearch.toLowerCase()) ||
        b.genre.toLowerCase().includes(marketSearch.toLowerCase())
      )
    : [];

  // ─── RENDER ─────────────────────────────────────────────────────
  return (
    <div style={{
      fontFamily: "'Nunito', sans-serif",
      background: C.sky, minHeight: "100vh",
      color: C.text,
      display: "flex",
      transition: "background 0.4s ease, color 0.4s ease",
      position: "relative",
      overflow: "hidden",
      maxWidth: isMobile ? 420 : "none",
      margin: isMobile ? "0 auto" : "0",
    }}>
      {/* Background gradient */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: C.bg, pointerEvents: "none", transition: "background 0.4s ease" }} />

      {/* Floating clouds */}
      <Cloud dark={darkMode} style={{ width: 320, height: 130, top: 40, left: -80, animationDelay: "0s", animationDuration: "8s", zIndex: 0 }} />
      <Cloud dark={darkMode} style={{ width: 240, height: 100, top: 120, right: -60, animationDelay: "2s", animationDuration: "10s", zIndex: 0 }} />
      <Cloud dark={darkMode} style={{ width: 180, height: 80, bottom: 200, left: "30%", animationDelay: "4s", animationDuration: "7s", zIndex: 0 }} />

      {/* ─── MOBILE TOP HEADER ─── */}
      {isMobile && !isReading && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.headerBg, backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.cardBorder}`, padding: "14px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ filter: "drop-shadow(0 2px 6px rgba(123,184,212,0.4))", flexShrink: 0 }}>
              <rect width="36" height="36" rx="10" fill="url(#tgm)" />
              <path d="M8 10 Q8 9 9 9 L17 10.5 L17 26 L9 24.5 Q8 24.5 8 23.5 Z" fill="rgba(255,255,255,0.9)" />
              <path d="M19 10.5 L27 9 Q28 9 28 10 L28 23.5 Q28 24.5 27 24.5 L19 26 Z" fill="rgba(255,255,255,0.75)" />
              <line x1="18" y1="10" x2="18" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="10" y1="29" x2="26" y2="29" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="27" x2="26" y2="29" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" />
              <defs><linearGradient id="tgm" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#a8d4e8" /><stop offset="100%" stopColor="#b0b8e8" /></linearGradient></defs>
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 22, color: C.accentDeep, letterSpacing: "0.06em" }}>tate.</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", fontWeight: 600 }}>INK</div>
              <div style={{ fontSize: 13, color: C.gold, fontWeight: 600 }}>{ink.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", fontWeight: 600 }}>STREAK</div>
              <div style={{ fontSize: 13, color: C.accentDeep, fontWeight: 600 }}>☁️ {streak}</div>
            </div>
          </div>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR NAV ─── */}
      {!isMobile && !isReading && (
        <div style={{
          position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 100,
          width: 220,
          background: C.navBg, backdropFilter: "blur(24px)",
          borderRight: `1px solid ${C.cardBorder}`,
          display: "flex", flexDirection: "column",
          padding: "28px 16px",
          transition: "background 0.4s ease",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36, paddingLeft: 8 }}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ filter: "drop-shadow(0 2px 6px rgba(123,184,212,0.4))", flexShrink: 0 }}>
              <rect width="36" height="36" rx="10" fill="url(#tateGradSide)" />
              <path d="M8 10 Q8 9 9 9 L17 10.5 L17 26 L9 24.5 Q8 24.5 8 23.5 Z" fill="rgba(255,255,255,0.9)" />
              <path d="M19 10.5 L27 9 Q28 9 28 10 L28 23.5 Q28 24.5 27 24.5 L19 26 Z" fill="rgba(255,255,255,0.75)" />
              <line x1="18" y1="10" x2="18" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1="10" y1="29" x2="26" y2="29" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="27" x2="26" y2="29" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="tateGradSide" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a8d4e8" />
                  <stop offset="100%" stopColor="#b0b8e8" />
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 400, fontSize: 24, color: C.accentDeep, letterSpacing: "0.04em" }}>tate.</span>
          </div>

          {/* Nav items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {navItems.map(({ id, icon, label }) => (
              <button key={id} onClick={() => setTab(id)} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "11px 14px", borderRadius: 14, border: "none",
                background: tab === id
                  ? darkMode ? "rgba(90,154,184,0.18)" : "rgba(123,184,212,0.14)"
                  : "transparent",
                color: tab === id ? C.accentDeep : C.textSoft,
                cursor: "pointer", textAlign: "left",
                fontFamily: "'Nunito', sans-serif", fontSize: 14,
                fontWeight: tab === id ? 600 : 400,
                transition: "all 0.2s",
                borderLeft: tab === id ? `3px solid ${C.accentDeep}` : "3px solid transparent",
              }}>
                <span style={{ fontSize: 18, width: 22, textAlign: "center" }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Stats at bottom of sidebar */}
          <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px" }}>
              <div>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", fontWeight: 600 }}>INK</div>
                <div style={{ fontSize: 15, color: C.gold, fontWeight: 700 }}>{ink.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.1em", fontWeight: 600 }}>STREAK</div>
                <div style={{ fontSize: 15, color: C.accentDeep, fontWeight: 700 }}>☁️ {streak}</div>
              </div>
            </div>
            <button onClick={() => setDarkMode(d => !d)} style={{
              padding: "9px 14px", borderRadius: 12, border: `1px solid ${C.cardBorder}`,
              background: w(0.7), color: C.textSoft, cursor: "pointer",
              fontFamily: "'Nunito', sans-serif", fontSize: 13,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {darkMode ? "☀️ Light mode" : "🌙 Dark mode"}
            </button>
          </div>
        </div>
      )}

      {/* ─── MAIN CONTENT ─── */}
      <div style={{
        marginLeft: isReading ? 0 : (isMobile ? 0 : 220),
        flex: 1, zIndex: 1, position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
      }}>
        {/* ── HOME ── */}
        {tab === "home" && (
          <div style={{ maxWidth: isMobile ? "100%" : 1100, margin: "0 auto", padding: isMobile ? "16px 16px 84px" : "32px 32px", animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.16em", fontWeight: 600, marginBottom: 24 }}>GOOD MORNING · MARCH 2026</div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 14 : 20, marginBottom: 28 }}>
              {/* Now Reading card */}
              <div style={{ ...card({ borderRadius: 24, padding: "28px", background: darkMode ? "linear-gradient(135deg, #0d1a24, #141e2a)" : activeBook.bg, boxShadow: "0 8px 32px rgba(123,184,212,0.2)", gridColumn: "1" }), position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: darkMode ? "rgba(90,154,184,0.06)" : "rgba(255,255,255,0.5)", filter: "blur(40px)" }} />
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.15em", fontWeight: 600, marginBottom: 14 }}>NOW READING</div>
                <div style={{ display: "flex", gap: 18 }}>
                  <div style={{ width: 80, height: 110, borderRadius: 14, flexShrink: 0, background: w(0.75), border: `1px solid ${wb(0.95)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 6px 20px rgba(123,184,212,0.2)", animation: "pulse 4s ease-in-out infinite" }}>{activeBook.cover}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text, lineHeight: 1.35 }}>{activeBook.title}</div>
                    <div style={{ fontSize: 14, color: C.textSoft, marginTop: 4, fontWeight: 300 }}>{activeBook.author}</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 14, alignItems: "center" }}>
                      <div style={{ flex: 1, height: 6, borderRadius: 3, background: w(0.6), overflow: "hidden" }}>
                        <div style={{ width: `${playerProgress}%`, height: "100%", background: `linear-gradient(90deg, ${activeBook.accent}99, ${activeBook.accent})`, borderRadius: 3, transition: "width 0.3s" }} />
                      </div>
                      <span style={{ fontSize: 13, color: darkMode ? C.accentDeep : activeBook.accent, fontWeight: 600 }}>{Math.round(playerProgress)}%</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.textFaint, marginTop: 6 }}>🌊 {activeBook.listeners.toLocaleString()} floating through this</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <button onClick={() => { setActiveBook(b => ({ ...b, reading: "read" })); setTab("books"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 12, background: w(0.85), border: "1px solid rgba(123,184,212,0.3)", color: C.accentDeep, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>🌙 Read</button>
                      <button onClick={() => { setMode("listen"); setActiveBook(b => ({ ...b, reading: "listen" })); setTab("books"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 12, background: w(0.85), border: "1px solid rgba(123,184,212,0.3)", color: C.accentDeep, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>🌊 Listen</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr", gap: 14 }}>
                {[
                  { label: "Books Read", value: "47", icon: "📖", color: C.accentDeep },
                  { label: "Pages This Week", value: "342", icon: "🌿", color: "#8dbfa0" },
                  { label: "Annotations", value: "128", icon: "🪶", color: C.gold },
                  { label: "Friends Active", value: "4", icon: "🌸", color: "#d4a8c0" },
                ].map((s, i) => (
                  <div key={i} style={{ ...card({ borderRadius: 18, padding: "20px" }), display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.08em", fontWeight: 600 }}>{s.label.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends activity */}
            <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.14em", fontWeight: 600, marginBottom: 16 }}>FRIENDS DRIFTING THROUGH PAGES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {friends.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", ...card(), animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
                  <div style={{ fontSize: 28 }}>{f.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{f.name}</span>
                      <span style={{ fontSize: 11, color: C.accentDeep, fontWeight: 600 }}>☁️ {f.streak}d</span>
                    </div>
                    <div style={{ fontSize: 12, color: C.textSoft, fontStyle: "italic", margin: "2px 0" }}>{f.reading}</div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(123,184,212,0.15)", marginTop: 7 }}>
                      <div style={{ width: `${f.progress}%`, height: "100%", background: `linear-gradient(90deg, ${C.accentSoft}, ${C.accent})`, borderRadius: 2 }} />
                    </div>
                  </div>
                  <button onClick={() => cheer(f.name)} style={{ background: cheered[f.name] ? "rgba(168,212,232,0.28)" : w(0.85), border: `1px solid ${cheered[f.name] ? C.accentSoft : "rgba(123,184,212,0.3)"}`, borderRadius: 10, padding: "7px 12px", cursor: "pointer", fontSize: 16, transform: cheered[f.name] ? "scale(1.12)" : "scale(1)", transition: "all 0.2s" }}>👏</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BOOKS (Library) ── */}
        {tab === "books" && !activeBook.reading && (
          <div style={{ maxWidth: isMobile ? "100%" : 1100, margin: "0 auto", padding: isMobile ? "16px 16px 84px" : "32px 32px", animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.16em", fontWeight: 600, marginBottom: 24 }}>YOUR COLLECTION</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {books.map((book, i) => (
                <div key={i} style={{ ...card({ borderRadius: 20, padding: "20px", background: activeBook.id === book.id ? "rgba(168,212,232,0.22)" : C.cardBg, border: `1px solid ${activeBook.id === book.id ? "rgba(123,184,212,0.4)" : C.cardBorder}` }), animation: `fadeUp 0.4s ease ${i * 0.08}s both` }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <div style={{ width: 60, height: 82, borderRadius: 12, flexShrink: 0, background: book.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: "0 4px 14px rgba(123,184,212,0.15)" }}>{book.cover}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text }}>{book.title}</div>
                      <div style={{ fontSize: 13, color: C.textSoft, marginTop: 3, fontWeight: 300 }}>{book.author}</div>
                      <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>✦ {book.mood}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}>
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(123,184,212,0.15)" }}>
                          <div style={{ width: `${book.progress}%`, height: "100%", background: `linear-gradient(90deg, ${book.accent}88, ${book.accent})`, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 12, color: book.accent, fontWeight: 600 }}>{book.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 14, padding: "10px 12px", background: w(0.5), borderRadius: 10 }}>
                    <BookHeatmap bookId={book.id} accent={book.accent} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { setActiveBook({ ...book, reading: "read" }); setPlayerProgress(book.progress); }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: 13, background: w(0.8), border: "1px solid rgba(123,184,212,0.3)", color: C.accentDeep, cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>🌙 Read</button>
                    <button onClick={() => { setActiveBook({ ...book, reading: "listen" }); setPlayerProgress(book.progress); }} style={{ flex: 1, padding: "8px 0", borderRadius: 10, fontSize: 13, background: w(0.8), border: "1px solid rgba(123,184,212,0.3)", color: C.accentDeep, cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>🌊 Listen</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── READER ── */}
        {tab === "books" && activeBook.reading === "read" && (
          <div ref={readerRef} style={{ position: "fixed", inset: 0, zIndex: 200, background: C.readerBg, overflowY: "auto", animation: "fadeUp 0.35s ease", transition: "background 0.4s ease" }}>
            <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px 10px", background: C.readerHeader, backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.cardBorder}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setActiveBook(b => ({ ...b, reading: null }))} style={{ background: w(0.7), border: "1px solid rgba(123,184,212,0.2)", borderRadius: 10, padding: "7px 16px", color: C.textSoft, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>← Library</button>
                <ReaderProgress containerRef={readerRef} accent={activeBook.accent} />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: C.textSoft }}>{activeBook.title}</div>
              <button onClick={() => setShowAnnotations(!showAnnotations)} style={{ background: showAnnotations ? "rgba(168,212,232,0.25)" : w(0.7), border: `1px solid ${showAnnotations ? C.accentSoft : "rgba(123,184,212,0.2)"}`, borderRadius: 10, padding: "7px 16px", color: showAnnotations ? C.accentDeep : C.textSoft, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>💬 {showAnnotations ? "Notes ON" : "Notes"}</button>
            </div>
            <ScrollProgressBar color={activeBook.accent} containerRef={readerRef} />
            <div style={{ textAlign: "center", padding: "12px 0 0", fontSize: 12, color: C.textFaint, fontStyle: "italic" }}>Hold any paragraph to add a note</div>
            <div style={{ padding: "16px 0 80px", lineHeight: 2, fontSize: 17, color: C.text, fontFamily: "'Cormorant Garamond', serif", maxWidth: 680, margin: "0 auto" }}>
              {chapters.map((chapter, ci) => (
                <div key={ci}>
                  <div style={{ textAlign: "center", margin: ci === 0 ? "0 0 36px" : "56px 0 36px" }}>
                    <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.18em", fontFamily: "'Nunito', sans-serif", fontWeight: 600, marginBottom: 10 }}>CHAPTER {chapter.number}</div>
                    <div style={{ fontSize: 22, fontStyle: "italic", color: C.text, lineHeight: 1.3 }}>{chapter.title}</div>
                    <div style={{ width: 36, height: 1, background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, margin: "16px auto 0" }} />
                  </div>
                  {chapter.paragraphs.map((para, pi) => {
                    const communityAnn = annotations.find(a => a.paragraph === (ci === 0 ? pi : -1));
                    const userAnn = userAnnotations.find(a => a.ci === ci && a.pi === pi);
                    const heat = paraHeatData[ci]?.[pi] || 0;
                    return (
                      <div key={pi} style={{ marginBottom: 24, display: "flex", gap: 10 }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 14, paddingTop: 12 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: heat > 0 ? `rgba(212,168,75,${0.15 + (heat / 10) * 0.85})` : "transparent", boxShadow: heat > 6 ? "0 0 5px rgba(212,168,75,0.55)" : "none" }} />
                          {showAnnotations && (
                            <div style={{ width: 2, flex: 1, borderRadius: 2, marginTop: 4, minHeight: 24, background: userAnn ? `linear-gradient(to bottom, #a8d4e8, #7bb8d4)` : communityAnn ? `linear-gradient(to bottom, ${C.blush}, ${C.lavender})` : "rgba(123,184,212,0.08)" }} />
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, borderRadius: 6, padding: "2px 6px", marginLeft: -6, transition: "background 0.2s", userSelect: "none", cursor: "pointer" }}
                            onMouseDown={() => { holdTimer.current = setTimeout(() => { setAnnotationDraft(userAnnotations.find(a => a.ci === ci && a.pi === pi)?.text || ""); setAnnotationModal({ ci, pi }); }, 500); }}
                            onMouseUp={() => clearTimeout(holdTimer.current)}
                            onMouseLeave={() => clearTimeout(holdTimer.current)}
                          >{para}</p>

                          {showAnnotations && communityAnn && (() => {
                            const key = `${ci}-${pi}`;
                            const liked = likedAnnotations[key];
                            const isPopping = likePopup === key;
                            const threadCount = (annThreads[key] || []).length;
                            return (
                              <div style={{ marginTop: 10, padding: "12px 16px", background: liked ? "rgba(232,197,212,0.28)" : "rgba(232,197,212,0.18)", borderRadius: 14, border: `1px solid ${liked ? "rgba(232,140,170,0.45)" : "rgba(232,197,212,0.35)"}`, position: "relative", transition: "all 0.2s" }}>
                                <span style={{ fontSize: 13, color: C.accentDeep, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{communityAnn.user}</span>
                                <p style={{ margin: "4px 0 10px", fontSize: 14, color: C.textSoft, fontStyle: "italic" }}>{communityAnn.text}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                  <button onClick={() => { setLikedAnnotations(l => ({ ...l, [key]: !liked })); if (!liked) { setLikePopup(key); setTimeout(() => setLikePopup(null), 800); } }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ fontSize: 14, transition: "transform 0.2s", transform: isPopping ? "scale(1.5)" : "scale(1)", display: "inline-block" }}>{liked ? "🩷" : "🤍"}</span>
                                    <span style={{ fontSize: 12, color: liked ? "#c06080" : C.textFaint, fontWeight: liked ? 600 : 400 }}>{communityAnn.likes + (liked ? 1 : 0)}</span>
                                  </button>
                                  <button onClick={() => { setConversationOpen(key); setConvReplyDraft(""); setConvReplyingTo(null); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ fontSize: 13 }}>💬</span>
                                    <span style={{ fontSize: 12, color: threadCount > 0 ? C.accentDeep : C.textFaint, fontWeight: threadCount > 0 ? 600 : 400 }}>{threadCount > 0 ? `${threadCount} repl${threadCount === 1 ? "y" : "ies"}` : "Reply"}</span>
                                  </button>
                                </div>
                                {isPopping && <div style={{ position: "absolute", top: "50%", left: "50%", fontSize: 32, pointerEvents: "none", animation: "heartPop 0.6s ease forwards" }}>🩷</div>}
                              </div>
                            );
                          })()}

                          {showAnnotations && userAnn && (
                            <div style={{ marginTop: 10, padding: "10px 16px", background: "rgba(168,212,232,0.18)", borderRadius: 12, border: "1px solid rgba(168,212,232,0.4)" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontSize: 13, color: C.accentDeep, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>You 🌸</span>
                                <button onClick={() => { setAnnotationDraft(userAnn.text); setAnnotationModal({ ci, pi }); }} style={{ background: "none", border: "none", fontSize: 12, color: C.textFaint, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>edit</button>
                              </div>
                              <p style={{ margin: "4px 0 0", fontSize: 14, color: C.textSoft, fontStyle: "italic" }}>{userAnn.text}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ textAlign: "center", padding: "40px 0 20px" }}>
                <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, margin: "0 auto 18px" }} />
                <div style={{ fontSize: 14, color: C.textFaint, fontStyle: "italic" }}>End of sample · Continue reading in full version</div>
              </div>
            </div>

            {/* Annotation modal */}
            {annotationModal && (
              <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(58,90,110,0.35)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={(e) => { if (e.target === e.currentTarget) { setAnnotationModal(null); setAnnotationDraft(""); } }}>
                <div style={{ width: 480, background: "rgba(248,245,240,0.98)", borderRadius: 24, padding: "28px", boxShadow: "0 20px 60px rgba(58,90,110,0.25)", animation: "fadeUp 0.25s ease" }}>
                  <div style={{ fontSize: 12, color: "#7a9ab0", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 14, fontFamily: "'Nunito', sans-serif" }}>YOUR NOTE</div>
                  <textarea autoFocus value={annotationDraft} onChange={e => setAnnotationDraft(e.target.value)} placeholder="What does this paragraph make you think or feel…" style={{ width: "100%", minHeight: 120, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(123,184,212,0.3)", borderRadius: 14, color: "#3a5a6e", padding: "14px 16px", fontSize: 16, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", resize: "none", boxSizing: "border-box", outline: "none", lineHeight: 1.7 }} />
                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    {userAnnotations.find(a => a.ci === annotationModal.ci && a.pi === annotationModal.pi) && (
                      <button onClick={() => { setUserAnnotations(prev => prev.filter(a => !(a.ci === annotationModal.ci && a.pi === annotationModal.pi))); setAnnotationModal(null); setAnnotationDraft(""); }} style={{ padding: "11px 18px", borderRadius: 12, fontSize: 14, background: "rgba(232,197,212,0.3)", border: "1px solid rgba(232,197,212,0.5)", color: "#b07080", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>Delete</button>
                    )}
                    <button onClick={() => { setAnnotationModal(null); setAnnotationDraft(""); }} style={{ flex: 1, padding: "11px 0", borderRadius: 12, fontSize: 14, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(123,184,212,0.25)", color: "#7a9ab0", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>Cancel</button>
                    <button onClick={() => { if (!annotationDraft.trim()) return; setUserAnnotations(prev => { const filtered = prev.filter(a => !(a.ci === annotationModal.ci && a.pi === annotationModal.pi)); return [...filtered, { ci: annotationModal.ci, pi: annotationModal.pi, text: annotationDraft.trim() }]; }); setInk(i => i + 15); setAnnotationModal(null); setAnnotationDraft(""); }} style={{ flex: 2, padding: "11px 0", borderRadius: 12, fontSize: 14, background: `linear-gradient(135deg, ${C.accentSoft}, ${C.accentDeep})`, border: "none", color: "white", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>Save note ✦</button>
                  </div>
                </div>
              </div>
            )}

            {/* Conversation drawer */}
            {conversationOpen && (() => {
              const key = conversationOpen;
              const annKey = key.split("-");
              const ci = parseInt(annKey[0]), pi = parseInt(annKey[1]);
              const original = annotations.find(a => a.paragraph === (ci === 0 ? pi : -1));
              const thread = annThreads[key] || [];
              return (
                <div style={{ position: "fixed", inset: 0, zIndex: 310, background: "rgba(58,90,110,0.4)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={e => { if (e.target === e.currentTarget) { setConversationOpen(null); setConvReplyDraft(""); setConvReplyingTo(null); } }}>
                  <div style={{ width: 520, maxHeight: "80vh", background: "rgba(248,245,240,0.99)", borderRadius: 24, display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(58,90,110,0.2)", animation: "fadeUp 0.25s ease" }}>
                    <div style={{ padding: "20px 24px 14px", borderBottom: "1px solid rgba(123,184,212,0.12)", flexShrink: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#b0c8d4", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>CONVERSATION</span>
                        <button onClick={() => { setConversationOpen(null); setConvReplyDraft(""); setConvReplyingTo(null); }} style={{ background: "none", border: "none", fontSize: 20, color: "#b0c8d4", cursor: "pointer" }}>×</button>
                      </div>
                    </div>
                    <div style={{ overflowY: "auto", flex: 1, padding: "18px 24px" }}>
                      {original && (
                        <div style={{ padding: "14px 16px", background: "rgba(232,197,212,0.2)", borderRadius: 14, border: "1px solid rgba(232,197,212,0.4)", marginBottom: 18 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontSize: 14, color: C.accentDeep, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{original.user}</span>
                            <span style={{ fontSize: 12, color: "#b0c8d4" }}>🩷 {original.likes}</span>
                          </div>
                          <p style={{ margin: "0 0 10px", fontSize: 15, color: C.text, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.6 }}>{original.text}</p>
                          <button onClick={() => { setConvReplyingTo(null); setConvReplyDraft(""); }} style={{ background: "none", border: "none", fontSize: 13, color: C.accentDeep, cursor: "pointer", fontFamily: "'Nunito', sans-serif", padding: 0, fontWeight: 500 }}>↩ Reply to this</button>
                        </div>
                      )}
                      {thread.map((rep, j) => (
                        <div key={j} style={{ marginBottom: 12, padding: "12px 14px", background: rep.isMe ? "rgba(168,212,232,0.18)" : w(0.7), borderRadius: 12, marginLeft: 14, borderLeft: "2px solid rgba(123,184,212,0.2)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 13, color: C.accentDeep, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{rep.user}</span>
                            <button onClick={() => setAnnThreads(t => ({ ...t, [key]: t[key].map((r, ri) => ri === j ? { ...r, liked: !r.liked } : r) }))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 3 }}>
                              <span style={{ fontSize: 13 }}>{rep.liked ? "🩷" : "🤍"}</span>
                              <span style={{ fontSize: 11, color: rep.liked ? "#c06080" : "#b0c8d4" }}>{rep.likes + (rep.liked ? 1 : 0)}</span>
                            </button>
                          </div>
                          <p style={{ margin: 0, fontSize: 14, color: C.textSoft, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>{rep.text}</p>
                        </div>
                      ))}
                      {thread.length === 0 && <div style={{ textAlign: "center", padding: "16px 0", fontSize: 14, color: "#b0c8d4", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>No replies yet — be the first to respond</div>}
                    </div>
                    <div style={{ padding: "14px 24px 24px", borderTop: "1px solid rgba(123,184,212,0.1)", flexShrink: 0 }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <textarea autoFocus value={convReplyDraft} onChange={e => setConvReplyDraft(e.target.value)} placeholder="Write a reply…" style={{ flex: 1, minHeight: 50, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(123,184,212,0.3)", borderRadius: 12, color: C.text, padding: "11px 14px", fontSize: 14, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", resize: "none", outline: "none", lineHeight: 1.5, boxSizing: "border-box" }} />
                        <button onClick={() => { const text = convReplyDraft.trim(); if (!text) return; setAnnThreads(t => ({ ...t, [key]: [...(t[key] || []), { user: "You 🌸", text, likes: 0, liked: false, isMe: true }] })); setConvReplyDraft(""); setConvReplyingTo(null); setInk(i => i + 5); }} style={{ padding: "11px 20px", borderRadius: 12, fontSize: 14, background: `linear-gradient(135deg, ${C.accentSoft}, ${C.accentDeep})`, border: "none", color: "white", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 600, flexShrink: 0 }}>Send</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── AUDIO PLAYER ── */}
        {tab === "books" && activeBook.reading === "listen" && (
          <div style={{ maxWidth: isMobile ? "100%" : 600, margin: "0 auto", padding: isMobile ? "16px 16px 84px" : "32px 32px", animation: "fadeUp 0.35s ease" }}>
            <button onClick={() => setActiveBook(b => ({ ...b, reading: null }))} style={{ background: w(0.75), border: "1px solid rgba(123,184,212,0.25)", borderRadius: 10, padding: "7px 16px", color: C.textSoft, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif", marginBottom: 24 }}>← Library</button>
            <div style={{ ...card({ borderRadius: 28, padding: "40px 32px", background: activeBook.bg, textAlign: "center" }), position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 160, height: 160, borderRadius: "50%", background: w(0.4), filter: "blur(32px)" }} />
              <div style={{ fontSize: 80, marginBottom: 20, animation: isPlaying ? "pulse 1.5s ease-in-out infinite" : "none" }}>{activeBook.cover}</div>
              <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text, marginBottom: 6 }}>{activeBook.title}</div>
              <div style={{ fontSize: 15, color: C.textSoft, marginBottom: 30, fontWeight: 300 }}>{activeBook.author}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: C.textFaint, width: 36 }}>Ch.4</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: w(0.5), overflow: "hidden" }}>
                  <div style={{ width: `${playerProgress}%`, height: "100%", background: `linear-gradient(90deg, ${activeBook.accent}99, ${activeBook.accent})`, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, color: activeBook.accent, fontWeight: 600, width: 36, textAlign: "right" }}>{Math.round(playerProgress)}%</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 28, marginTop: 28 }}>
                <button style={{ background: w(0.6), border: `1px solid ${wb(0.9)}`, borderRadius: "50%", width: 48, height: 48, fontSize: 18, cursor: "pointer", color: C.textSoft }}>⏮</button>
                <button onClick={() => setIsPlaying(!isPlaying)} style={{ width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(135deg, ${activeBook.accent}, ${C.accentDeep})`, border: `3px solid ${wb(0.9)}`, color: "white", fontSize: 26, cursor: "pointer", boxShadow: `0 8px 28px ${activeBook.accent}55` }}>{isPlaying ? "⏸" : "▶"}</button>
                <button style={{ background: w(0.6), border: `1px solid ${wb(0.9)}`, borderRadius: "50%", width: 48, height: 48, fontSize: 18, cursor: "pointer", color: C.textSoft }}>⏭</button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 24 }}>
                {["0.75×", "1×", "1.25×", "1.5×"].map(speed => (
                  <button key={speed} style={{ background: speed === "1×" ? w(0.85) : w(0.4), border: `1px solid ${wb(0.8)}`, borderRadius: 10, padding: "6px 14px", fontSize: 13, color: speed === "1×" ? C.accentDeep : C.textSoft, cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>{speed}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DISCOVER / MARKETPLACE ── */}
        {tab === "discover" && (
          <div style={{ maxWidth: isMobile ? "100%" : 1100, margin: "0 auto", padding: isMobile ? "16px 16px 84px" : "32px 32px", animation: "fadeUp 0.4s ease" }}>

            {/* Search bar + cart */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, position: "relative" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, background: w(0.85), border: `1px solid ${searchFocused ? C.accent : "rgba(123,184,212,0.25)"}`, borderRadius: 16, padding: "13px 18px", boxShadow: searchFocused ? `0 0 0 3px ${C.accent}22` : "none", transition: "all 0.2s" }}>
                <span style={{ fontSize: 16, color: C.textFaint }}>🔍</span>
                <input value={marketSearch} onChange={e => setMarketSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 150)} placeholder="Search books, authors, genres…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 15, color: C.text, fontFamily: "'Nunito', sans-serif" }} />
                {marketSearch && <button onClick={() => setMarketSearch("")} style={{ background: "none", border: "none", color: C.textFaint, cursor: "pointer", fontSize: 18, padding: 0 }}>✕</button>}
              </div>
              <button onClick={() => setCartOpen(true)} style={{ flexShrink: 0, width: 52, height: 52, borderRadius: 16, background: cartCount > 0 ? `linear-gradient(135deg, ${C.accentSoft}, ${C.accent})` : w(0.85), border: `1px solid ${cartCount > 0 ? C.accent : "rgba(123,184,212,0.25)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all 0.2s" }}>
                <span style={{ fontSize: 20 }}>🛒</span>
                {cartCount > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 20, height: 20, borderRadius: "50%", background: C.accentDeep, color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.sky}` }}>{cartCount}</div>}
              </button>

              {/* Dropdown */}
              {searchFocused && !marketSearch && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 72, zIndex: 50, borderRadius: 16, overflow: "hidden", background: darkMode ? "#131e2a" : "#ffffff", border: `1px solid ${darkMode ? "rgba(90,154,184,0.2)" : "rgba(123,184,212,0.2)"}`, boxShadow: darkMode ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(58,90,110,0.18)" }}>
                  <button onClick={() => { setShowAIPanel(true); setSearchFocused(false); }} style={{ width: "100%", padding: "15px 18px", background: darkMode ? "rgba(74,144,184,0.14)" : "rgba(168,212,232,0.18)", border: "none", borderBottom: `1px solid ${C.accent}22`, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 17 }}>✦</span>
                    <div>
                      <div style={{ fontSize: 14, color: C.accentDeep, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>Search with AI</div>
                      <div style={{ fontSize: 12, color: C.textFaint, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>Describe a mood or feeling instead</div>
                    </div>
                  </button>
                  {["new releases", "award winners", "under $10"].map((s, i) => (
                    <button key={i} onClick={() => setMarketSearch(s)} style={{ width: "100%", padding: "13px 18px", background: darkMode ? "#131e2a" : "#ffffff", border: "none", borderBottom: i < 2 ? `1px solid ${C.accent}12` : "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 14, color: C.textFaint }}>🔍</span>
                      <span style={{ fontSize: 14, color: C.textSoft, fontFamily: "'Nunito', sans-serif" }}>{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI panel */}
            {showAIPanel && (
              <div style={{ ...card({ borderRadius: 20, padding: "22px", marginBottom: 24, background: darkMode ? "linear-gradient(135deg, rgba(20,32,44,0.95), rgba(30,45,62,0.9))" : "linear-gradient(135deg, rgba(197,200,232,0.2), rgba(255,255,255,0.85))" }) }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 16, color: C.text, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>✦ Find by mood</div>
                  <button onClick={() => { setShowAIPanel(false); setAiResponse(""); }} style={{ background: "none", border: "none", color: C.textFaint, cursor: "pointer", fontSize: 18 }}>✕</button>
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  <textarea value={aiQuery} onChange={e => setAiQuery(e.target.value)} placeholder={`"a rainy Sunday, something quiet and melancholy…"`} style={{ flex: 1, minHeight: 72, background: w(0.6), border: "1px solid rgba(123,184,212,0.3)", borderRadius: 12, color: C.text, padding: "12px 14px", fontSize: 14, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", resize: "none", boxSizing: "border-box", outline: "none", lineHeight: 1.7 }} />
                  <button onClick={handleAISearch} disabled={loadingAI} style={{ padding: "0 24px", borderRadius: 12, background: loadingAI ? "rgba(168,212,232,0.25)" : `linear-gradient(135deg, ${C.accentSoft}, ${C.lavender})`, border: "none", color: loadingAI ? C.textSoft : C.accentDeep, fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", cursor: loadingAI ? "default" : "pointer", flexShrink: 0 }}>{loadingAI ? "☁️ searching…" : "Find ✦"}</button>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  {["quiet & melancholy", "dark academia", "cozy mystery", "slow-burn romance"].map((m, i) => (
                    <button key={i} onClick={() => setAiQuery(m)} style={{ padding: "5px 14px", borderRadius: 20, fontSize: 12, background: w(0.6), border: `1px solid ${C.accent}44`, color: C.textSoft, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>{m}</button>
                  ))}
                </div>
                {aiResponse && <div style={{ marginTop: 14, fontSize: 14, color: C.textSoft, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1.9, borderTop: `1px solid ${C.accent}20`, paddingTop: 14 }}>{aiResponse}</div>}
              </div>
            )}

            {/* Search results */}
            {marketSearch && (
              <div>
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>{searchFiltered.length} RESULT{searchFiltered.length !== 1 ? "S" : ""} FOR "{marketSearch.toUpperCase()}"</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
                  {searchFiltered.length > 0
                    ? searchFiltered.map((book, i) => {
                        const inCart = cart.some(c => c.title === book.title);
                        return (
                          <div key={i} onClick={() => setMarketBookDetail(book)} style={{ ...card({ borderRadius: 16, padding: "16px" }), display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
                            <div style={{ width: 52, height: 70, borderRadius: 12, background: darkMode ? "rgba(90,154,184,0.1)" : book.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, border: `1px solid ${book.accent}33` }}>{book.cover}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.title}</div>
                              <div style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>{book.author}</div>
                              <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>{"★".repeat(Math.round(book.rating))} <span style={{ color: C.textFaint }}>{book.rating}</span></div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                              <div style={{ fontSize: 15, color: C.accentDeep, fontWeight: 700 }}>{book.price}</div>
                              <button onClick={() => addToCart(book)} style={{ marginTop: 6, padding: "6px 14px", borderRadius: 8, fontSize: 12, background: inCart ? `linear-gradient(135deg, ${C.accentSoft}, ${C.accent})` : w(0.8), border: `1px solid ${inCart ? C.accent : C.accent + "44"}`, color: inCart ? "white" : C.accentDeep, cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 600, transition: "all 0.2s" }}>{inCart ? "✓ Added" : "+ Add"}</button>
                            </div>
                          </div>
                        );
                      })
                    : <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0", color: C.textFaint, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16 }}>No books found for "{marketSearch}"</div>
                  }
                </div>
              </div>
            )}

            {/* Main marketplace */}
            {!marketSearch && (
              <div>
                {/* Featured */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>FEATURED</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                    {allBooks.slice(0, 3).map((book, i) => {
                      const inCart = cart.some(c => c.title === book.title);
                      return (
                        <div key={i} onClick={() => setMarketBookDetail(book)} style={{ borderRadius: 20, cursor: "pointer", background: darkMode ? "#0d1a24" : book.bg, border: `1px solid ${darkMode ? "rgba(90,154,184,0.15)" : "rgba(255,255,255,0.8)"}`, overflow: "hidden", boxShadow: "0 4px 20px rgba(123,184,212,0.14)", transition: "transform 0.2s" }}>
                          <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, background: darkMode ? "rgba(90,154,184,0.08)" : "rgba(255,255,255,0.3)" }}>{book.cover}</div>
                          <div style={{ padding: "14px 16px 16px" }}>
                            <div style={{ fontSize: 11, color: book.accent, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 4 }}>{book.tag}</div>
                            <div style={{ fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text, lineHeight: 1.3 }}>{book.title}</div>
                            <div style={{ fontSize: 12, color: C.textSoft, marginTop: 3 }}>{book.author}</div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                              <span style={{ fontSize: 15, color: C.accentDeep, fontWeight: 700 }}>{book.price}</span>
                              <button onClick={e => { e.stopPropagation(); addToCart(book); }} style={{ padding: "6px 14px", borderRadius: 10, fontSize: 12, background: inCart ? `linear-gradient(135deg, ${book.accent}cc, ${book.accent})` : w(0.75), border: `1px solid ${book.accent}66`, color: inCart ? "white" : C.accentDeep, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>{inCart ? "✓" : "+ Add"}</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Genre pills */}
                <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                  {marketGenres.map((g, i) => {
                    const active = (activeGenre || "All") === g.name;
                    return (
                      <button key={i} onClick={() => setActiveGenre(g.name === "All" ? null : g.name)} style={{ padding: "8px 18px", borderRadius: 22, fontSize: 13, background: active ? `linear-gradient(135deg, ${g.color}cc, ${g.color})` : w(0.75), border: `1px solid ${active ? g.color : g.color + "44"}`, color: active ? "white" : C.textSoft, cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: active ? 600 : 400, transition: "all 0.2s" }}>{g.icon} {g.name}</button>
                    );
                  })}
                </div>

                {/* Book grid */}
                <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 14 }}>{activeGenre ? activeGenre.toUpperCase() : "ALL BOOKS"} · {genreFiltered.length} TITLES</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                  {genreFiltered.map((book, i) => {
                    const inCart = cart.some(c => c.title === book.title);
                    return (
                      <div key={i} onClick={() => setMarketBookDetail(book)} style={{ ...card({ borderRadius: 16, padding: "16px" }), display: "flex", gap: 14, alignItems: "center", cursor: "pointer", transition: "all 0.15s" }}>
                        <div style={{ width: 50, height: 68, borderRadius: 10, background: darkMode ? "rgba(90,154,184,0.1)" : book.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, border: `1px solid ${book.accent}33` }}>{book.cover}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.title}</div>
                          <div style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>{book.author}</div>
                          <div style={{ fontSize: 11, color: C.gold, marginTop: 4 }}>{"★".repeat(Math.round(book.rating))} <span style={{ color: C.textFaint }}>{book.rating} ({book.reviews.toLocaleString()})</span></div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                          <div style={{ fontSize: 15, color: C.accentDeep, fontWeight: 700 }}>{book.price}</div>
                          <button onClick={() => addToCart(book)} style={{ marginTop: 6, padding: "6px 14px", borderRadius: 8, fontSize: 12, background: inCart ? `linear-gradient(135deg, ${C.accentSoft}, ${C.accent})` : w(0.8), border: `1px solid ${inCart ? C.accent : C.accent + "44"}`, color: inCart ? "white" : C.accentDeep, cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 600, transition: "all 0.2s" }}>{inCart ? "✓ Added" : "+ Add"}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Book detail modal */}
            {marketBookDetail && (
              <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(20,30,42,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={e => { if (e.target === e.currentTarget) setMarketBookDetail(null); }}>
                <div style={{ width: 480, background: darkMode ? "#0f1a24" : "#ffffff", borderRadius: 24, padding: "28px", animation: "fadeUp 0.25s ease", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                    <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                      <div style={{ width: 72, height: 98, borderRadius: 14, background: darkMode ? "rgba(90,154,184,0.1)" : marketBookDetail.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, border: `1px solid ${marketBookDetail.accent}33`, flexShrink: 0 }}>{marketBookDetail.cover}</div>
                      <div>
                        <div style={{ fontSize: 11, color: marketBookDetail.accent, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 6 }}>{marketBookDetail.tag}</div>
                        <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text, lineHeight: 1.3 }}>{marketBookDetail.title}</div>
                        <div style={{ fontSize: 14, color: C.textSoft, marginTop: 4 }}>{marketBookDetail.author}</div>
                        <div style={{ fontSize: 13, color: C.gold, marginTop: 6 }}>{"★".repeat(Math.round(marketBookDetail.rating))} {marketBookDetail.rating} <span style={{ color: C.textFaint }}>({marketBookDetail.reviews.toLocaleString()} reviews)</span></div>
                      </div>
                    </div>
                    <button onClick={() => setMarketBookDetail(null)} style={{ background: "none", border: "none", fontSize: 22, color: C.textFaint, cursor: "pointer", padding: 0 }}>✕</button>
                  </div>
                  <div style={{ fontSize: 15, color: C.textSoft, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1.8, marginBottom: 22, padding: "16px 18px", background: w(0.5), borderRadius: 14 }}>{marketBookDetail.desc}</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
                    {[{ label: "Genre", value: marketBookDetail.genre }, { label: "Format", value: "eBook" }, { label: "Price", value: marketBookDetail.price }].map((d, i) => (
                      <div key={i} style={{ ...card({ borderRadius: 12, padding: "12px 16px", flex: 1, textAlign: "center" }) }}>
                        <div style={{ fontSize: 11, color: C.textFaint, marginBottom: 3 }}>{d.label}</div>
                        <div style={{ fontSize: i === 2 ? 16 : 13, color: i === 2 ? C.accentDeep : C.text, fontWeight: i === 2 ? 700 : 600 }}>{d.value}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { addToCart(marketBookDetail); setMarketBookDetail(null); }} style={{ width: "100%", padding: "16px", borderRadius: 16, fontSize: 16, background: cart.some(i => i.title === marketBookDetail.title) ? `linear-gradient(135deg, ${C.accentSoft}, ${C.accent})` : `linear-gradient(135deg, ${marketBookDetail.accent}cc, ${marketBookDetail.accent})`, border: "none", color: "white", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 700, boxShadow: `0 4px 20px ${marketBookDetail.accent}44` }}>
                    {cart.some(i => i.title === marketBookDetail.title) ? "✓ In Cart — Add Another" : `Add to Cart · ${marketBookDetail.price}`}
                  </button>
                </div>
              </div>
            )}

            {/* Cart drawer */}
            {cartOpen && (
              <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(20,30,42,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "flex-end" }} onClick={e => { if (e.target === e.currentTarget) setCartOpen(false); }}>
                <div style={{ height: "100%", width: 420, background: darkMode ? "#0f1a24" : "#ffffff", padding: "28px 24px", animation: "fadeUp 0.25s ease", overflowY: "auto", boxShadow: "-8px 0 40px rgba(0,0,0,0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text }}>🛒 Your Cart {cartCount > 0 && <span style={{ fontSize: 14, color: C.textFaint, fontStyle: "normal" }}>({cartCount} item{cartCount !== 1 ? "s" : ""})</span>}</div>
                    <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 22, color: C.textFaint, cursor: "pointer" }}>✕</button>
                  </div>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                      <div style={{ fontSize: 44, marginBottom: 16 }}>🌿</div>
                      <div style={{ fontSize: 15, color: C.textFaint, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>Your cart is empty — browse the shelves</div>
                    </div>
                  ) : (
                    <>
                      {cart.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.accent}18` }}>
                          <div style={{ width: 46, height: 62, borderRadius: 10, background: darkMode ? "rgba(90,154,184,0.1)" : (item.bg || `linear-gradient(135deg, ${C.skyDeep}, ${C.sky})`), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.cover}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text }}>{item.title}</div>
                            <div style={{ fontSize: 12, color: C.textSoft, marginTop: 2 }}>{item.author}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                              <button onClick={() => setCart(c => c.map(x => x.title === item.title ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} style={{ width: 26, height: 26, borderRadius: 7, background: w(0.7), border: `1px solid ${C.accent}33`, color: C.textSoft, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                              <span style={{ fontSize: 14, color: C.text, fontWeight: 600, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                              <button onClick={() => addToCart(item)} style={{ width: 26, height: 26, borderRadius: 7, background: w(0.7), border: `1px solid ${C.accent}33`, color: C.textSoft, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 14, color: C.accentDeep, fontWeight: 700 }}>${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}</div>
                            <button onClick={() => removeFromCart(item.title)} style={{ marginTop: 4, background: "none", border: "none", fontSize: 12, color: C.textFaint, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>Remove</button>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 22, padding: "16px 18px", background: w(0.5), borderRadius: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontSize: 14, color: C.textSoft }}>Subtotal</span>
                          <span style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ fontSize: 14, color: C.textSoft }}>Ink discount</span>
                          <span style={{ fontSize: 14, color: C.gold, fontWeight: 600 }}>−$0.00</span>
                        </div>
                        <div style={{ height: 1, background: `${C.accent}20`, margin: "12px 0" }} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 17, color: C.text, fontWeight: 700 }}>Total</span>
                          <span style={{ fontSize: 18, color: C.accentDeep, fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => { setCart([]); setCartOpen(false); }} style={{ width: "100%", marginTop: 16, padding: "16px", borderRadius: 16, background: `linear-gradient(135deg, ${C.accentSoft}, ${C.accentDeep})`, border: "none", color: "white", cursor: "pointer", fontSize: 16, fontFamily: "'Nunito', sans-serif", fontWeight: 700, boxShadow: `0 4px 20px ${C.accent}44` }}>Purchase · ${cartTotal.toFixed(2)}</button>
                      <button onClick={() => setCart([])} style={{ width: "100%", marginTop: 10, padding: "11px", borderRadius: 12, background: "none", border: `1px solid ${C.accent}30`, color: C.textFaint, cursor: "pointer", fontSize: 13, fontFamily: "'Nunito', sans-serif" }}>Clear cart</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SOCIAL ── */}
        {tab === "social" && (
          <div style={{ maxWidth: isMobile ? "100%" : 800, margin: "0 auto", padding: isMobile ? "16px 16px 84px" : "32px 32px", animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.14em", fontWeight: 600, marginBottom: 22 }}>PAGES & FEELINGS</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 28 }}>
              {reviews.map((r, i) => (
                <div key={i} style={{ ...card({ borderRadius: 20, padding: "20px" }), animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accentSoft}, ${C.lavender})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{r.emoji}</div>
                    <div>
                      <div style={{ fontSize: 14, color: C.accentDeep, fontWeight: 600 }}>@{r.user}</div>
                      <div style={{ fontSize: 14, color: C.textSoft, fontStyle: "italic", marginTop: 3, fontFamily: "'Cormorant Garamond', serif" }}>{r.text}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 20, marginTop: 14, alignItems: "center" }}>
                    <button onClick={() => setLikedAnnotations(l => ({ ...l, [`review-${i}`]: !l[`review-${i}`] }))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 15 }}>{likedAnnotations[`review-${i}`] ? "🩷" : "🤍"}</span>
                      <span style={{ fontSize: 13, color: likedAnnotations[`review-${i}`] ? "#c06080" : C.textFaint, fontWeight: likedAnnotations[`review-${i}`] ? 600 : 400 }}>{r.likes + (likedAnnotations[`review-${i}`] ? 1 : 0)}</span>
                    </button>
                    <button onClick={() => setReplyOpen(replyOpen === i ? null : i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <span style={{ fontSize: 13, color: replyOpen === i ? C.accentDeep : C.textFaint }}>💬 {replies[i]?.length ? `${replies[i].length} replies` : "Reply"}</span>
                    </button>
                    <button onClick={() => setViewBookModal(r)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <span style={{ fontSize: 13, color: C.textFaint }}>🌿 View Book</span>
                    </button>
                  </div>
                  {replies[i]?.length > 0 && (
                    <div style={{ marginTop: 12, paddingLeft: 14, borderLeft: "2px solid rgba(123,184,212,0.2)" }}>
                      {replies[i].map((rep, j) => (
                        <div key={j} style={{ marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: C.accentDeep, fontWeight: 600 }}>You 🌸 </span>
                          <span style={{ fontSize: 13, color: C.textSoft, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>{rep}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {replyOpen === i && (
                    <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "flex-end" }}>
                      <textarea autoFocus value={replyDrafts[i] || ""} onChange={e => setReplyDrafts(d => ({ ...d, [i]: e.target.value }))} placeholder={`Reply to @${r.user}…`} style={{ flex: 1, minHeight: 64, background: w(0.75), border: "1px solid rgba(123,184,212,0.3)", borderRadius: 12, color: C.text, padding: "10px 14px", fontSize: 14, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", resize: "none", outline: "none", lineHeight: 1.6, boxSizing: "border-box" }} />
                      <button onClick={() => { const text = replyDrafts[i]?.trim(); if (!text) return; setReplies(prev => ({ ...prev, [i]: [...(prev[i] || []), text] })); setReplyDrafts(d => ({ ...d, [i]: "" })); setReplyOpen(null); setInk(ink => ink + 5); }} style={{ padding: "11px 18px", borderRadius: 12, fontSize: 14, background: `linear-gradient(135deg, ${C.accentSoft}, ${C.accentDeep})`, border: "none", color: "white", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontWeight: 600, flexShrink: 0 }}>Send</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.14em", fontWeight: 600, marginBottom: 16 }}>READING CIRCLES</div>
            <div style={{ ...card({ borderRadius: 20, padding: "24px", background: darkMode ? "linear-gradient(135deg, rgba(30,45,62,0.9), rgba(20,32,44,0.85))" : "linear-gradient(135deg, rgba(197,200,232,0.22), rgba(255,255,255,0.72))" }) }}>
              <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginBottom: 6, color: C.text }}>Quiet Hours Book Club</div>
              <div style={{ fontSize: 14, color: C.textSoft, marginBottom: 10 }}>🌿 Donna Tartt · The Secret History</div>
              <div style={{ fontSize: 13, color: C.lavender, marginBottom: 14 }}>🌙 Gentle spoiler lock until Chapter 12</div>
              <div style={{ display: "flex" }}>
                {["🌸", "☁️", "🌙", "🕊️", "+14"].map((e, i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: w(0.85), border: `2px solid ${C.sky}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: i < 4 ? 16 : 10, color: C.textSoft, marginLeft: i > 0 ? -10 : 0 }}>{e}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Book Modal */}
        {viewBookModal && (() => {
          const matched = books.find(b => viewBookModal.text?.toLowerCase().includes(b.title.toLowerCase().split(" ")[0].toLowerCase())) || books[0];
          return (
            <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(58,90,110,0.4)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={e => { if (e.target === e.currentTarget) setViewBookModal(null); }}>
              <div style={{ width: 420, background: matched.bg, borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgba(58,90,110,0.25)", animation: "fadeUp 0.25s ease" }}>
                <div style={{ padding: "28px 24px 18px", position: "relative" }}>
                  <button onClick={() => setViewBookModal(null)} style={{ position: "absolute", top: 16, right: 16, background: w(0.6), border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 16, cursor: "pointer", color: C.textSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 64, height: 88, borderRadius: 12, flexShrink: 0, background: w(0.7), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{matched.cover}</div>
                    <div>
                      <div style={{ fontSize: 18, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text }}>{matched.title}</div>
                      <div style={{ fontSize: 13, color: C.textSoft, marginTop: 3 }}>{matched.author}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div style={{ height: 5, borderRadius: 3, background: w(0.5) }}>
                      <div style={{ width: `${matched.progress}%`, height: "100%", background: `linear-gradient(90deg, ${matched.accent}88, ${matched.accent})`, borderRadius: 3 }} />
                    </div>
                    <div style={{ fontSize: 12, color: C.textFaint, marginTop: 4 }}>{matched.progress}% complete</div>
                  </div>
                </div>
                <div style={{ margin: "0 20px 18px", padding: "12px 16px", background: "rgba(255,255,255,0.5)", borderRadius: 12 }}>
                  <div style={{ fontSize: 12, color: C.textFaint, fontWeight: 600, marginBottom: 4 }}>@{viewBookModal.user} says</div>
                  <div style={{ fontSize: 14, color: C.textSoft, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.6 }}>"{viewBookModal.text}"</div>
                </div>
                <div style={{ display: "flex", gap: 12, padding: "0 20px 24px" }}>
                  <button onClick={() => { setViewBookModal(null); setTab("books"); }} style={{ flex: 1, padding: "12px 0", borderRadius: 12, background: w(0.7), border: `1px solid ${wb(0.9)}`, color: C.accentDeep, cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif" }}>🌿 Library</button>
                  <button onClick={() => { setActiveBook({ ...matched, reading: "read" }); setPlayerProgress(matched.progress); setViewBookModal(null); setTab("books"); }} style={{ flex: 1, padding: "12px 0", borderRadius: 12, background: `linear-gradient(135deg, ${matched.accent}, ${C.accentDeep})`, border: "none", color: "white", cursor: "pointer", fontSize: 14, fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>🌙 Read Now</button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div style={{ maxWidth: isMobile ? "100%" : 900, margin: "0 auto", padding: isMobile ? "16px 16px 84px" : "32px 32px", animation: "fadeUp 0.4s ease" }}>
            {/* Profile header */}
            <div style={{ ...card({ borderRadius: 24, padding: "32px", background: darkMode ? "linear-gradient(160deg, #0e1a26, #1a1628, #1e1a14)" : "linear-gradient(160deg, #c5dff0, #ddd0f0, #f0dfc5)", marginBottom: 20, position: "relative", overflow: "hidden" }) }}>
              <Cloud dark={darkMode} style={{ width: 220, height: 90, top: 10, right: -30, animationDuration: "9s" }} />
              <div style={{ display: "flex", gap: 24, alignItems: "center", position: "relative", zIndex: 1 }}>
                <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, #a8d4e8, #c5c8e8, #e8c5d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, border: `3px solid ${wb(0.95)}`, boxShadow: "0 6px 24px rgba(123,184,212,0.3)", flexShrink: 0 }}>🌸</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: C.text }}>Jordan Ellis</div>
                  <div style={{ fontSize: 14, color: C.textSoft, marginTop: 3 }}>@jordan.reads · member since 2023</div>
                  <div style={{ fontSize: 13, color: C.textSoft, marginTop: 6, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>"always chasing that rainy-day feeling"</div>
                </div>
                <div style={{ display: "flex", gap: 24 }}>
                  {[{ label: "Books", value: "47" }, { label: "Pages", value: "12.4k" }, { label: "Followers", value: "318" }, { label: "Following", value: "142" }].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: C.accentDeep }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.06em" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-tabs */}
            <div style={{ display: "flex", marginBottom: 20, background: C.cardBg, borderRadius: 16, border: `1px solid ${C.cardBorder}`, padding: 5, gap: 5, width: "fit-content" }}>
              {[{ id: "stats", label: "✦ Stats" }, { id: "settings", label: "⚙ Settings" }].map(t => (
                <button key={t.id} onClick={() => setProfileTab(t.id)} style={{ padding: "10px 24px", borderRadius: 12, border: "none", fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", background: profileTab === t.id ? `linear-gradient(135deg, ${C.accentSoft}, ${C.accent})` : "transparent", color: profileTab === t.id ? "white" : C.textFaint }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Stats */}
            {profileTab === "stats" && (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18 }}>
                {/* Ink + Streak */}
                <div style={{ ...card({ borderRadius: 18, padding: "22px", background: darkMode ? "linear-gradient(135deg, rgba(212,168,75,0.1), rgba(20,32,44,0.9))" : "linear-gradient(135deg, rgba(212,168,75,0.12), rgba(255,255,255,0.7))" }) }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>🌊</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: C.gold }}>{ink.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.08em", fontWeight: 600, marginTop: 2 }}>INK BALANCE</div>
                  <div style={{ fontSize: 13, color: C.textSoft, marginTop: 8, fontStyle: "italic" }}>Earn more by writing reviews & finishing books</div>
                </div>
                <div style={{ ...card({ borderRadius: 18, padding: "22px", background: darkMode ? "linear-gradient(135deg, rgba(90,154,184,0.15), rgba(20,32,44,0.9))" : "linear-gradient(135deg, rgba(168,212,232,0.18), rgba(255,255,255,0.7))" }) }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>☁️</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: C.accentDeep }}>{streak} days</div>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.08em", fontWeight: 600, marginTop: 2 }}>READING STREAK</div>
                  <div style={{ fontSize: 13, color: C.textSoft, marginTop: 8, fontStyle: "italic" }}>Best: 34 days · Keep it going!</div>
                </div>

                {/* Reading heatmap */}
                <div style={{ ...card({ borderRadius: 18, padding: "22px", gridColumn: "1/-1" }) }}>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 14 }}>PAGES READ THIS YEAR</div>
                  <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {Array.from({ length: 52 }, (_, i) => {
                      const intensity = [0,0,1,0,2,1,3,2,1,0,1,2,3,2,1,0,0,1,2,1,3,2,1,0,1,2,1,0,2,3,2,1,0,1,0,2,3,1,2,1,0,1,2,3,2,1,2,3,2,1,0,1][i] || 0;
                      const colors = ["rgba(123,184,212,0.1)","rgba(123,184,212,0.25)","rgba(123,184,212,0.5)","rgba(74,144,184,0.75)",C.accentDeep];
                      return <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: colors[intensity], border: `1px solid ${wb(0.4)}` }} />;
                    })}
                  </div>
                </div>

                {/* Moods */}
                <div style={{ ...card({ borderRadius: 18, padding: "22px" }) }}>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>READING BY MOOD</div>
                  {[{ label: "Reflective", pct: 38, color: "#7bb8d4" }, { label: "Romantic", pct: 27, color: "#e8c5d4" }, { label: "Thrilling", pct: 19, color: "#d4a87b" }, { label: "Whimsical", pct: 16, color: "#c5c8e8" }].map((m, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 14, color: C.textSoft }}>{m.label}</span>
                        <span style={{ fontSize: 12, color: C.textFaint, fontWeight: 600 }}>{m.pct}%</span>
                      </div>
                      <div style={{ height: 6, borderRadius: 3, background: "rgba(123,184,212,0.12)" }}>
                        <div style={{ width: `${m.pct}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${m.color}88, ${m.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Badges */}
                <div style={{ ...card({ borderRadius: 18, padding: "22px" }) }}>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>BADGES EARNED</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {[{ icon: "🌙", name: "Night Owl", desc: "Read past midnight 10x" }, { icon: "🌊", name: "Deep Reader", desc: "Finished a book in 1 day" }, { icon: "☁️", name: "Cloud Drifter", desc: "30-day streak" }, { icon: "🪶", name: "Annotator", desc: "Left 50 notes" }, { icon: "🌸", name: "Social Bloom", desc: "100 followers" }, { icon: "🕊️", name: "Shelf Full", desc: "Read 25 books" }].map((b, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px", background: w(0.6), borderRadius: 14, border: `1px solid ${wb(0.9)}`, textAlign: "center" }}>
                        <div style={{ fontSize: 28, marginBottom: 6 }}>{b.icon}</div>
                        <div style={{ fontSize: 12, color: C.text, fontWeight: 600 }}>{b.name}</div>
                        <div style={{ fontSize: 10, color: C.textFaint, marginTop: 2, lineHeight: 1.4 }}>{b.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {profileTab === "settings" && (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18 }}>
                <div style={{ ...card({ borderRadius: 18, padding: "24px" }) }}>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 18 }}>APPEARANCE</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 15, color: C.text, fontWeight: 500 }}>{darkMode ? "🌙 Night Sky" : "☀️ Morning Mist"}</div>
                      <div style={{ fontSize: 13, color: C.textFaint, marginTop: 4, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>{darkMode ? "Soft dark for reading after dusk" : "Airy light palette for daytime reading"}</div>
                    </div>
                    <div onClick={() => setDarkMode(d => !d)} style={{ width: 56, height: 30, borderRadius: 15, cursor: "pointer", flexShrink: 0, background: darkMode ? `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})` : "rgba(123,184,212,0.2)", border: `1px solid ${darkMode ? C.accent : "rgba(123,184,212,0.3)"}`, position: "relative", transition: "all 0.3s ease" }}>
                      <div style={{ position: "absolute", top: 3, left: darkMode ? 28 : 3, width: 22, height: 22, borderRadius: "50%", background: "white", transition: "left 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{darkMode ? "🌙" : "☀️"}</div>
                    </div>
                  </div>
                  <div style={{ height: 1, background: `${C.accent}22`, margin: "0 0 20px" }} />
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.1em", fontWeight: 600, marginBottom: 12 }}>PREVIEW</div>
                  <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.cardBorder}` }}>
                    <div style={{ padding: "12px 16px", background: darkMode ? DARK.readerHeader : LIGHT.readerHeader, borderBottom: `1px solid ${darkMode ? "rgba(90,154,184,0.15)" : "rgba(123,184,212,0.1)"}` }}>
                      <span style={{ fontSize: 12, color: darkMode ? DARK.textFaint : LIGHT.textFaint }}>← Library &nbsp;&nbsp; 💬 Notes</span>
                    </div>
                    <div style={{ padding: "16px", background: darkMode ? DARK.readerBg : LIGHT.readerBg }}>
                      <div style={{ fontSize: 14, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", lineHeight: 1.9, color: darkMode ? DARK.text : LIGHT.text }}>The library contained every book that had ever been written…</div>
                    </div>
                  </div>
                </div>
                <div style={{ ...card({ borderRadius: 18, padding: "24px" }) }}>
                  <div style={{ fontSize: 11, color: C.textFaint, letterSpacing: "0.12em", fontWeight: 600, marginBottom: 18 }}>ACCOUNT</div>
                  {["Edit profile", "Notification preferences", "Privacy settings", "Sign out"].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: i < 3 ? `1px solid ${C.accent}18` : "none", cursor: "pointer" }}>
                      <span style={{ fontSize: 15, color: i === 3 ? C.blush : C.text }}>{item}</span>
                      {i < 3 && <span style={{ fontSize: 20, color: C.textFaint }}>›</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── MOBILE BOTTOM NAV ─── */}
      {isMobile && !isReading && (
        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 420,
          background: C.navBg, backdropFilter: "blur(24px)",
          borderTop: `1px solid ${C.cardBorder}`,
          display: "flex", padding: "10px 0 16px", zIndex: 100,
          boxShadow: "0 -4px 24px rgba(123,184,212,0.1)",
          transition: "background 0.4s ease",
        }}>
          {navItems.map(({ id, icon, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              background: "none", border: "none", cursor: "pointer",
              color: tab === id ? C.accentDeep : C.textFaint, transition: "color 0.2s",
            }}>
              <span style={{ fontSize: 19 }}>{icon}</span>
              <span style={{ fontSize: 10, fontFamily: "'Nunito', sans-serif", fontWeight: tab === id ? 600 : 400, letterSpacing: "0.04em" }}>{label}</span>
              {tab === id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.accentDeep, marginTop: 1 }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
