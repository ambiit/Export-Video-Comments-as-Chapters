# Eagle Plugin: Export Video Comments as Chapters

[日本語](README_jp.md)

## About This Plugin

This plugin exports video comments entered in the Eagle app as chapter files.
It enables video players based on mpv to load and play video comments as chapters.

## Usage

- Select a video with comments in the Eagle app.
- From the [Plugin] menu, select [Export Video Comments as Chapters].
- The video comments will be exported as a chapter file.
- Open the video with mpv from the Eagle app.
- The video comments entered in the Eagle app will be load as chapters in mpv and the video will play accordingly.

## Installation and Required Settings

- From the Eagle app's [Plugin] menu, select [Plugin Center] and install [Export Video Comments as Chapters].

- Install a video player based on mpv ([mpv](https://mpv.io) , [IINA](https://iina.io) , etc.).
  - mpv : [https://mpv.io](https://mpv.io)
  - IINA : [https://iina.io](https://iina.io)

- Download the script [chapter-make-read.lua](https://github.com/dyphire/mpv-scripts) to enable mpv to load external chapter files. (Note: `chapter-make-read.lua` is an unofficial script for mpv created by a third party.)
  - chapter-make-read.lua : [https://github.com/dyphire/mpv-scripts](https://github.com/dyphire/mpv-scripts)

- Place `chapter-make-read.lua` in the following locations:
  - Windows : `C:/Users/Username/AppData/Roaming/mpv/scripts/chapter-make-read.lua`
  - macOS : `~/.config/mpv/scripts/chapter-make-read.lua`

- Create a configuration file `chapter_make_read.conf` as a text file and enter the following content:
  ```chapter_make_read.conf
  global_chapters=yes
  ```
- Place the configuration file `chapter_make_read.conf` in the following locations:
  - Windows : `C:/Users/Username/AppData/Roaming/mpv/script-opts/chapter_make_read.conf`
  - macOS : `~/.config/mpv/script-opts/chapter_make_read.conf`

## FAQ

- **Where are the created chapter files saved?**

  They are saved in `~/.config/mpv/chapters`.

- **How do I delete the created chapter files?**

  Delete the files saved in `~/.config/mpv/chapters`.

- **What happens if I change video comments or file names in the Eagle app?**

  The chapter files will not be updated. Run [Export Video Comments as Chapters] again to update them.

- **What happens if there is a file with the same name?**

  The chapter file will be overwritten.

- **Why are chapters not exported even after selecting a video with comments in the Eagle app?**

  In the Eagle app, right-click the file and select [More...] - [Refresh Thumbnail], then try exporting the chapters again.

- **Why are chapters not loaded in the video when played with mpv?**

  Try playing the video with mpv several times.

- **Why are chapters not loaded in the video when played with IINA?**

  In IINA settings, under [Preferences] - [Advanced], use the settings directory `~/.config/mpv/`.
