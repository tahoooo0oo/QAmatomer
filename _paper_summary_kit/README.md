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

## READMEだけで分かる最短ルール

サンプルを見なくても、まず次だけ押さえれば JSON は書けます。

- トップレベルは `type: "annotator-qa-export"` と `version: 2`
- 実データは `projects` 配列の中に 1 件以上入れる
- 各 project は `name`, `category`, `createdAt`, `updatedAt`, `annotations`, `nodes` を持つ
- `annotations` は原則 `[]`
- ツリーは **2段階構成** にする
- つまり `root -> section node -> leaf node`
- **leaf の下に子ノードを作らない**
- ただし `guide` は `root` 直下で子なしでもよい

## JSONの骨格

最低限の形は次です。

```json
{
  "type": "annotator-qa-export",
  "version": 2,
  "exportedAt": 1774447326000,
  "projects": [
    {
      "name": "まとめのタイトル",
      "category": "sample_topic",
      "createdAt": 1774447326000,
      "updatedAt": 1774447326000,
      "annotations": [],
      "nodes": {
        "root": {
          "id": "root",
          "parentId": null,
          "question": "このまとめ全体の問い",
          "sections": [
            {
              "id": "root-s1",
              "title": "対象と source",
              "content": "何を source にして何をまとめるかを書く。"
            },
            {
              "id": "root-s2",
              "title": "一言まとめ",
              "content": "このテーマの核心を短く書く。"
            },
            {
              "id": "root-s3",
              "title": "重要ポイントの全体像",
              "content": "比較表・箇条書き・関係図などで全体像を書く。"
            },
            {
              "id": "root-s4",
              "title": "このまとめの構成",
              "content": "下の section node をどう読むかを書く。"
            }
          ],
          "children": ["background", "core", "guide"]
        },
        "background": {
          "id": "background",
          "parentId": "root",
          "question": "前提や背景",
          "sections": [
            {
              "id": "background-s1",
              "title": "概観",
              "content": "このまとまり全体の核心を書く。目次の言い換えだけにしない。"
            }
          ],
          "children": ["terms", "context"]
        },
        "terms": {
          "id": "terms",
          "parentId": "background",
          "question": "基本用語",
          "sections": [
            {
              "id": "terms-s1",
              "title": "定義",
              "content": "用語の定義や意味を書く。"
            }
          ],
          "children": []
        },
        "context": {
          "id": "context",
          "parentId": "background",
          "question": "背景事情",
          "sections": [
            {
              "id": "context-s1",
              "title": "ポイント",
              "content": "背景や前提条件を書く。"
            }
          ],
          "children": []
        },
        "core": {
          "id": "core",
          "parentId": "root",
          "question": "中心内容",
          "sections": [
            {
              "id": "core-s1",
              "title": "概観",
              "content": "この節の結論・比較・関係を先に書く。"
            }
          ],
          "children": ["claim", "example"]
        },
        "claim": {
          "id": "claim",
          "parentId": "core",
          "question": "中心主張",
          "sections": [
            {
              "id": "claim-s1",
              "title": "主張",
              "content": "何が重要な主張かを書く。"
            }
          ],
          "children": []
        },
        "example": {
          "id": "example",
          "parentId": "core",
          "question": "具体例",
          "sections": [
            {
              "id": "example-s1",
              "title": "例",
              "content": "代表例や応用例を書く。"
            }
          ],
          "children": []
        },
        "guide": {
          "id": "guide",
          "parentId": "root",
          "question": "ガイド",
          "sections": [
            {
              "id": "guide-s1",
              "title": "読み方",
              "content": "どの順で読むと分かりやすいかを書く。"
            }
          ],
          "children": []
        }
      }
    }
  ]
}
```

## ツリーの見取り図

構造は次のように考えると迷いにくいです。

```text
root
├── section node A
│   ├── leaf A-1
│   └── leaf A-2
├── section node B
│   ├── leaf B-1
│   └── leaf B-2
└── guide
```

重要なのは、`section node` は「分類棚」、`leaf node` は「実際の中身の単位」だということです。

- `root` は全体像
- `section node` はまとまりごとの概観
- `leaf node` は定義、主張、理由、例、比較、手順などの実質部分

## 各キーの意味

- `type`
  - 常に `annotator-qa-export`
- `version`
  - 常に `2`
- `exportedAt`
  - JSONを書き出した時刻のミリ秒
- `projects`
  - まとめ本体の配列。通常は 1 件でよい
- `name`
  - まとめのタイトル
- `category`
  - フォルダ名や分類名
- `annotations`
  - 原則 `[]`
- `nodes`
  - ノードを `id` ごとに持つ辞書
- `id`
  - ノード自身の識別子
- `parentId`
  - 親ノードの `id`。`root` だけ `null`
- `question`
  - そのノードが答える問い
- `sections`
  - ノード本文。通常は 1 個以上
- `children`
  - 子ノードの `id` 配列。leaf では `[]`

## root / section / leaf の書き分け

### root に書くこと

- 対象の説明
- 一言まとめ
- 重要ポイントの全体像
- このまとめの構成

### section node に書くこと

- そのまとまり全体の概観を 1 つ置く
- 概観では、結論・比較表・関係図・前提を先に示す
- 「この節では A, B, C を扱う」だけで終わらせない

### leaf node に書くこと

- 1つの定義群
- 1つの主張群
- 1つの理由群
- 1つの証拠群
- 1つの重要例群
- 1つの比較テーマ
- 1つの手順や判断基準

## ありがちな失敗

- `nodes` を配列で書いてしまう
- `root` を作らない
- `leaf` の下にさらに子ノードを作る
- `section node` の概観が目次の言い換えだけになっている
- `annotations` を省略する
- 出力ファイルを `*_private.json` にしない

## 最低限のチェック項目

- `type` は `annotator-qa-export` か
- `version` は `2` か
- `projects[0].annotations` は `[]` か
- `root` があるか
- `root` の `children` が section node を指しているか
- section node の `children` が leaf node を指しているか
- leaf node の `children` が `[]` か
- `guide` を除き、3段以上に深くなっていないか
- ファイル名が `*_private.json` か

## 含まれているもの

- `STYLE_GUIDE.md`
  - まとめ方の統一ルール
- `PROMPT_TEMPLATE.md`
  - そのまま使える依頼文テンプレ
- `examples/`
  - 公開用サンプル JSON

## Public Sample

公開用サンプルを `examples/` に置いています。README の説明だけで JSON は書けるようにしていますが、実例を見たいときの参照用として使えます。どれも **2 段階構成** を基本にし、`guide` だけは root 直下で完結する形で作っています。

- `examples/game_theory_sample.json`
  - **ゲーム理論の基礎：戦略と均衡**（数式あり）
- `examples/philosophy_of_science_sample.json`
  - **科学の方法論：反証主義と科学革命論**（数式なし）
