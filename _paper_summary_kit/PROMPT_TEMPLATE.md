# Prompt Template For Structured Summaries

このファイルは、人間が AI にまとめ生成を依頼するときのテンプレです。

- `TOOL_MANUAL.md` は仕様と記法
- `STYLE_GUIDE.md` は tree UI の性質と設計のヒント
- `STANDALONE_PROMPT.md` は standalone 用の短いプロンプト

## 下準備

1. `_summaries/` の中に、要約したいテーマ専用のフォルダを作る
2. 参考にさせたいファイルがある場合は、そのフォルダに入れる
3. そのフォルダを AI に渡す

## 資料あり

```text
このリポジトリ全体を読んでよいです。
_paper_summary_kit/TOOL_MANUAL.md と _paper_summary_kit/STYLE_GUIDE.md を読んだうえで、次の作業フォルダ内の資料をもとに QAmatomer 用の JSON まとめを作ってください。
出力は同じ作業フォルダ内の .json にしてください。ファイル名は、作業フォルダ名と同じ名前にしてください。

作業フォルダ:
- _summaries/ここにフォルダ名
```

## 資料なし

```text
このリポジトリ全体を読んでよいです。
_paper_summary_kit/TOOL_MANUAL.md と _paper_summary_kit/STYLE_GUIDE.md を読んだうえで、次の作業フォルダを使って QAmatomer 用の JSON まとめを作ってください。
今回は作業フォルダ内に資料を置いていないので、そのテーマについて追加で調べた情報も使ってまとめを作ってください。
出力は同じ作業フォルダ内の .json にしてください。ファイル名は、できれば作業フォルダ名と同じ名前にしてください。

作業フォルダ:
- _summaries/ここにフォルダ名
```

## 既存まとめを修正するとき

```text
このリポジトリ全体を読んでよいです。
_paper_summary_kit/TOOL_MANUAL.md と _paper_summary_kit/STYLE_GUIDE.md を読んだうえで、次の作業フォルダにある既存の JSON まとめを整理し直してください。

作業フォルダ:
- _summaries/ここにフォルダ名
```
