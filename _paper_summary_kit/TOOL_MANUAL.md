# QAmatomer Tool Manual

## できること

- 情報の主従関係や分岐を tree として表現できる
- `project` ごとに複数の `node` を持てる
- `node` は親子関係を持てる
- `node` の中に複数の `section` を持てる
- `section` の本文に Markdown、表、コードブロック、数式を書ける
- JSON でインポート / エクスポートできる

## 表示

- 画面左から順に、全体の階層構造の目次、選択中 `node` の内容、その子要素、その孫要素、…という列構成で表示される
- 階層が深くなるほど、右側に列が増える
- 普通のパソコン画面程度の横幅では、目次列、選択中 `node`、子要素くらいまでが一画面に収まりやすい

## JSON 形式

- トップレベルは `type: "annotator-qa-export"`
- `version` は `2`
- 実データは `projects` 配列に入る
- 各 `project` は `name`, `category`, `createdAt`, `updatedAt`, `annotations`, `nodes` を持つ
- `annotations` は不要なら `[]` でよい
- `nodes` は配列
- 各 `node` は `id`, `parentId`, `topic`, `sections` を持つ
- root の `parentId` は `null`
- 親子関係は `parentId` で表す
- 同じ親を持つ `node` の並び順は `nodes` 配列の順序で決まる
- `children` フィールドは使わない
- 各 `section` は `id`, `title`, `content` を持つ

## 本文記法

- `content` は Markdown
- インライン数式は `$...$`
- 別行数式は `\[ ... \]`

## 最小例

```json
{
  "type": "annotator-qa-export",
  "version": 2,
  "exportedAt": 0,
  "projects": [
    {
      "name": "Sample",
      "category": "examples",
      "createdAt": 0,
      "updatedAt": 0,
      "annotations": [],
      "nodes": [
        {
          "id": "root",
          "parentId": null,
          "topic": "Root",
          "sections": [
            {
              "id": "root-s1",
              "title": "Overview",
              "content": "..."
            }
          ]
        }
      ]
    }
  ]
}
```
