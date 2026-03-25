# Structured Summary Kit

このフォルダは、与えられた情報を QAmatomer 用 JSON に構造化するときの共通ルール置き場です。

対象は論文に限りません。たとえば、

- 論文
- 教科書や記事
- 配布資料
- 自分のメモ
- 会話ログ
- GPT などに調べさせた結果

のような情報全般を、ツリー構造で整理するために使います。

## 使いどころ

- あるテーマの仕組みを説明したいとき
- 争点のある話題を整理したいとき
- 意思決定の条件や比較軸をまとめたいとき
- 複数資料を読んで全体像を作りたいとき
- AI に調べさせた内容を、あとで使いやすい形に整理したいとき

## 使い方

1. まとめたい情報を `private/` 配下のどこかのフォルダに置く
2. `PROMPT_TEMPLATE.md` のテンプレを使って依頼する
3. 作られた JSON が `STYLE_GUIDE.md` に従っているかを見る

## 含まれているもの

- `STYLE_GUIDE.md`
  - まとめ方の統一ルール
- `PROMPT_TEMPLATE.md`
  - そのまま使える依頼文テンプレ
- `examples/`
  - 公開用サンプル JSON

## Public Sample

公開用サンプルを `examples/` に置いています。どれも **2 段階構成** を基本にし、`guide` だけは root 直下で完結する形で作っています。

- `examples/game_theory_sample.json`
  - **ゲーム理論の基礎：戦略と均衡**（数式あり）
- `examples/philosophy_of_science_sample.json`
  - **科学の方法論：反証主義と科学革命論**（数式なし）
