import type { Coordinate, Localized, StoryCategory } from "./types";

export type PinKind = "story" | "research" | "directory";
export type MapPinData = {
  id: string; name: Localized; address: Localized; teaser: Localized;
  kind: PinKind; category: StoryCategory; icon: string; coordinate: Coordinate;
  storySlug?: string; broad?: boolean; note?: Localized;
};
const l = (zh: string, en: string): Localized => ({ zh, en });

// Roster: HAPI_1KM_Master_Plan_v2.1 §10.1. Address coordinates checked
// against HK Digital Policy Office ALS on 2026-09-08 (numbered premises).
// Man Wa Lane, Duddell steps and Graham Market anchors use OSM geometry
// from OpenFreeMap tile 14/13387/7151, snapshot 20260830. This verifies the
// address, NOT operating status, consent, pet access or editorial facts.
// Origin and directory use broad anchors intentionally, never animal locations.
export const mapPins: MapPinData[] = [
  { id: "origin", name: l("原點", "The Starting Point"), address: l("中環一棟商業大廈・大範圍標示", "A Central office building · broad area"), teaser: l("一次失禮的凝望，成為學習另一種語言的起點。", "An ill-mannered stare becomes a lesson in another species’ language."), kind: "story", category: "animals-people", icon: "heart", coordinate: [114.154, 22.284], storySlug: "ground-zero", broad: true, note: l("為保護私隱，圖示不代表辦公室位置，亦不提供到訪指引。", "For privacy, this is not the office location. No visiting directions are provided.") },
  { id: "kwong-wah", name: l("光華印務", "Kwong Wah Printing"), address: l("西街 45 號", "45 Sai Street"), teaser: l("最後一個印痕：留下工具，也留下手藝的記憶。", "The Last Impression: keeping the tools and memories of letterpress alive."), kind: "story", category: "shops-people", icon: "printer", coordinate: [114.14862, 22.28491], storySlug: "the-last-impression", note: l("故事研究預覽；採訪、現況及店方同意待核實。", "Research preview; interview, current details and consent are pending.") },
  { id: "kowloon-soy", name: l("九龍醬園", "Kowloon Soy Company"), address: l("嘉咸街 9 號", "9 Graham Street"), teaser: l("快城裡的慢味道：一間醬園與社區的日常。", "Slow Flavour in a Fast City: a soy shop and its neighbourhood."), kind: "story", category: "flavours", icon: "jar", coordinate: [114.15425, 22.28378], storySlug: "slow-flavour", note: l("零售店，非釀造工場。故事為研究預覽，待審閱。", "Retail shop, not the brewery. Story is a research preview awaiting review.") },
  { id: "sheung-wan-cats", name: l("上環舖頭貓", "Sheung Wan shop cats"), address: l("上環海味及藥材街一帶・大範圍", "Sheung Wan’s dried-seafood & herbal streets · broad area"), teaser: l("學會留意和關心，不是追蹤位置。", "A directory for noticing and caring, not finding cats."), kind: "directory", category: "animals-people", icon: "paw", coordinate: [114.144, 22.287], broad: true, note: l("第三階段推出。這是目錄入口，不是貓咪位置。", "Phase 3. This is a directory gateway, not a cat’s location.") },
  { id: "yu-lan", name: l("卅間街坊盂蘭勝會", "30 Houses Yu Lan Festival"), address: l("士丹頓街 62 號", "62 Staunton Street"), teaser: l("記錄一項仍由街坊承接的社區傳統。", "An ongoing neighbourhood tradition, carried by its community."), kind: "research", category: "culture", icon: "lantern", coordinate: [114.15168, 22.28292], note: l("計劃記載日期為 2026 年 9 月 5 日，已過期；此為待跟進研究，並非即將舉行的活動。", "The plan’s 5 September 2026 date has passed. This is a follow-up research lead, not an upcoming event.") },
  { id: "seal-carvers", name: l("文華里刻印", "Man Wa Lane seal carvers"), address: l("文華里", "Man Wa Lane"), teaser: l("在一方石章裡，看見手工的份量。", "The patient work held in a small carved seal."), kind: "research", category: "shops-people", icon: "stamp", coordinate: [114.152415, 22.286021], note: l("須先確認仍以手工刻印的攤檔，再安排採訪。", "Confirm which stalls still carve by hand before arranging an interview.") },
  { id: "graham-market", name: l("嘉咸街街市", "Graham Street Market"), address: l("嘉咸街、結志街及卑利街一帶", "Graham, Gage & Peel Streets"), teaser: l("從檔主的日常，聆聽新舊街市的聲音。", "Old and new voices, heard through a stallholder’s day."), kind: "research", category: "shops-people", icon: "market", coordinate: [114.153754, 22.283234], broad: true },
  { id: "man-hing", name: l("文興裁縫", "Man Hing Tailor"), address: l("伊利近街 8–10 號", "8–10 Elgin Street"), teaser: l("一針一線，量度老店與城市的距離。", "A city and a tailor’s craft, measured stitch by stitch."), kind: "research", category: "shops-people", icon: "scissors", coordinate: [114.1526, 22.28268], note: l("營運狀況待核實，不作現正營業的承諾。", "Operating status is unverified; this is not an open-business listing.") },
  { id: "leung-chun", name: l("梁津煥記", "Leung Chun Woon Kee"), address: l("四方街 17–19 號", "17–19 Square Street"), teaser: l("以尊重與預約為先，理解一門送別的手藝。", "A sensitive craft, approached with respect and by appointment."), kind: "research", category: "culture", icon: "thread", coordinate: [114.14969, 22.28441], note: l("敏感題材。須先預約；不可拍攝客人、儀式或文件。", "Sensitive subject. Appointment required; do not photograph customers, rites or documents.") },
  { id: "ser-wong", name: l("蛇王芬", "Ser Wong Fun"), address: l("閣麟街 30 號", "30 Cochrane Street"), teaser: l("從傳承者的選擇，記錄一間老店的下一章。", "A shop’s next chapter, through its successor’s choices."), kind: "research", category: "flavours", icon: "bowl", coordinate: [114.1542, 22.28276] },
  { id: "duddell", name: l("都爹利街石階及煤氣路燈", "Duddell Street steps & gas lamps"), address: l("都爹利街", "Duddell Street"), teaser: l("石階與路燈，留住一段城市記憶。", "Steps and gas lamps holding a piece of the city’s memory."), kind: "research", category: "history", icon: "lamp", coordinate: [114.156806, 22.279685], note: l("拍攝前須確認亮燈時間，不提供未經核實的時間表。", "Confirm lighting times before a shoot; no unverified timetable is published.") },
  { id: "lan-fong", name: l("蘭芳園", "Lan Fong Yuen"), address: l("結志街 2 號", "2 Gage Street"), teaser: l("從一個茶隔，看見反覆練習的技術。", "A tea strainer and a technique learned through repetition."), kind: "research", category: "flavours", icon: "tea", coordinate: [114.15362, 22.28261] },
  { id: "central-market", name: l("中環街市", "Central Market"), address: l("皇后大道中 93 號", "93 Queen’s Road Central"), teaser: l("在建築與日常之間，重新看見一座街市。", "Reading a market through its architecture and everyday life."), kind: "research", category: "history", icon: "building", coordinate: [114.15578, 22.28429], note: l("寵物出入規則待實地核實，此圖釘不代表寵物友善認證。", "Pet-access rules need an on-site check; this pin is not a pet-friendly certification.") },
  { id: "sing-heung", name: l("勝香園", "Sing Heung Yuen"), address: l("美輪街 2 號", "2 Mei Lun Street"), teaser: l("從街邊餐桌出發，聆聽店與人的故事。", "A street-side table as the beginning of a neighbourhood story."), kind: "research", category: "flavours", icon: "bowl", coordinate: [114.15249, 22.28381], note: l("研究線索，店方現況待確認；不公開未核實的動物資訊。", "Research lead; current details need confirmation. No unverified animal information is published.") },
];

export const pinKindLabels = {
  story: l("故事", "Story"), research: l("研究線索・製作中", "Research lead · coming soon"), directory: l("貓咪目錄・第三階段", "Cat directory · phase 3"),
};

// Explicitly synthetic UI samples, NOT real counts or a feed from FEHD.
export const areaSamples = [
  { id: "sheung-wan", name: l("上環", "Sheung Wan"), center: [114.1465, 22.287] as Coordinate, cats: 8, restaurants: 5 },
  { id: "central", name: l("中環", "Central"), center: [114.156, 22.2835] as Coordinate, cats: 6, restaurants: 4 },
  { id: "soho", name: l("蘇豪與太平山", "SoHo & Tai Ping Shan"), center: [114.150, 22.2828] as Coordinate, cats: 7, restaurants: 3 },
];
