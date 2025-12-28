const { name } = require("ejs");
const express = require("express");
const app = express();
const Path = require("path");

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

"use strict";

let standings = [
  { rank:1, team:"鹿島アントラーズ", points:76, played:38, win:23, draw:7, lose:8, goal:58, against:31, diff:27, prefecture:"茨城", stadium:"メルカリスタジアム", capacity:39095 },
  { rank:2, team:"柏レイソル", points:75, played:38, win:21, draw:12, lose:5, goal:60, against:34, diff:26, prefecture:"千葉", stadium:"三協フロンテア柏スタジアム", capacity:15109 },
  { rank:3, team:"京都サンガF.C.", points:68, played:38, win:19, draw:11, lose:8, goal:62, against:40, diff:22, prefecture:"京都", stadium:"サンガスタジアム by KYOCERA", capacity:21623 },
  { rank:4, team:"サンフレッチェ広島", points:68, played:38, win:20, draw:8, lose:10, goal:46, against:28, diff:18, prefecture:"広島", stadium:"エディオンピースウイング広島", capacity:28347 },
  { rank:5, team:"ヴィッセル神戸", points:64, played:38, win:18, draw:10, lose:10, goal:46, against:33, diff:13, prefecture:"兵庫", stadium:"ノエビアスタジアム神戸", capacity:29643 },
  { rank:6, team:"FC町田ゼルビア", points:60, played:38, win:17, draw:9, lose:12, goal:52, against:38, diff:14, prefecture:"東京", stadium:"町田GIONスタジアム", capacity:15320 },
  { rank:7, team:"浦和レッズ", points:59, played:38, win:16, draw:11, lose:11, goal:45, against:39, diff:6, prefecture:"埼玉", stadium:"埼玉スタジアム2002", capacity:62040 },
  { rank:8, team:"川崎フロンターレ", points:57, played:38, win:15, draw:12, lose:11, goal:67, against:57, diff:10, prefecture:"神奈川", stadium:"Uvanceとどろきスタジアム by Fujitsu", capacity:26827 },
  { rank:9, team:"ガンバ大阪", points:57, played:38, win:17, draw:6, lose:15, goal:53, against:55, diff:-2, prefecture:"大阪", stadium:"パナソニックスタジアム吹田", capacity:39694 },
  { rank:10, team:"セレッソ大阪", points:52, played:38, win:14, draw:10, lose:14, goal:60, against:57, diff:3, prefecture:"大阪", stadium:"ヨドコウ桜スタジアム", capacity:24481 },
  { rank:11, team:"FC東京", points:50, played:38, win:13, draw:11, lose:14, goal:41, against:48, diff:-7, prefecture:"東京", stadium:"味の素スタジアム", capacity:47851 },
  { rank:12, team:"アビスパ福岡", points:48, played:38, win:12, draw:12, lose:14, goal:34, against:38, diff:-4, prefecture:"福岡", stadium:"ベスト電器スタジアム", capacity:21562 },
  { rank:13, team:"ファジアーノ岡山", points:45, played:38, win:12, draw:9, lose:17, goal:34, against:43, diff:-9, prefecture:"岡山", stadium:"JFE晴れの国スタジアム", capacity:15479 },
  { rank:14, team:"清水エスパルス", points:44, played:38, win:11, draw:11, lose:16, goal:41, against:51, diff:-10, prefecture:"静岡", stadium:"IAIスタジアム日本平", capacity:19594 },
  { rank:15, team:"横浜F・マリノス", points:43, played:38, win:12, draw:7, lose:19, goal:46, against:47, diff:-1, prefecture:"神奈川", stadium:"日産スタジアム", capacity:71624 },
  { rank:16, team:"名古屋グランパス", points:43, played:38, win:11, draw:10, lose:17, goal:44, against:56, diff:-12, prefecture:"愛知", stadium:"豊田スタジアム", capacity:42753 },
  { rank:17, team:"東京ヴェルディ", points:43, played:38, win:11, draw:10, lose:17, goal:23, against:41, diff:-18, prefecture:"東京", stadium:"味の素スタジアム", capacity:47851 },
  { rank:18, team:"横浜FC", points:35, played:38, win:9, draw:8, lose:21, goal:27, against:45, diff:-18, prefecture:"神奈川", stadium:"ニッパツ三ツ沢球技場", capacity:15442 },
  { rank:19, team:"湘南ベルマーレ", points:32, played:38, win:8, draw:8, lose:22, goal:36, against:63, diff:-27, prefecture:"神奈川", stadium:"レモンガススタジアム平塚", capacity:15380 },
  { rank:20, team:"アルビレックス新潟", points:24, played:38, win:4, draw:12, lose:22, goal:36, against:67, diff:-31, prefecture:"新潟", stadium:"デンカビッグスワンスタジアム", capacity:41684 }
];
// J1一覧
app.get("/j1", (req, res) => {
  res.render("j1", { data: standings });
});
// J1追加フォーム
app.get("/j1/create", (req, res) => {
  res.sendFile(Path.join(__dirname, "public/j1.html"));
});
// J1追加
app.post("/j1/create", (req, res) => {
  const {
    rank, team, points, played, win, draw, lose,
    goal, against, diff, prefecture, stadium, capacity
  } = req.body;
  standings.push({
    rank: Number(rank), team, points: Number(points), played: Number(played),
    win: Number(win), draw: Number(draw), lose: Number(lose),
    goal: Number(goal), against: Number(against), diff: Number(diff),
    prefecture, stadium, capacity: Number(capacity)
  });
  res.redirect("/j1");
});
// J1詳細
app.get("/j1/:number", (req, res) => {
  const number = req.params.number;
  res.render("j1_detail", { id: number, data: standings[number] });
});
// J1編集
app.get("/j1/edit/:number", (req, res) => {
  const number = req.params.number;
  res.render("j1_edit", { id: number, data: standings[number] });
});
// J1更新
app.post("/j1/update/:number", (req, res) => {
  const number = req.params.number;
  if (!standings[number]) return res.redirect("/j1");
  standings[number] = {
    rank: Number(req.body.rank), team: req.body.team,
    points: Number(req.body.points), played: Number(req.body.played),
    win: Number(req.body.win), draw: Number(req.body.draw), lose: Number(req.body.lose),
    goal: Number(req.body.goal), against: Number(req.body.against), diff: Number(req.body.diff),
    prefecture: req.body.prefecture, stadium: req.body.stadium, capacity: Number(req.body.capacity)
  };
  res.redirect("/j1");
});
// J1削除
app.post("/j1/delete/:number", (req, res) => {
  standings.splice(req.params.number, 1);
  res.redirect("/j1");
});

let jef = [
  { id: 1,  code: "-",  name: "小林 慶行", pos: "監督", birth: "1978/1/27", height: "-",   weight: "-",  from: "埼玉" },
  { id: 2,  code: "2",  name: "高橋 壱晟", pos: "MF", birth: "1998/4/20", height: 180, weight: 81, from: "青森" },
  { id: 3,  code: "3",  name: "久保庭 良太", pos: "DF", birth: "2001/10/14", height: 182, weight: 70, from: "千葉" },
  { id: 4,  code: "4",  name: "田口 泰士", pos: "MF", birth: "1991/3/16", height: 176, weight: 76, from: "沖縄" },
  { id: 5,  code: "5",  name: "小林 祐介", pos: "MF", birth: "1994/10/23", height: 172, weight: 64, from: "埼玉" },
  { id: 6,  code: "6",  name: "エドゥアルド", pos: "MF", birth: "1997/2/1", height: 170, weight: 69, from: "ブラジル" },
  { id: 7,  code: "7",  name: "田中 和樹", pos: "FW", birth: "2000/1/13", height: 173, weight: 67, from: "栃木" },
  { id: 8,  code: "9",  name: "呉屋 大翔", pos: "FW", birth: "1994/1/2", height: 179, weight: 73, from: "大阪" },
  { id: 9,  code: "10", name: "横山 暁之", pos: "MF", birth: "1997/3/26", height: 171, weight: 65, from: "東京" },
  { id:10,  code: "11", name: "米倉 恒貴", pos: "DF", birth: "1988/5/17", height: 176, weight: 71, from: "千葉" },
  { id:11,  code: "13", name: "鈴木 大輔", pos: "DF", birth: "1990/1/29", height: 182, weight: 74, from: "東京" },
  { id:12,  code: "14", name: "椿 直起", pos: "MF", birth: "2000/6/23", height: 172, weight: 65, from: "東京" },
  { id:13,  code: "15", name: "前 貴之", pos: "DF", birth: "1993/9/16", height: 172, weight: 68, from: "北海道" },
  { id:14,  code: "18", name: "杉山 直宏", pos: "MF", birth: "1998/9/7", height: 176, weight: 69, from: "福岡" },
  { id:15,  code: "19", name: "ホセ スアレス", pos: "GK", birth: "1995/12/18", height: 187, weight: 85, from: "スペイン" },
  { id:16,  code: "20", name: "石川 大地", pos: "FW", birth: "1996/2/22", height: 176, weight: 66, from: "茨城" },
  { id:17,  code: "21", name: "薄井 覇斗", pos: "GK", birth: "1999/7/11", height: 186, weight: 85, from: "東京" },
  { id:18,  code: "23", name: "鈴木 椋大", pos: "GK", birth: "1994/2/10", height: 192, weight: 93, from: "愛知" },
  { id:19,  code: "24", name: "鳥海 晃司", pos: "DF", birth: "1995/5/9", height: 183, weight: 73, from: "千葉" },
  { id:20,  code: "26", name: "植田 悠太", pos: "DF", birth: "2004/7/6", height: 173, weight: 62, from: "滋賀" },
  { id:21,  code: "27", name: "岩井 琢朗", pos: "MF", birth: "2002/11/27", height: 175, weight: 66, from: "岡山" },
  { id:22,  code: "28", name: "河野 貴志", pos: "DF", birth: "1996/6/17", height: 186, weight: 82, from: "宮崎" },
  { id:23,  code: "29", name: "カルリーニョス ジュニオ", pos: "FW", birth: "1994/8/8", height: 174, weight: 71, from: "ブラジル" },
  { id:24,  code: "33", name: "猪狩 祐真", pos: "MF", birth: "2003/3/3", height: 167, weight: 63, from: "神奈川" },
  { id:25,  code: "35", name: "若原 智哉", pos: "GK", birth: "1999/12/28", height: 186, weight: 83, from: "滋賀" },
  { id:26,  code: "37", name: "姫野 誠", pos: "MF", birth: "2008/8/12", height: 171, weight: 66, from: "千葉" },
  { id:27,  code: "38", name: "吉田 源太郎", pos: "MF", birth: "2000/10/26", height: 177, weight: 76, from: "大阪" },
  { id:28,  code: "39", name: "森 海渡", pos: "FW", birth: "2000/6/7", height: 185, weight: 80, from: "千葉" },
  { id:29,  code: "42", name: "イサカ ゼイン", pos: "MF", birth: "1997/5/29", height: 174, weight: 78, from: "東京" },
  { id:30,  code: "44", name: "品田 愛斗", pos: "MF", birth: "1999/9/19", height: 180, weight: 72, from: "埼玉" },
  { id:31,  code: "67", name: "日高 大", pos: "MF", birth: "1995/3/14", height: 168, weight: 62, from: "広島" },
  { id:32,  code: "99", name: "デリキ", pos: "FW", birth: "1997/12/2", height: 185, weight: 80, from: "ブラジル" }
];
// JEF一覧
app.get("/jefunited", (req, res) => {
  res.render("jefunited", { data: jef });
});
// JEF追加フォーム
app.get("/jefunited/create", (req, res) => {
  res.sendFile(Path.join(__dirname, "public/jef.html"));
});
// JEF追加
app.post("/jefunited/create", (req, res) => {
  const id = jef.length > 0 ? jef[jef.length - 1].id + 1 : 1;
  const { code, name, pos, birth, height, weight, from } = req.body;
  jef.push({ id, code, name, pos, birth, height, weight, from });
  res.redirect('/jefunited');
});
// JEF詳細
app.get("/jefunited/:number", (req, res) => {
  res.render("jefunited_detail", { id: req.params.number, data: jef[req.params.number] });
});
// JEF編集
app.get("/jefunited/edit/:number", (req, res) => {
  res.render("jefunited_edit", { id: req.params.number, data: jef[req.params.number] });
});
// JEF更新
app.post("/jefunited/update/:number", (req, res) => {
  const number = req.params.number;
  if (!jef[number]) return res.redirect("/jefunited");
  jef[number] = {
    id: req.body.id,
    code: req.body.code,
    name: req.body.name,
    pos: req.body.pos,
    birth: req.body.birth,
    height: req.body.height,
    weight: req.body.weight,
    from: req.body.from
  };
  res.redirect("/jefunited");
});
// JEF削除
app.post("/jefunited/delete/:number", (req, res) => {
  jef.splice(req.params.number, 1);
  res.redirect("/jefunited");
});



let gundams = [
  {
    id: 1,
    faction: "連邦",
    name: "RX-78-2 ガンダム",
    model: "RX-78-2",
    height: "18.0",
    weight: "43.4",
    armament: "ビーム・ライフル, ビーム・サーベル, ハイパー・バズーカ, 60mmバルカン砲",
    pilot: "アムロ・レイ",
    description: "地球連邦軍のV作戦で開発された試作型モビルスーツ。ルナ・チタニウム合金装甲と学習型コンピュータを備え、アムロ・レイの搭乗によって一年戦争を通じて戦局を左右する活躍を見せた。"
  },
  {
    id: 2,
    faction: "連邦",
    name: "ガンキャノン",
    model: "RX-77-2",
    height: "18.1",
    weight: "51.0",
    armament: "240mmキャノン砲, 60mmバルカン砲, スプレー・ミサイル",
    pilot: "カイ・シデン",
    description: "V作戦で開発された中距離支援用モビルスーツ。重装甲と高火力を活かし、後方からの砲撃支援を主な役割とする。"
  },
  {
    id: 3,
    faction: "連邦",
    name: "ガンタンク",
    model: "RX-75-4",
    height: "15.6",
    weight: "56.0",
    armament: "120mm低反動キャノン砲×2, 40mm4連装ポップミサイル×2",
    pilot: "ハヤト・コバヤシ",
    description: "長距離砲撃を担当する砲撃支援用機体。モビルスーツというより移動式砲台に近い設計で、遠距離からの支援に特化している。"
  },
  {
    id: 4,
    faction: "連邦",
    name: "ジム",
    model: "RGM-79",
    height: "17.5",
    weight: "40",
    armament: "ビーム・スプレーガン, シールド",
    pilot: "連邦軍量産機",
    description: "RX-78 ガンダムの設計を簡略化して量産された地球連邦軍初の主力量産型モビルスーツ。一年戦争後半の戦局を支えた。"
  },
  {
    id: 5,
    faction: "連邦",
    name: "ボール",
    model: "RB-79",
    height: "12.8",
    weight: "17.2",
    armament: "180mm低反動キャノン砲",
    pilot: "地球連邦軍兵士",
    description: "作業用宇宙ポッドを武装化した簡易兵器。低コストで大量投入されたが、防御力が低く消耗率も高かった。"
  },
  {
    id: 6,
    faction: "ジオン",
    name: "ザクI（旧ザク）",
    model: "MS-05B",
    height: "17.5",
    weight: "50.8",
    armament: "105mmザク・マシンガン, ヒート・ホーク",
    pilot: "ジオン兵",
    description: "世界初の実用型モビルスーツ。モビルスーツという兵器概念を確立したが、後継機ザクIIの登場により旧式化した。"
  },
  {
    id: 7,
    faction: "ジオン",
    name: "ザクII",
    model: "MS-06F",
    height: "17.5",
    weight: "56.2",
    armament: "120mmザク・マシンガン, ヒート・ホーク",
    pilot: "ジオン兵",
    description: "ジオン公国軍の主力量産型モビルスーツ。一年戦争初期において圧倒的な戦果を挙げ、MS戦術を確立した。"
  },
  {
    id: 8,
    faction: "ジオン",
    name: "グフ",
    model: "MS-07B",
    height: "18.7",
    weight: "58.5",
    armament: "ヒート・ロッド, 5連装75mm機関砲",
    pilot: "ランバ・ラル",
    description: "地上戦に特化して開発されたモビルスーツ。格闘戦能力が高く、ランバ・ラルの搭乗機として知られる。"
  },
  {
    id: 9,
    faction: "ジオン",
    name: "ズゴック",
    model: "MSM-07",
    height: "18.3",
    weight: "60.0",
    armament: "メガ粒子砲×2, アイアン・ネイル",
    pilot: "ジオン兵",
    description: "水陸両用モビルスーツ。高い水中機動性と格闘能力を持ち、港湾施設や水中戦で運用された。"
  },
  {
    id: 10,
    faction: "ジオン",
    name: "アッガイ",
    model: "MSM-04",
    height: "19.6",
    weight: "91.6",
    armament: "メガ粒子砲×4, アイアン・ネイル",
    pilot: "ジオン軍",
    description: "隠密行動を重視して設計された水陸両用モビルスーツ。レーダー反射を抑え、偵察や奇襲任務に用いられた。"
  },
  {
    id: 11,
    faction: "ジオン",
    name: "ゴッグ",
    model: "MSM-03",
    height: "18.3",
    weight: "82.4",
    armament: "メガ粒子砲×2, アイアン・ネイル",
    pilot: "ジオン軍",
    description: "重装甲を特徴とする水陸両用モビルスーツ。耐久力を活かした正面突破を想定した設計となっている。"
  },
  {
    id: 12,
    faction: "ジオン",
    name: "ゾック",
    model: "MSM-10",
    height: "23.6",
    weight: "167.6",
    armament: "メガ粒子砲×8",
    pilot: "ジオン軍",
    description: "前後の区別がない独特な構造を持つ水陸両用モビルスーツ。全方位への砲撃が可能な特殊機体。"
  },
  {
    id: 13,
    faction: "ジオン",
    name: "ドム",
    model: "MS-09",
    height: "18.6",
    weight: "62.6",
    armament: "ヒート・サーベル, ジャイアント・バズ",
    pilot: "ジオン軍",
    description: "ホバー移動を採用した高速地上戦用モビルスーツ。高機動戦闘を得意とし、三連星の搭乗機として有名。"
  },
  {
    id: 14,
    faction: "ジオン",
    name: "リック・ドム",
    model: "MS-09R",
    height: "20.8",
    weight: "63.7",
    armament: "ヒート・サーベル, バズーカ",
    pilot: "ジオン兵",
    description: "ドムを宇宙戦用に改修した機体。宇宙空間での運動性能が向上している。"
  },
  {
    id: 15,
    faction: "ジオン",
    name: "ゲルググ",
    model: "MS-14",
    height: "19.2",
    weight: "55.5",
    armament: "ビーム・ライフル, ビーム・ナギナタ",
    pilot: "ジオン軍",
    description: "ジオン公国軍初の本格的ビーム兵器搭載モビルスーツ。性能面ではガンダムに匹敵する。"
  },
  {
    id: 16,
    faction: "ジオン",
    name: "シャア専用ザクII",
    model: "MS-06S",
    height: "17.5",
    weight: "56.2",
    armament: "120mmザク・マシンガン, ヒート・ホーク",
    pilot: "シャア・アズナブル",
    description: "指揮官用に高出力化されたザクII。シャア・アズナブルの搭乗により「赤い彗星」の異名を取った。"
  },
  {
    id: 17,
    faction: "ジオン",
    name: "シャア専用ズゴック",
    model: "MSM-07S",
    height: "18.3",
    weight: "60.0",
    armament: "メガ粒子砲×2, アイアン・ネイル",
    pilot: "シャア・アズナブル",
    description: "シャア専用に調整されたズゴック。ジャブロー攻略戦でガンダムと交戦した。"
  },
  {
    id: 18,
    faction: "ジオン",
    name: "シャア専用ゲルググ",
    model: "MS-14S",
    height: "19.2",
    weight: "55.5",
    armament: "ビーム・ライフル, ビーム・ナギナタ",
    pilot: "シャア・アズナブル",
    description: "シャア専用に調整された高性能ゲルググ。ガンダムと互角以上の性能を発揮した。"
  },
  {
    id: 19,
    faction: "ジオン",
    name: "ジオング",
    model: "MSN-02",
    height: "25.0",
    weight: "-",
    armament: "サイコミュ搭載ビーム砲",
    pilot: "シャア・アズナブル",
    description:  "一年戦争末期にジオン公国軍が開発したニュータイプ専用MS。サイコミュ兵器により遠隔操作式の有線メガ粒子砲を装備し、圧倒的な火力を誇った。脚部未完成の状態で実戦投入されたが、シャア・アズナブルの搭乗によりア・バオア・クー攻防戦でガンダムと激闘を繰り広げた。",
  },
  {
    id: 20,
    faction: "ジオン",
    name: "ギャン",
    model: "YMS-15",
    height: "19.9",
    weight: "52.7",
    armament: "ビームサーベル, ミサイルシールド, ハイド・ボンブ",
    pilot: "マ・クベ",
    description: "白兵戦に特化して設計された試作型モビルスーツ。格闘戦能力を重視した機体。"
  },
  {
    id: 21,
    faction: "ジオン",
    name: "エルメス",
    model: "MAN-08",
    height: "85.4",
    weight: "-",
    armament: "ビット（無線誘導式ビーム兵器）",
    pilot: "ララァ・スン",
    description: "ニュータイプ専用モビルアーマー。無線誘導式ビーム兵器「ビット」を操る特異な兵器。"
  }
];

/* ===== 一覧（勢力別） ===== */
app.get("/gundam", (req, res) => {
  res.render("gundam", {
    federation: gundams.filter(g => g.faction === "連邦"),
    zeon: gundams.filter(g => g.faction === "ジオン")
  });
});

/* ===== 追加フォーム（修正：静的HTMLファイルを返す） ===== */
app.get("/gundam/create", (req, res) => {
  res.sendFile(Path.join(__dirname, "public/gundam.html"));
});

/* ===== 追加処理 ===== */
app.post("/gundam/create", (req, res) => {
  const id =
    gundams.length > 0 ? Math.max(...gundams.map(g => g.id)) + 1 : 1;

  gundams.push({
    id,
    name: req.body.name,
    model: req.body.model,
    height: req.body.height,
    weight: req.body.weight,
    armament: req.body.armament,
    pilot: req.body.pilot,
    faction: req.body.faction,
    description: req.body.description
  });

  res.redirect("/gundam");
});

/* ===== 詳細（id検索） ===== */
app.get("/gundam/:id", (req, res) => {
  const id = Number(req.params.id);
  const gundam = gundams.find(g => g.id === id);
  if (!gundam) return res.redirect("/gundam");

  res.render("gundam_detail", { data: gundam });
});

/* ===== 編集 ===== */
app.get("/gundam/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const gundam = gundams.find(g => g.id === id);
  if (!gundam) return res.redirect("/gundam");

  // 【注意】編集画面はデータを埋め込む必要があるので、引き続きEJSを使用します
  res.render("gundam_edit", { data: gundam });
});

/* ===== 更新 ===== */
app.post("/gundam/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = gundams.findIndex(g => g.id === id);
  if (index === -1) return res.redirect("/gundam");

  gundams[index] = {
    id,
    name: req.body.name,
    model: req.body.model,
    height: req.body.height,
    weight: req.body.weight,
    armament: req.body.armament,
    pilot: req.body.pilot,
    faction: req.body.faction,
    description: req.body.description
  };

  res.redirect("/gundam/" + id);
});

/* ===== 削除 ===== */
app.post("/gundam/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  gundams = gundams.filter(g => g.id !== id);
  res.redirect("/gundam");
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));