# Structured Summary Kit

以下の指示に従って、QAmatomer 用の JSON を 1 つ作成してください。

この README は、**Codex のようにリポジトリ内のフォルダやファイルを一通り見られる AI** に渡すことを想定しています。

## 前提

- あなたはこのリポジトリ全体を読める
- source は、ユーザーが `_summaries/` の中に用意した作業フォルダ内の全ファイルを基本に読む
- 新しく summary を作るとき、リポジトリ直下に作業フォルダを増やしてはいけない

## summary の置き場

summary 用の置き場は **`_summaries/`** に固定する。

- 使い手は、要約ごとに `_summaries/` の中へ作業フォルダを **自分で作る**
- 入力ファイルがある場合は、その作業フォルダに入れる
- 入力ファイルがない場合でも、その作業フォルダを要約の作業単位として使う
- AI は、その作業フォルダ内の **全ファイル** を source として読む
- AI は、その作業フォルダ内のファイルに加えて、自身がもともと持っている知識や追加で得た情報も使ってまとめを作る
- ただし、作業フォルダ内の source 由来の情報と、AI 側で補った情報は混同しない

例:

```text
_summaries/
  mpim_bonn/
    source_notes.md
    mpim_bonn.json
  kan_extension/
    paper.pdf
    memo.md
    kan_extension.json
```

## 出力先

- 出力ファイルは通常 `作業フォルダ/<作業フォルダ名>.json`
- 追加メモが必要なら同じフォルダに `notes.md` などを置いてよい
- 出力は必ず source と区別して管理する
- 出力先は、ユーザーが指定した作業フォルダの中に固定する
- できれば JSON ファイル名は作業フォルダ名と一致させる
- それが難しい場合でも、テーマが分かる自然な `.json` 名にする

## 出力条件

- トップレベルは `type: "annotator-qa-export"`
- `version` は `2`
- 実データは `projects` 配列に入れる
- 通常は `projects` に 1 件だけ入れればよい
- `projects[0].annotations` は原則 `[]`
- `nodes` は **配列** で書く。全ノードを **深さ優先順**（親 → その子たち → 次の兄弟）で並べる
- `children` フィールドは **書かない**。親子関係は `parentId` だけで表す
- JSON として有効な形式で出力する

## ツリー構造

必ず **2段階構成** にする。

- `root -> section node -> leaf node`
- **leaf の下に子ノードを作らない**
- ただし `guide` は `root` 直下で子なしでもよい

見取り図:

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

役割:

- `root`
  - 全体像を書く
- `section node`
  - 大きなまとまりごとの概観を書く
- `leaf node`
  - 実際の中身を書く

## root に必ず入れること

`root.sections` には少なくとも次を入れる。

- 対象の説明
- 一言まとめ
- 重要ポイントの全体像
- このまとめの構成

## section node の書き方

各 section node では:

- そのまとまり全体の概観を 1 つ置く
- 親子関係は `parentId` で表す（`children` フィールドは書かない）

概観では、次のような中身を先に示す。

- 節の中心的な主張や結論
- 比較表
- 関係図
- 模式図
- 各 leaf を読む前に必要な前提

概観は、**見出しを少し長く言い換えた文章**で済ませてはいけない。`children` の見出し一覧を prose に直しただけの文章にしない。

概観だけを読んだ段階で、その section の中身が頭の中で一度組み上がるようにする。特に次のような形を優先する。

- 比較表で論点の違いを先に見せる
- `A -> B -> C` のような因果や依存の流れを示す
- `土台 / 中心 / 帰結` のような層構造を示す
- 「何と何が対立し、何が鍵なのか」を 1-2 文で明示する

避けること:

- 「この節では A, B, C を扱う」と leaf 名を並べるだけにする
- 「以下で詳しく説明する」と先延ばしする
- 中身のない一般論だけを書く
- 見出しを少し言い換えただけの長い文章にする

## leaf node の書き方

leaf node は、次のどれかの単位で作る。

- 1つの定義群
- 1つの主張群
- 1つの理由群
- 1つの証拠群
- 1つの重要例群
- 1つの比較テーマ
- 1つの手順や判断基準

leaf には次の 3 種類のうち少なくとも 2 種を入れること:

1. **何か** — 定義・主張・事実・手順
2. **なぜか** — 理由・根拠・仕組みの核
3. **何が変わるか** — 帰結・比較・反例・限界・応用

1 種だけの leaf は避ける。特に「定義だけ」「主張だけ」「例だけ」は薄すぎる。

leaf の中では、必要に応じて次を section として並べてよい。

- exact な主張
- 意味・直感
- 根拠
- 例
- 注意点・限界

ただし、leaf の下にさらに子ノードを作ってはいけない。

## source の扱い

- 何を source にしているかが読んで分かるようにする
- source が複数ある場合は、共通点と相違点を混同しない
- source 由来の情報と、自分の要約・整理・推測を混同しない
- 不確かな点は断定しない

## 数式の書き方

- 数式がある場合、インライン数式は必ず `$...$` で囲う
- 別行立ての数式は必ず `\[ ... \]` で囲う
- 裸の数式を書かない
- Unicode 数学記号をそのまま置くより、ASCII ベースの LaTeX を優先する

## 最小テンプレ

`nodes` は配列。深さ優先順（親 → その子たち → 次の兄弟）で並べる。

```json
{
  "type": "annotator-qa-export",
  "version": 2,
  "exportedAt": 1774447326000,
  "projects": [
    {
      "name": "まとめのタイトル",
      "category": "topic_slug",
      "createdAt": 1774447326000,
      "updatedAt": 1774447326000,
      "annotations": [],
      "nodes": [
        {
          "id": "root",
          "parentId": null,
          "topic": "このまとめ全体のトピック",
          "sections": [
            { "id": "root-s1", "title": "対象の説明",         "content": "何を source にして何をまとめるかを書く。" },
            { "id": "root-s2", "title": "一言まとめ",         "content": "このテーマの核心を短く書く。" },
            { "id": "root-s3", "title": "重要ポイントの全体像", "content": "比較表・箇条書き・関係図などで全体像を書く。" },
            { "id": "root-s4", "title": "このまとめの構成",   "content": "下の section node をどう読むかを書く。" }
          ]
        },
        {
          "id": "background",
          "parentId": "root",
          "topic": "前提や背景",
          "sections": [
            { "id": "background-s1", "title": "概観", "content": "このまとまり全体の核心を書く。" }
          ]
        },
        {
          "id": "terms",
          "parentId": "background",
          "topic": "基本用語",
          "sections": [
            { "id": "terms-s1", "title": "定義", "content": "用語の定義や意味を書く。" }
          ]
        },
        {
          "id": "context",
          "parentId": "background",
          "topic": "背景事情",
          "sections": [
            { "id": "context-s1", "title": "ポイント", "content": "背景や前提条件を書く。" }
          ]
        },
        {
          "id": "core",
          "parentId": "root",
          "topic": "中心内容",
          "sections": [
            { "id": "core-s1", "title": "概観", "content": "この節の結論・比較・関係を先に書く。" }
          ]
        },
        {
          "id": "claim",
          "parentId": "core",
          "topic": "中心主張",
          "sections": [
            { "id": "claim-s1", "title": "主張", "content": "何が重要な主張かを書く。" }
          ]
        },
        {
          "id": "example",
          "parentId": "core",
          "topic": "具体例",
          "sections": [
            { "id": "example-s1", "title": "例", "content": "代表例や応用例を書く。" }
          ]
        },
        {
          "id": "qa",
          "parentId": "root",
          "topic": "追加の質問と回答",
          "sections": [
            { "id": "qa-s1", "title": "概観", "content": "このまとめに対して後から寄せられた質問と回答を収録する。" }
          ]
        },
        {
          "id": "guide",
          "parentId": "root",
          "topic": "ガイド",
          "sections": [
            { "id": "guide-s1", "title": "読み方", "content": "どの順で読むと分かりやすいかを書く。" }
          ]
        }
      ]
    }
  ]
}
```

## 最低限のチェック

- `type` は `annotator-qa-export` か
- `version` は `2` か
- `projects[0].annotations` は `[]` か
- `nodes` は配列か（辞書になっていないか）
- `children` フィールドが存在しないか
- 全ノードに `parentId` があるか（root のみ `null`、それ以外は親の id 文字列）
- 全ノードのフィールド名が `topic` になっているか（`title` や `question` になっていないか）
- 全 section に `id` があるか
- 配列の順序が深さ優先か（section の直後にその leaf が続いているか）
- `guide` を除き、3段以上に深くなっていないか
- 出力先が `_summaries/` の下か

## 参考

- 詳しいルールは `STYLE_GUIDE.md`
- テンプレは `PROMPT_TEMPLATE.md`
- 1プロンプト完結版は `STANDALONE_PROMPT.md`
