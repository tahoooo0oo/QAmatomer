# Prompt Template For Structured Summaries

## 最短テンプレ

以下のフォルダにある情報を、`_paper_summary_kit/STYLE_GUIDE.md` に従ってまとめてください。  
出力は同じフォルダに `*_private.json` として作ってください。

対象フォルダ: `private/ここに対象フォルダ名`

## 少し丁寧なテンプレ

`private/ここに対象フォルダ名` にある資料やメモを読んで、  
`_paper_summary_kit/STYLE_GUIDE.md` のルールに従って  
QAmatomer 用の JSON まとめを作ってください。

source は、記事・教科書・配布資料・自分のメモ・会話ログ・AI に調べさせた内容など何でもかまいません。論文もその一例です。  
条件:

- 2段階構成のツリーにする
- root に全体像を置く
- 各 section node には概観を置く。概観は「この節では○○を扱います」という目次の言い換えにしない。比較表・核心的な主張・関係図など、その節のポイントを読んだだけで掴める内容にする
- leaf の下に子ノードを作らない
- source と要約・整理を混同しない
- 出力先は同じフォルダ

## AI 調査結果を整理したいとき

`private/ここに対象フォルダ名` にある AI 調査メモや関連資料を、  
`_paper_summary_kit/STYLE_GUIDE.md` に従って整理してください。

特に:

- source 由来の情報と要約を混同しない
- 不確かな点は断定しない
- 争点、根拠、例、読み順が分かる形にする

## 既存まとめを修正したいとき

`private/ここに対象フォルダ名/既存ファイル_private.json` を、  
`_paper_summary_kit/STYLE_GUIDE.md` に合わせて整理し直してください。

特に:

- ツリーを 2 段階構成に揃える
- root と section node の概観を補う
- 主張・根拠・例の切り分けを見やすくする
- 不要な細分化を減らす
