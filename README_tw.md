# Eagle 插件 : 將影片標註匯出為章節

[English](README.md)

## 關於此插件
此插件將 Eagle 應用中的影片標註導出為章節。它使基於 mpv 的影片播放器能夠加載 Eagle 中輸入的影片標註作為章節，並相應地播放影片。

## 使用方法
- 在 Eagle 應用中選擇帶有標註的影片。
- 從 [插件] 菜單中選擇 [將影片標註匯出為章節]。
- 影片標註將被導出為章節文件。
- 使用 mpv 從 Eagle 應用中打開影片。
- Eagle 應用中輸入的影片標註將作為章節加載到 mpv 中，並相應播放影片。

## 安裝和所需設置

- 從 Eagle 應用的 [插件] 菜單中選擇 [插件中心] 並安裝 [將影片標註匯出為章節]。

- 安裝基於 mpv 的影片播放器 ([mpv](https://mpv.io) 和 [IINA](https://iina.io) 等)。

- 下載腳本 [chapter-make-read.lua](https://github.com/dyphire/mpv-scripts) 以啟用 mpv 加載外部章節文件。（注意:`chapter-make-read.lua` 是第三方創建的非官方 mpv 腳本）

- 將 `chapter-make-read.lua` 放置在以下位置：
    - Windows : `C:/Users/Username/AppData/Roaming/mpv/scripts/chapter-make-read.lua`
    - macOS : `~/.config/mpv/scripts/chapter-make-read.lua`

- 創建一個配置文件 `chapter_make_read.conf` 作為文本文件，並輸入以下內容：
    ```chapter_make_read.conf
    global_chapters=yes
    ```
  
- 將配置文件 `chapter_make_read.conf` 放置在以下位置：
    - Windows : `C:/Users/Username/AppData/Roaming/mpv/script-opts/chapter_make_read.conf`
    - macOS : `~/.config/mpv/script-opts/chapter_make_read.conf`
  
## 常見問題解答

- **創建的章節文件保存在哪裡？**

  它們保存在 `~/.config/mpv/chapters` 中。
 
- **如何刪除創建的章節文件？**

  刪除保存在 `~/.config/mpv/chapters` 中的文件。
   
- **如果在 Eagle 應用中更改影片標註或文件名會發生什麼？**

  章節文件不會更新。再次運行 [將影片標註匯出為章節] 以更新它們。

- **如果有同名文件會發生什麼？**

  章節文件將被覆蓋。

- **為什麼在 Eagle 應用中選擇帶標註的影片後章節仍未導出？**

  在 Eagle 應用中右鍵單擊文件並選擇 [更多...] - [刷新縮略圖]，然後再次嘗試導出章節。

- **為什麼在 mpv 中播放影片時未加載章節？**

  嘗試多次使用 mpv 播放影片。

- **為什麼在 IINA 中播放影片時未加載章節？**

  在 IINA 設置中，選擇 [偏好設置] - [高級]，使用設置目錄 `~/.config/mpv/`。
