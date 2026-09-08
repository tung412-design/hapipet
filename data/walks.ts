import type { Coordinate, Localized } from "./types";

export type WalkStop = {
  number: number;
  place: Localized;
  lookFor: Localized;
  coordinate: Coordinate;
  storySlug?: string;
};

export type Walk = {
  slug: string;
  title: Localized;
  summary: Localized;
  distance: string;
  minutes: number;
  petFriendly: boolean;
  guide: "ha-kun" | "pi-chan";
  stops: WalkStop[];
};

export const walks: Walk[] = [
  {
    slug: "morning-market-walk",
    title: { zh: "清晨街市散步", en: "Morning Market Walk" },
    summary: { zh: "在中環全面醒來以前，沿斜路聽見街市開檔的聲音。", en: "Follow the market’s opening soundtrack before Central fully wakes." },
    distance: "1.1 km",
    minutes: 24,
    petFriendly: false,
    guide: "ha-kun",
    stops: [
      { number: 1, place: { zh: "HAPI 辦公室", en: "HAPI office" }, lookFor: { zh: "故事的原點，以及每天步行的起點。", en: "The story’s ground zero and the start of the everyday walk." }, coordinate: [114.15343, 22.28328], storySlug: "ground-zero" },
      { number: 2, place: { zh: "嘉咸街街市", en: "Graham Street Market" }, lookFor: { zh: "鐵閘、膠籃與熟客打招呼的節奏。", en: "Shutters, crates and the rhythm of regulars greeting vendors." }, coordinate: [114.15136, 22.28356], storySlug: "dawn-on-graham-street" },
      { number: 3, place: { zh: "結志街", en: "Gage Street" }, lookFor: { zh: "新店與舊攤檔如何共享一條斜路。", en: "How new shops and old stalls share the same slope." }, coordinate: [114.15105, 22.28256] },
      { number: 4, place: { zh: "中環街市", en: "Central Market" }, lookFor: { zh: "水磨石樓梯與保留下來的舊格局。", en: "Terrazzo stairs and traces of the original stall grid." }, coordinate: [114.15472, 22.28435], storySlug: "between-old-and-new" },
    ],
  },
  {
    slug: "cat-corners-walk",
    title: { zh: "街角貓散步", en: "Cat Corners Walk" },
    summary: { zh: "由文武廟走到太平山街，練習用不打擾的方式看見街坊貓。", en: "From Man Mo Temple to PoHo, practise noticing neighbourhood cats without intruding." },
    distance: "1.3 km",
    minutes: 29,
    petFriendly: true,
    guide: "pi-chan",
    stops: [
      { number: 1, place: { zh: "文武廟外石階", en: "Steps near Man Mo Temple" }, lookFor: { zh: "保持距離，先看貓是否願意接近。", en: "Keep a little distance and let the cat decide whether to approach." }, coordinate: [114.14782, 22.28478] },
      { number: 2, place: { zh: "太平山街", en: "Tai Ping Shan Street" }, lookFor: { zh: "店舖留下的陰影與安靜休息角落。", en: "Patches of shade and quiet resting corners left by shops." }, coordinate: [114.14668, 22.28405], storySlug: "cat-map-of-central" },
      { number: 3, place: { zh: "磅巷石階", en: "Pound Lane steps" }, lookFor: { zh: "行人、狗與貓如何分享狹窄街道。", en: "How walkers, dogs and cats negotiate a narrow street." }, coordinate: [114.14528, 22.28345] },
      { number: 4, place: { zh: "普慶坊", en: "Po Hing Fong" }, lookFor: { zh: "只觀察，不公開固定餵飼位置。", en: "Observe gently; fixed feeding spots are not published." }, coordinate: [114.14492, 22.28473] },
    ],
  },
  {
    slug: "old-and-new-walk",
    title: { zh: "舊與新散步", en: "Old & New Walk" },
    summary: { zh: "在保育建築、新用途與仍在運作的街道之間，看中環的時間重疊。", en: "See Central’s timelines overlap across conserved buildings, new uses and working streets." },
    distance: "1.5 km",
    minutes: 33,
    petFriendly: true,
    guide: "ha-kun",
    stops: [
      { number: 1, place: { zh: "中環街市", en: "Central Market" }, lookFor: { zh: "舊攤檔尺度與新公共空間。", en: "The scale of old stalls inside a new public space." }, coordinate: [114.15472, 22.28435], storySlug: "between-old-and-new" },
      { number: 2, place: { zh: "半山扶手電梯", en: "Mid-Levels Escalator" }, lookFor: { zh: "城市如何把通勤變成一條流動走廊。", en: "How the city turns a commute into a moving corridor." }, coordinate: [114.15305, 22.28224] },
      { number: 3, place: { zh: "PMQ 元創方", en: "PMQ" }, lookFor: { zh: "舊宿舍格局如何容納今天的創作。", en: "How former quarters now hold contemporary making." }, coordinate: [114.1501, 22.28312] },
      { number: 4, place: { zh: "都爹利街煤氣燈", en: "Duddell Street gas lamps" }, lookFor: { zh: "黃昏後才會出現的手工維護細節。", en: "Hand-maintained details that only emerge after dusk." }, coordinate: [114.15682, 22.28083], storySlug: "last-gas-lamp" },
    ],
  },
];
