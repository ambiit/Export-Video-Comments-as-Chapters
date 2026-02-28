function ClickedCancel() {
  window.close();
}
const button = document.getElementById("cancel");
button.addEventListener("click", ClickedCancel);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function InAppCancel() {
  await sleep(2000);
  window.close();
}

function CnvCommentToChapter(duration) {
  if (isNaN(duration) == true) return;

  //整数秒を取得
  const seconds = Math.trunc(duration);

  //整数秒から時分秒を取得
  const hour = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  //文字列に変換しゼロ埋め
  const s_hour = String(hour).padStart(2, "0");
  const s_min = String(min).padStart(2, "0");
  const s_sec = String(sec).padStart(2, "0");

  //小数秒を文字列で取得
  let s_msec = String();
  let i = String(duration).indexOf(".");
  if (i > -1) {
    s_msec = String(duration).substring(i);
  } else {
    s_msec = ".000";
  }

  //作りたい形式　00:00:00.000
  let chapter_time = `${s_hour}:${s_min}:${s_sec}${s_msec}`;
  return chapter_time;
}

function InitializeProgressBar(items) {
  if (items <= 0) return;

  let maxValue = 0;
  if (items <= 50) {
    maxValue = Math.floor(50 / items) * items;
  } else {
    maxValue = items;
  }

  const progressbar = document.querySelector("#pb");
  progressbar.max = maxValue;
  progressbar.style.visibility = "visible";
}

async function ControlProgressBar(items, loop, current) {
  const progressText = i18next.t("message.progress");
  const caption = document.querySelector("#caption");
  caption.innerHTML = `${progressText} (${current}/${items})`;

  let start = 0;
  let until = 0;
  if (items <= 50) {
    start = Math.floor(50 / items) * loop - (Math.floor(50 / items) - 1);
    until = loop * Math.floor(50 / items);
  } else {
    start = loop;
    until = loop;
  }

  const progressbar = document.querySelector("#pb");
  for (let i = start; i <= until; i++) {
    progressbar.value = i;
    await sleep(1);
  }
}

function ControlMessage(msg) {
  const cap = document.querySelector("#caption");
  cap.innerHTML = msg;
}

eagle.onPluginCreate(async (plugin) => {
  console.log("eagle.onPluginCreate");

  //Thema
  const theme = eagle.app.theme;
  document.body.setAttribute("theme", theme);

  //Cancel button
  const buttonText = i18next.t("button.cancel");
  document.getElementById("cancel").innerText = buttonText;

  //Ready
  const readyText = i18next.t("message.ready");
  ControlMessage(readyText);

  const fs = require("fs");
  const path = require("path");

  // selected item
  let selected = await eagle.item.getSelected();

  // selected item is nothing
  if (selected.length == 0) {
    const noitemText = i18next.t("message.noitem");
    ControlMessage(noitemText);
    await InAppCancel();
    return;
  }

  // chapter folder path
  const home = eagle.os.homedir();
  let chapters_folder = "";
  switch (eagle.os.type()) {
    case "Windows_NT":
      chapters_folder = path.join(
        home,
        "AppData",
        "Roaming",
        "mpv",
        "chapters",
      );
      break;
    case "Darwin":
      chapters_folder = path.join(home, ".config", "mpv", "chapters");
      break;
    default:
      return;
  }

  // chapter folder make dir
  try {
    await fs.promises.mkdir(chapters_folder, { recursive: true });
  } catch (e) {
    console.log(e);
    ControlMessage(e.message);
    await InAppCancel();
    return;
  }

  // Initialize ProgressBar
  InitializeProgressBar(selected.length);

  // export chapter file
  let metadata = undefined;
  let loop_cnt = 0;
  let output_cnt = 0;
  for (const item of selected) {
    loop_cnt += 1;

    //open metadata.json
    try {
      metadata = fs.readFileSync(item.metadataFilePath);
    } catch (e) {
      console.log(e);
      await ControlProgressBar(selected.length, loop_cnt, output_cnt);
      continue;
    }
    try {
      metadata = JSON.parse(metadata);
    } catch (e) {
      console.log(e);
      await ControlProgressBar(selected.length, loop_cnt, output_cnt);
      continue;
    }

    //comment nothing
    if (Object.is(metadata.comments, undefined)) {
      await ControlProgressBar(selected.length, loop_cnt, output_cnt);
      continue;
    }

    //comment empty
    if (metadata.comments.length == 0) {
      await ControlProgressBar(selected.length, loop_cnt, output_cnt);
      continue;
    }

    //duration nothing
    let no_duration = false;
    for (const comment of metadata.comments) {
      if (Object.is(comment.duration, undefined)) {
        no_duration = true;
        break;
      }
    }
    if (no_duration == true) {
      await ControlProgressBar(selected.length, loop_cnt, output_cnt);
      continue;
    }

    //export comment
    const chapter_name = item.name + "." + item.ext + ".chp";
    const chapter_path = path.join(chapters_folder, chapter_name);
    try {
      const fd = fs.openSync(chapter_path, "w");
      for (const comment of metadata.comments) {
        fs.writeSync(fd, String(CnvCommentToChapter(comment.duration)));
        fs.writeSync(fd, " ");
        fs.writeSync(fd, String(comment.annotation));
        fs.writeSync(fd, "\n");
      }
      fs.closeSync(fd);
    } catch (e) {
      console.log(e);
      await ControlProgressBar(selected.length, loop_cnt, output_cnt);
      continue;
    }
    output_cnt += 1;
    await ControlProgressBar(selected.length, loop_cnt, output_cnt);
  }

  await InAppCancel();
  return;
});

eagle.onPluginRun(() => {
  console.log("eagle.onPluginRun");
});

eagle.onPluginShow(async () => {
  console.log("eagle.onPluginShow");
});

eagle.onPluginHide(() => {
  console.log("eagle.onPluginHide");
});

eagle.onPluginBeforeExit((event) => {
  console.log("eagle.onPluginBeforeExit");
});

eagle.onThemeChanged((theme) => {
  document.body.setAttribute("theme", theme);
});
