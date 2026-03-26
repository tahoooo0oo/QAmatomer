# Summaries Workspace

このフォルダは、要約 JSON の置き場です。

## 方針

- summary 関連の新規ファイルは、原則このフォルダの下に置く
- リポジトリ直下に要約用フォルダを増やさない
- 使い手は、要約ごとにこの中へ作業フォルダを自分で作る
- 入力ファイルがある場合は、その作業フォルダに入れる
- 入力ファイルがない場合でも、その作業フォルダを作業単位にする
- 出力は同じ作業フォルダ内の `.json` に作る
- できれば JSON ファイル名は作業フォルダ名と同じにする

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

## 命名

- 子フォルダ名は topic が分かる短い slug にする
- 出力 JSON はできれば作業フォルダ名と同じにする
- 同じ topic を更新するときは、まず既存フォルダの再利用を考える
