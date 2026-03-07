const DEFAULT_DEV_URL = 'http://127.0.0.1:4173/QAmatomer_dev.html';

const devUrlInput = document.getElementById('devUrl');
const saveBtn = document.getElementById('save');
const resetBtn = document.getElementById('reset');
const statusEl = document.getElementById('status');

async function load() {
  const { devUrl } = await chrome.storage.sync.get({ devUrl: DEFAULT_DEV_URL });
  devUrlInput.value = devUrl || DEFAULT_DEV_URL;
}

saveBtn.addEventListener('click', async () => {
  const value = (devUrlInput.value || '').trim();
  if (!value) {
    statusEl.textContent = 'URLを入力してください。';
    statusEl.style.color = '#dc2626';
    return;
  }
  try {
    new URL(value);
  } catch {
    statusEl.textContent = 'URL形式が不正です。';
    statusEl.style.color = '#dc2626';
    return;
  }
  await chrome.storage.sync.set({ devUrl: value });
  statusEl.textContent = '保存しました。';
  statusEl.style.color = '#16a34a';
});

resetBtn.addEventListener('click', async () => {
  devUrlInput.value = DEFAULT_DEV_URL;
  await chrome.storage.sync.set({ devUrl: DEFAULT_DEV_URL });
  statusEl.textContent = 'デフォルトに戻しました。';
  statusEl.style.color = '#16a34a';
});

load();
