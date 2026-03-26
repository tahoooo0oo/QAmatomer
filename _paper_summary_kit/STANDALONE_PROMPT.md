# Standalone Prompt

以下は、**1つのプロンプトと資料だけを渡して QAmatomer 用 JSON を作らせるとき** のための、**単体で完結する** テンプレです。

この用途では、AI はリポジトリ全体を見られない前提にする。  
与えた資料だけを source として使わせる。

## このファイルのここより下を資料とともに丸ごとプロンプトとして与える

- 出力は **有効な JSON** にする
- トップレベルは `type: "annotator-qa-export"`
- `version` は `2`
- 実データは `projects` 配列に入れる
- 通常は `projects` に 1 件だけ入れればよい
- `projects[0].annotations` は原則 `[]`
- `nodes` は配列ではなく、`id` をキーにした辞書にする
- ツリーは **2段階構成**
- つまり `root -> section node -> leaf node`
- leaf の下にさらに子ノードを作らない
- `guide` は root 直下で子なしでもよい

## ツリー構造

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

## 概観の書き方

各 section node には概観を 1 つ置く。  
概観は、単に見出しを長く言い換えただけの文章にしない。

概観に入れるとよいもの:

- 節の中心的な主張や結論
- 比較表
- 関係図
- 模式図
- 各 leaf を読む前に必要な前提

概観だけを読んだ段階で、その section の中身が頭の中で一度組み上がるようにする。

優先したい形:

- 比較表で論点の違いを先に見せる
- `A -> B -> C` のような因果や依存の流れを示す
- `土台 / 中心 / 帰結` のような層構造を示す
- 「何と何が対立し、何が鍵なのか」を 1-2 文で明示する

簡単な模式図の例:

```text
前提
  ↓
中心主張
  ↓
含意
```

```text
立場A ---- 対立点 ---- 立場B
   \                  /
    \---- 共通前提 ---/
```

## leaf node の作り方

leaf node は、次のどれかの単位で作る。

- 1つの定義群
- 1つの主張群
- 1つの理由群
- 1つの証拠群
- 1つの重要例群
- 1つの比較テーマ
- 1つの手順や判断基準

## source の扱い

- 与えた資料だけを source として使う
- source 由来の情報と要約・整理・推測を混同しない
- source が複数ある場合は、共通点と相違点を混同しない
- 不確かな点は断定しない
- 与えられていない追加資料を想定しない

## 数式と記号のルール

数式や専門記号がある場合は、**Unicode の数学記号をそのまま多用せず、ASCII ベースの LaTeX で書く**。

最重要ルール:

- インライン数式は `$...$` に書く
- 別行立ての数式は `\[ ... \]` に書く
- 数式の中身は ASCII ベースの LaTeX にする
- `\newcommand` のようなローカルマクロは使わない
- JSON 単体で KaTeX / 標準 LaTeX として読める形にする

避けたい書き方:

- `∀x∈X`
- `A → B`
- `f: X ⟶ Y`
- `ℝ`, `ℤ`, `ℂ`
- `α`, `β`, `γ` をそのまま使う

優先する書き方:

- `$\\forall x \\in X$`
- `$A \\to B$`
- `$f \\colon X \\to Y$`
- `$\\mathbb{R}$`, `$\\mathbb{Z}$`, `$\\mathbb{C}$`
- `$\\alpha$`, `$\\beta$`, `$\\gamma$`

つまり、できるだけ

- `→` ではなく `\\to`
- `ℝ` ではなく `\\mathbb{R}`
- `α` ではなく `\\alpha`

のように、LaTeX として明示する。

短い例:

```text
悪い例:
f は X から Y への写像で、A → B をみたす。

よい例:
$f \\colon X \\to Y$ は $X$ から $Y$ への写像で、$A \\to B$ をみたす。
```

## 最小テンプレ

以下の形を土台にして出力する。

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
              "title": "対象の説明",
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
              "content": "このまとまり全体の核心を書く。"
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

## 最短テンプレ

以下の資料だけを source として、QAmatomer にインポートできる JSON を 1 つ作ってください。

条件:

- 出力は `annotator-qa-export`
- `version` は `2`
- `projects[0].annotations` は `[]`
- ツリーは `root -> section node -> leaf node` の 2 段階構成
- leaf の下に子ノードを作らない
- `guide` は root 直下で子なしでもよい
- section node の概観は見出しの言い換えで済ませず、比較表・関係図・模式図・因果の流れなどを使って、その節の核心が先に見えるようにする
- source 由来の情報と要約・整理・推測を混同しない
- 不確かな点は断定しない
- 数式や専門記号がある場合は、Unicode 記号より ASCII ベースの LaTeX を優先する
- 返答は説明文なしで、JSON のみ
