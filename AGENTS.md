# AGENTS

このリポジトリは Chrome 拡張「無断転載スレイヤー」のソースです。
Google や X (Twitter) 上の URL を DMCA 通報しやすくするためのツール群で構成されています。
各ファイルの概要は以下の通りです。

## ルート直下のファイル

|ファイル|概要|
|-------|----|
|`manifest.json`|拡張機能のメタデータ。読み込まれるスクリプトや権限を定義。|
|`popup.html`|ブラウザツールバーのポップアップ。通報検索や集中砲火モードの設定を表示。|
|`options.html`|詳細設定ページ。報告内容や基本情報の入力を行う。|
|`README.md`|拡張の説明 (日本語)。Chrome ウェブストアへのリンクのみ。|
|`CCslyr.zip`|公開用にまとめた拡張本体の ZIP アーカイブ。|
|`_locales/`|Chrome i18n 用メッセージファイル。日本語と英語を収録。|
|`css/`|スタイルシート。`style.css` と jQuery CustomScrollbar の CSS が入る。|
|`images/`|拡張アイコン類。|
|`js/`|メインスクリプト群。詳細は後述。|
|`sample/`|Google DMCA フォームの保存版 HTML (`Report content on Google.html`) を置く。DOM 調査用。|

## `js/` ディレクトリ

|ファイル|概要|
|-------|----|
|`background.js`|空ファイル (将来のバックグラウンド処理用)。|
|`barrage.js`|Google 検索結果で URL に報告ボタンを挿入する「集中砲火モード」の処理。|
|`content.js`|任意ページにオーバーレイを表示し、URL を DMCA 通報リストへ追加・削除。|
|`g_writer.js`|Google の DMCA フォーム自動入力スクリプト。ラジオボタン等の操作も含む。|
|`options.js`|`options.html` 用。報告内容や設定項目の作成・保存を行う大規模スクリプト。|
|`popup.js`|`popup.html` 用。検索・報告操作、集中砲火モード切り替えなどポップアップの挙動を担当。|
|`reporter.js`|Twitter 検索結果に通報用リンクを追加する。スクロール監視も行う。|
|`reporter_e.js`|個別ツイートページ向けの通報リンク挿入版。|
|`writer.js`|Twitter の DMCA フォーム入力支援。クリップボードを用いて順次入力させる。|
|`jquery.min.js` 等|外部ライブラリ (jQuery および custom scrollbar)。|

## ビルド・実行

特別なビルド手順は無く、`manifest.json` を含むディレクトリを Chrome の拡張機能として読み込むだけで動作します。テストスクリプトや自動化されたビルド処理も存在しません。

拡張内容の修正後は Chrome 上で再読み込みを行い、各ページで動作を確認してください。
