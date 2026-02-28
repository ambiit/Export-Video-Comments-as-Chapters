# Eagle 插件 : 将视频标注汇出为章节

[English](README.md)

## 关于此插件

此插件将Eagle应用中输入的视频标注导出为章节文件。
它使基于mpv的视频播放器能够加载并播放视频标注作为章节。

## 使用方法

- 在 Eagle 应用中选择带有标注的视频。
- 从 [插件] 菜单中选择 [将视频标注汇出为章节]。
- 视频标注将被导出为章节文件。
- 使用 mpv 从 Eagle 应用中打开视频。
- 在Eagle应用中输入的视频标注将作为章节加载到mpv中，并相应播放视频。

## 安装和所需设置

- 从 Eagle 应用的 [插件] 菜单中选择 [插件中心] 并安装 [将视频标注汇出为章节]。

- 安装基于 mpv 的视频播放器 ([mpv](https://mpv.io) , [IINA](https://iina.io) , 等)。
  - mpv : [https://mpv.io](https://mpv.io)
  - IINA : [https://iina.io](https://iina.io)

- 下载脚本 [chapter-make-read.lua](https://github.com/dyphire/mpv-scripts) 以启用 mpv 加载外部章节文件。（注意：`chapter-make-read.lua` 是第三方创建的非官方 mpv 脚本。）
  - chapter-make-read.lua : [https://github.com/dyphire/mpv-scripts](https://github.com/dyphire/mpv-scripts)

- 将 `chapter-make-read.lua` 放置在以下位置：
  - Windows : `C:/Users/Username/AppData/Roaming/mpv/scripts/chapter-make-read.lua`
  - macOS : `~/.config/mpv/scripts/chapter-make-read.lua`

- 创建一个配置文件 `chapter_make_read.conf` 作为文本文件，并输入以下内容：
  ```chapter_make_read.conf
  global_chapters=yes
  ```
- 将配置文件 `chapter_make_read.conf` 放置在以下位置：
  - Windows : `C:/Users/Username/AppData/Roaming/mpv/script-opts/chapter_make_read.conf`
  - macOS : `~/.config/mpv/script-opts/chapter_make_read.conf`

## 常见问题解答

- **创建的章节文件保存在哪里？**

  它们保存在 `~/.config/mpv/chapters` 中。

- **如何删除创建的章节文件？**

  删除保存在 `~/.config/mpv/chapters` 中的文件。

- **如果在 Eagle 应用中更改视频标注或文件名会发生什么？**

  T章节文件不会更新。再次运行 [将视频标注汇出为章节] 以更新它们。

- **如果有同名文件会发生什么？**

  章节文件将被覆盖。

- **为什么在 Eagle 应用中选择带标注的视频后章节仍未导出？**

  在 Eagle 应用中右键单击文件并选择 [更多...] - [刷新缩略图]，然后再次尝试导出章节。

- **为什么在 mpv 中播放视频时未加载章节？**

  尝试多次使用 mpv 播放视频。

- **为什么在 IINA 中播放视频时未加载章节？**

  在 IINA 设置中，选择 [偏好设置] - [高级]，使用设置目录 `~/.config/mpv/`。
