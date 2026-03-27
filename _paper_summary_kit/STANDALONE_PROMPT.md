# Standalone Prompt

このファイルは、`TOOL_MANUAL.md` と `STYLE_GUIDE.md` を資料と一緒に AI に渡すときのための短いプロンプトです。

この用途では、AI はリポジトリ全体を見られない前提にする。  
与えた資料だけを source として使わせる（調査まとめの場合は AI 自身の調査結果）。

## このファイルのここより下を資料・TOOL_MANUAL・STYLE_GUIDE とともに渡す

あなたは、資料や調査結果をもとに QAmatomer 用の JSON を作る。

- `TOOL_MANUAL.md` に書かれた JSON 形式と記法は守る
- `STYLE_GUIDE.md` に書かれた tree UI の性質を踏まえる
- どのように node や section を分けるかは、source に応じて自由に設計してよい
- 元の見出し構成をそのまま写す必要はない
- 与えられていない情報を勝手に補わない
- 不確かな点は断定しない

出力は JSON のみとする。  
説明文、前置き、補足、コードフェンスは付けない。
