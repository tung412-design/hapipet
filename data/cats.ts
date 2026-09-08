import type { AreaId } from "./areas";
import type { Coordinate, Localized } from "./types";

export type CatTemperament = "friendly" | "shy" | "do-not-disturb";

export type StreetCat = {
  slug: string;
  name: Localized;
  nicknames: Localized;
  area: AreaId;
  corner: Localized;
  age: Localized;
  temperament: CatTemperament;
  favouriteSpot: Localized;
  neighbourNote: Localized;
  helloTip: Localized;
  coordinate: Coordinate;
  portraitPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  storySlug?: string;
};

export const cats: StreetCat[] = [
  {
    slug: "ah-wong",
    name: { zh: "阿黃", en: "Ah Wong" },
    nicknames: { zh: "黃仔、廟階主任", en: "Wong Jai, Keeper of the Steps" },
    area: "sheung-wan",
    corner: { zh: "文武廟附近石階", en: "Steps near Man Mo Temple" },
    age: { zh: "約 6–8 歲", en: "About 6–8" },
    temperament: "friendly",
    favouriteSpot: { zh: "下午有一線陽光的第二級石階", en: "The second step when a line of afternoon sun reaches it" },
    neighbourNote: { zh: "附近街坊會留意牠的精神和食慾；固定餵飼位置不公開。", en: "Nearby neighbours keep an eye on his energy and appetite; fixed feeding spots are not published." },
    helloTip: { zh: "先在兩步外停下，側身等待；牠走近才伸手。", en: "Pause two steps away and turn slightly sideways. Offer a hand only if he approaches." },
    coordinate: [114.14782, 22.28478],
    portraitPosition: "top-left",
    storySlug: "cat-map-of-central",
  },
  {
    slug: "siu-mai",
    name: { zh: "燒賣", en: "Siu Mai" },
    nicknames: { zh: "黑白妹", en: "Tuxedo Girl" },
    area: "soho",
    corner: { zh: "普慶坊轉角", en: "Po Hing Fong corner" },
    age: { zh: "約 3–5 歲", en: "About 3–5" },
    temperament: "shy",
    favouriteSpot: { zh: "半掩鐵閘後的陰影", en: "The shade behind a half-lowered shutter" },
    neighbourNote: { zh: "店主會在開舖時確認牠是否出現，但不會把牠叫出來。", en: "A shopkeeper checks whether she appears at opening time, but never calls her out." },
    helloTip: { zh: "不要蹲下包圍牠；保持通道，讓牠隨時可以離開。", en: "Do not crouch around her. Keep an open path so she can leave whenever she wants." },
    coordinate: [114.14505, 22.28469],
    portraitPosition: "top-right",
  },
  {
    slug: "fa-fa",
    name: { zh: "花花", en: "Fa Fa" },
    nicknames: { zh: "三色店長", en: "The Calico Manager" },
    area: "sheung-wan",
    corner: { zh: "荷李活道舊店門口", en: "An old Hollywood Road shopfront" },
    age: { zh: "約 7 歲", en: "About 7" },
    temperament: "friendly",
    favouriteSpot: { zh: "門口紙箱旁的涼位", en: "A cool patch beside the doorway boxes" },
    neighbourNote: { zh: "幾位相熟店主輪流觀察；未經同意不要餵食。", en: "Several familiar shopkeepers take turns checking in; do not feed without permission." },
    helloTip: { zh: "讓牠先聞你的手背，不要從頭頂突然摸下去。", en: "Let her sniff the back of your hand first; avoid reaching suddenly over her head." },
    coordinate: [114.1471, 22.28414],
    portraitPosition: "bottom-left",
    storySlug: "cat-map-of-central",
  },
  {
    slug: "grey-uncle",
    name: { zh: "灰叔", en: "Grey Uncle" },
    nicknames: { zh: "後巷伯伯", en: "Back-lane Uncle" },
    area: "central",
    corner: { zh: "威靈頓街後巷", en: "A Wellington Street back lane" },
    age: { zh: "約 10 歲以上", en: "About 10+" },
    temperament: "do-not-disturb",
    favouriteSpot: { zh: "水管旁不受打擾的暖地面", en: "Warm ground beside a pipe, away from foot traffic" },
    neighbourNote: { zh: "街坊熟悉牠的作息。牠休息時請不要靠近或拍攝閃光燈。", en: "Neighbours know his routine. When he rests, do not approach or use flash." },
    helloTip: { zh: "最有禮貌的問候，是看見牠後繼續安靜走過。", en: "The politest hello is to notice him and continue quietly on your way." },
    coordinate: [114.15231, 22.28263],
    portraitPosition: "bottom-right",
  },
];
