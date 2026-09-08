import type { AreaId } from "./areas";
import type { Coordinate, Localized, StoryCategory } from "./types";

export type Story = {
  slug: string;
  number: string;
  title: Localized;
  kicker: Localized;
  date: Localized;
  place: Localized;
  area: AreaId;
  category: StoryCategory;
  excerpt: Localized;
  paragraphs: { zh: string[]; en: string[] };
  coordinate: Coordinate;
  featured?: boolean;
  published?: boolean;
  draft?: boolean;
};

const earlierStories: Story[] = [
  {
    slug: "ground-zero",
    number: "#1",
    title: { zh: "原點", en: "The Starting Point" },
    kicker: { zh: "一公里系列", en: "The One-Kilometre Series" },
    date: { zh: "二零二六年・八月", en: "August 2026" },
    place: { zh: "中環一棟商業大廈", en: "A Central office building" },
    area: "central",
    category: "animals-people",
    excerpt: {
      zh: "我以前並不知道，原來有些狗會害怕陌生人的直視。一次失禮的凝望，成為我學習動物禮儀的原點。",
      en: "I did not know that some dogs fear a stranger’s direct gaze. One ill-mannered stare became the starting point for learning another species’ etiquette.",
    },
    paragraphs: {
      zh: [
        "我以前並不知道，原來有些狗會害怕陌生人的直視。",
        "仔細一琢磨，這其實也不特別難理解。試想像你是《進擊的巨人》裡的角色，牆外有個比你大得多的未知生物饒有興味地盯着你，還張大雙臂似是想撲向獵物，正常都會打個冷顫。",
        "當然，不是所有的狗都會害怕。像人一樣，不同的狗也有不同的性格。這對於常接觸動物的人而言，大概是再自然不過的事。只是那天以前，我還沒有學會把差異當成一套需要尊重的語言。",
        "查克是老闆的大啡狗，頭頂的毛修得圓圓的，遠看像一朵沉默的蘑菇。初次見面，我出於人類的友善，彎下身直直望着牠；查克卻把身體往後收，眼神沒有半點想要結交新朋友的意思。",
        "我後來才知道，在狗的語言裡，持續直視可以是一種壓力，甚至近似挑釁。人類有人類的規則，動物有動物的禮儀。想親近，不代表可以跳過對方的界線。",
        "為了挽回我的失禮，我默默在搜尋欄敲下了另一問。答案沒有教我一句萬用的狗語，只提醒我要移開目光、放慢動作，讓查克決定距離。",
        "最後，我把一粒零食放到牠可以自己走近的位置。查克看了看我，再看了看零食，先接受了後者。這已經足夠。那一刻，我們的一公里故事有了原點：不是我發現了查克，而是查克教我如何好好看見一隻動物。",
      ],
      en: [
        "I did not know that some dogs are frightened by a stranger’s direct gaze.",
        "When you stop to think about it, this is not especially difficult to understand. Imagine being a character in Attack on Titan: beyond the wall, an unknown creature far larger than you stares with great interest, arms spread as if preparing to pounce. A shiver would be the sensible response.",
        "Not every dog is afraid, of course. Like people, dogs have different temperaments. Anyone used to being around animals may find that obvious. Until that day, I had not yet learned to treat those differences as a language deserving respect.",
        "Chuck was the boss’s big brown dog, his hair trimmed into a round cap that made him look like a particularly quiet mushroom. Meaning to be friendly, I bent down and looked straight at him. Chuck leaned away. His expression contained no enthusiasm for our new acquaintance.",
        "I later learned that, in a dog’s language, a sustained stare can create pressure and may even resemble a challenge. Humans have rules; animals have etiquette. Wanting to come closer does not grant permission to ignore someone else’s boundary.",
        "To repair my bad manners, I quietly typed another question into the search bar. The answer offered no universal phrase in dog. It simply told me to soften my gaze, slow my movements and let Chuck choose the distance.",
        "In the end, I placed a treat where he could approach it by himself. Chuck looked at me, then at the treat, and accepted the latter first. That was enough. Our one-kilometre story had found its ground zero: I had not discovered Chuck; Chuck had taught me how to properly notice an animal.",
      ],
    },
    // Intentionally a broad Central anchor, not the office location (plan §15).
    coordinate: [114.154, 22.284],
    featured: true,
    published: true,
  },
  {
    slug: "dawn-on-graham-street",
    number: "#2",
    title: { zh: "嘉咸街的清晨", en: "Dawn on Graham Street" },
    kicker: { zh: "街市筆記", en: "Market Notes" },
    date: { zh: "採集中", en: "In the field" },
    place: { zh: "嘉咸街街市", en: "Graham Street Market" },
    area: "central",
    category: "shops-people",
    excerpt: {
      zh: "膠籃落地、鐵閘拉起，街市沿着斜路一格一格醒來。",
      en: "Crates touch pavement and shutters rise as the market wakes one slope at a time.",
    },
    paragraphs: { zh: [], en: [] },
    coordinate: [114.15136, 22.28356],
  },
  {
    slug: "cat-map-of-central",
    number: "#3",
    title: { zh: "中環街角貓地圖", en: "The Cat Map of Central" },
    kicker: { zh: "街角動物", en: "Corner Animals" },
    date: { zh: "採集中", en: "In the field" },
    place: { zh: "太平山街", en: "Tai Ping Shan Street" },
    area: "soho",
    category: "animals-people",
    excerpt: {
      zh: "不是打卡位置，而是一張關於距離、照顧與相處方式的地圖。",
      en: "Not a checklist of photo spots, but a map of distance, care and coexistence.",
    },
    paragraphs: { zh: [], en: [] },
    coordinate: [114.14668, 22.28405],
  },
  {
    slug: "between-old-and-new",
    number: "#4",
    title: { zh: "舊與新之間", en: "Between Old and New" },
    kicker: { zh: "城市記憶", en: "City Memory" },
    date: { zh: "採集中", en: "In the field" },
    place: { zh: "中環街市", en: "Central Market" },
    area: "central",
    category: "history",
    excerpt: {
      zh: "從水磨石樓梯與舊攤檔格局，看一座城市如何一邊保留、一邊生活。",
      en: "Terrazzo stairs and old stall grids ask how a city can preserve and keep living.",
    },
    paragraphs: { zh: [], en: [] },
    coordinate: [114.15472, 22.28435],
  },
  {
    slug: "last-gas-lamp",
    number: "#5",
    title: { zh: "中環最後的一盞燈", en: "Central’s Last Gas Lamp" },
    kicker: { zh: "一公里入夜後", en: "1KM After Dark" },
    date: { zh: "採集中", en: "In the field" },
    place: { zh: "都爹利街", en: "Duddell Street" },
    area: "central",
    category: "history",
    excerpt: {
      zh: "黃昏亮起的不只是一盞燈，也是一套仍有人維護的城市手藝。",
      en: "At dusk, more than a lamp comes alive: a piece of city craft still maintained by hand.",
    },
    paragraphs: { zh: [], en: [] },
    coordinate: [114.15682, 22.28083],
  },
  {
    slug: "waterfront-pause",
    number: "#6",
    title: { zh: "海旁的一次停步", en: "A Pause by the Harbour" },
    kicker: { zh: "日常風景", en: "Everyday Scenes" },
    date: { zh: "採集中", en: "In the field" },
    place: { zh: "中環海濱", en: "Central Waterfront" },
    area: "waterfront",
    category: "everyday",
    excerpt: {
      zh: "同一段海旁路，人與狗看見的是兩個不同尺度的城市。",
      en: "On the same harbour walk, a person and a dog meet the city at two different scales.",
    },
    paragraphs: { zh: [], en: [] },
    coordinate: [114.15825, 22.28956],
  },
];

// Phase 1 only. The two new entries are research previews, not invented interviews.
// Replace their copy and clear `draft` only after editorial/subject approval.
export const stories: Story[] = [earlierStories[0], {
  slug: "the-last-impression", number: "#2",
  title: { zh: "最後一個印痕", en: "The Last Impression" },
  kicker: { zh: "店與人・手藝", en: "Shops, people & craft" },
  date: { zh: "研究預覽・待審閱", en: "Research preview · awaiting review" },
  place: { zh: "光華印務・西街 45 號", en: "Kwong Wah Printing · 45 Sai Street" },
  area: "sheung-wan", category: "shops-people",
  excerpt: { zh: "一間家族印刷店，如何把活字留下來？由光華印務開始，認識一門仍在運作的手藝。", en: "How does a family print shop keep letterpress alive? A story taking shape at Kwong Wah Printing." },
  paragraphs: {
    zh: ["西街 45 號，是這篇故事的研究起點。根據 HAPI 2026 年 9 月主計劃，光華印務與印刷師傅任偉生，將成為我們首階段記錄的社區人物與手藝。", "計劃記錄的，是一間家族印刷店如何朝仍在運作的活字印刷博物館轉型。我們想問：當一門手藝的日常需求逐漸減少，留下工具、技術與記憶，分別意味著甚麼？", "這裡先呈現故事方向，並非已完成的採訪。營業情況、最新細節及店方的報導同意仍須實地核實；正式內容會在採訪與審閱完成後更新。", "若有機會經過，請尊重店方的工作節奏；拍攝或訪問須先取得同意，不要因為地圖上的一個圖釘而打擾日常工作。"],
    en: ["45 Sai Street is the starting point for this research. HAPI’s September 2026 master plan identifies Kwong Wah Printing and master printer Yam Wai-sang as one of the first community stories to develop.", "The proposed story follows a family print shop’s transition towards a working letterpress museum. We want to ask what it means to preserve the tools, knowledge and memories of a craft as everyday demand changes.", "This is a preview of the editorial direction, not a completed interview. Current operations, details and permission to feature the shop still require an on-site check. The finished story will follow reporting and review.", "Please respect the pace of the working shop. Arrange photography or interviews with permission; a pin on a map is not an invitation to interrupt someone’s day."],
  },
  coordinate: [114.14862, 22.28491], published: true, draft: true,
}, {
  slug: "slow-flavour", number: "#3",
  title: { zh: "快城裡的慢味道", en: "Slow Flavour in a Fast City" },
  kicker: { zh: "味道記憶", en: "Flavours & memories" },
  date: { zh: "研究預覽・待審閱", en: "Research preview · awaiting review" },
  place: { zh: "九龍醬園・嘉咸街 9 號", en: "Kowloon Soy Company · 9 Graham Street" },
  area: "central", category: "flavours",
  excerpt: { zh: "在步伐急促的城市裡，一間醬園如何延續時間的味道？從嘉咸街的零售店說起。", en: "A fast city, a slow craft. Our next story begins at the Graham Street shop of Kowloon Soy Company." },
  paragraphs: {
    zh: ["嘉咸街 9 號，是九龍醬園的零售店，也是這篇故事在一公里範圍內的落點。", "HAPI 的主計劃把第三代傳人黃啟林與醬園的釀造傳承列為首階段題材。我們想從一種日常調味品，理解一間老店如何在快速變化的社區裡延續自己的節奏。", "釀造工場位於這一公里以外。地圖上的圖釘代表零售店，不是工場或參觀入口；故事將以這間店與附近社區的關係為重心。", "這是研究預覽，並非已完成的採訪。店方是否願意接受報導、最新營業情況及製作細節，都有待重新核實。完成採訪與審閱後，我們才會補上正式故事。"],
    en: ["9 Graham Street is the retail shop of Kowloon Soy Company and this story’s connection to the kilometre.", "HAPI’s master plan identifies third-generation owner Wong Kai-lam and the company’s brewing tradition as a first-phase subject. Through an everyday ingredient, we want to understand how an old shop maintains its rhythm in a changing neighbourhood.", "The brewing operation is outside this kilometre. The map pin represents the retail shop, not a factory or a visitor entrance. The story will focus on the shop’s relationship with its local community.", "This is a research preview, not a completed interview. Permission to feature the business, current operations and production details must be checked again. The finished story will be added after reporting and review."],
  },
  coordinate: [114.15425, 22.28378], published: true, draft: true,
}];

export const featuredStory = stories[0];

const toRadians = (value: number) => (value * Math.PI) / 180;

export function distanceKm(a: Coordinate, b: Coordinate) {
  const earthRadius = 6371;
  const dLat = toRadians(b[1] - a[1]);
  const dLng = toRadians(b[0] - a[0]);
  const lat1 = toRadians(a[1]);
  const lat2 = toRadians(b[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(h));
}

export function nearbyStories(story: Story, limit = 3) {
  return stories
    .filter((item) => item.slug !== story.slug)
    .map((item) => ({ story: item, distance: distanceKm(story.coordinate, item.coordinate) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
