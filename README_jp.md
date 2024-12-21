# Eagleプラグイン 動画コメントをチャプターとして出力

[English](README.md)

## このプラグインについて
Eagleアプリの動画コメントをチャプターとして出力するプラグインです。  
mpvをベースとした動画プレーヤーでEagleで入力した動画コメントをチャプターとして読み込んで動画を再生できるようにします。

## 使い方
- Eagleアプリ内でコメントのある動画を選択します
-  [プラグイン] メニューから [動画コメントをチャプターとして出力] を選択します
- 動画コメントがチャプターファイルとして出力されます
- Eagleアプリから動画をmpvで開きます
- Eagleアプリで入力した動画コメントがmpvのチャプターとして読み込まれ動画が再生されます

## インストールと必要な設定

- Eagleアプリの [プラグイン] メニューから [プラグインセンター] を選び、 [動画コメントをチャプターとして出力] をインストールします。

- mpvをベースとした動画プレーヤー([mpv](https://mpv.io) 、 [IINA](https://iina.io) など) をインストールします。
    - mpv : [https://mpv.io](https://mpv.io)
    - IINA : [https://iina.io](https://iina.io)

- mpvで外部のチャプターファイルを読み込むためのスクリプト [chapter-make-read.lua](https://github.com/dyphire/mpv-scripts) をダウンロードします。(`chapter-make-read.lua`はサードパーティーによるmpv非公式のスクリプトです。)
    - chapter-make-read.lua : [https://github.com/dyphire/mpv-scripts](https://github.com/dyphire/mpv-scripts)

- `chapter-make-read.lua`を以下の場所に配置します。
    - Windows : `C:/Users/Username/AppData/Roaming/mpv/scripts/chapter-make-read.lua`
    - macOS : `~/.config/mpv/scripts/chapter-make-read.lua`

- `chapter-make-read.lua`の設定ファイル`chapter_make_read.conf`をテキストファイルとして作成し、以下の内容を入力して保存します。
    ```chapter_make_read.conf
    global_chapters=yes
    ```
  
- 作成した設定ファイル`chapter_make_read.conf`を以下の場所に配置します。
    - Windows : `C:/Users/Username/AppData/Roaming/mpv/script-opts/chapter_make_read.conf`
    - macOS : `~/.config/mpv/script-opts/chapter_make_read.conf`
  
## FAQ

- **作成されたチャプターファイルはどこに保存されますか**

  `~/.config/mpv/chapters`内に保存されます。
 
- **作成されたチャプターファイルを削除するにはどうしたらいいですか**

  `~/.config/mpv/chapters`内に保存されたファイルを削除してください。
   
- **Eagleアプリで動画コメントやファイル名を変更したらどうなりますか**

  チャプターファイルは変更されません。再度 [動画コメントをチャプターとして出力] を実行して更新してください。

- **同じ名前のファイルがあったらどうなりますか**

  チャプターファイルは上書きされます。

- **Eagleでコメントのある動画を選択してもチャプターが出力されません**

  Eagleアプリでファイルを右クリックし、[その他] - [サムネイルの更新] を行ってください。その後、再度チャプターの出力を試してください。

- **mpvで再生しても動画にチャプターが読み込まれません**

  mpvによる動画の再生を何度か試してください。

- **IINAで再生しても動画にチャプターが読み込まれません**

  IINAの [設定] - [詳細設定]で、`~/.config/mpv/`の設定ディレクトリを使用してください。
