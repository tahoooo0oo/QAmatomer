const DEFAULT_DEV_URL = 'http://127.0.0.1:4173/QAmatomer_dev.html';

let qaWindowId = null;
let chatWindowId = null;
let currentMode = 'full';

async function getDevUrl() {
  const { devUrl } = await chrome.storage.sync.get({ devUrl: DEFAULT_DEV_URL });
  return devUrl || DEFAULT_DEV_URL;
}

async function getWorkArea() {
  return new Promise((resolve) => {
    chrome.system.display.getInfo((displays) => {
      const primary = displays.find((d) => d.isPrimary) || displays[0];
      resolve(primary.workArea);
    });
  });
}

// 最大化・フルスクリーン状態でもboundsを正確に適用するため2段階で更新
async function setWindowBounds(windowId, left, top, width, height) {
  const win = await chrome.windows.get(windowId);
  if (win.state === 'maximized' || win.state === 'fullscreen') {
    await chrome.windows.update(windowId, { state: 'normal' });
  }
  await chrome.windows.update(windowId, { left, top, width, height });
}

// サイドモード: ChatGPT 左60% + QAmatomer 右40%
async function enterSideMode(triggeredWindowId, wa) {
  if (!wa) wa = await getWorkArea();

  const targetChatId = (triggeredWindowId === qaWindowId && chatWindowId)
    ? chatWindowId : triggeredWindowId;

  const chatW = Math.floor(wa.width * 0.6);
  const qaW = wa.width - chatW;

  chatWindowId = targetChatId;
  await setWindowBounds(chatWindowId, wa.left, wa.top, chatW, wa.height);

  if (qaWindowId !== null) {
    try {
      await setWindowBounds(qaWindowId, wa.left + chatW, wa.top, qaW, wa.height);
      await chrome.windows.update(qaWindowId, { focused: true });
      currentMode = 'side';
      return;
    } catch { qaWindowId = null; }
  }

  const url = await getDevUrl();
  const win = await chrome.windows.create({
    url,
    left: wa.left + chatW, top: wa.top,
    width: qaW, height: wa.height,
    focused: true,
  });
  qaWindowId = win.id;
  currentMode = 'side';
}

// フルモード: QAmatomer を最大化
async function enterFullMode() {
  if (qaWindowId !== null) {
    try {
      await chrome.windows.update(qaWindowId, { state: 'maximized', focused: true });
      currentMode = 'full';
      return;
    } catch { qaWindowId = null; }
  }
  const url = await getDevUrl();
  const win = await chrome.windows.create({ url, state: 'maximized', focused: true });
  qaWindowId = win.id;
  currentMode = 'full';
}

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === qaWindowId) { qaWindowId = null; currentMode = 'full'; }
});

// キーボードショートカット (^⇧Q on Mac)
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'toggle-mode') return;
  const focused = await chrome.windows.getLastFocused({ windowTypes: ['normal'] });
  if (currentMode === 'side') {
    await enterFullMode();
  } else {
    await enterSideMode(focused.id);
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === 'ENTER_SIDE') {
    chrome.windows.getLastFocused({ windowTypes: ['normal'] })
      .then((win) => enterSideMode(win.id, message.wa))
      .then(() => sendResponse({ ok: true }))
      .catch((e) => sendResponse({ ok: false, error: String(e?.message || e) }));
    return true;
  }
  if (message?.type === 'ENTER_FULL') {
    enterFullMode()
      .then(() => sendResponse({ ok: true }))
      .catch((e) => sendResponse({ ok: false, error: String(e?.message || e) }));
    return true;
  }
  if (message?.type === 'GET_MODE') {
    sendResponse({ mode: currentMode });
  }
});
