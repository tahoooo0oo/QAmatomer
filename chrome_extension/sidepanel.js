const DEFAULT_DEV_URL = 'http://127.0.0.1:4173/QAmatomer_dev.html';
const frame = document.getElementById('appFrame');
const statusEl = document.getElementById('status');
const reloadBtn = document.getElementById('reload');
const newTabLink = document.getElementById('newTab');

async function getDevUrl() {
  const { devUrl } = await chrome.storage.sync.get({ devUrl: DEFAULT_DEV_URL });
  return devUrl || DEFAULT_DEV_URL;
}

async function loadFrame() {
  const url = await getDevUrl();
  frame.src = url;
  newTabLink.href = url;
  statusEl.textContent = `接続先: ${url}`;
}

reloadBtn.addEventListener('click', () => {
  if (!frame.src) return;
  frame.src = frame.src;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.devUrl) {
    loadFrame();
  }
});

loadFrame();
