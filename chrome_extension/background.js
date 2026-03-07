const DEFAULT_DEV_URL = 'http://127.0.0.1:4173/QAmatomer_dev.html';

async function getDevUrl() {
  const { devUrl } = await chrome.storage.sync.get({ devUrl: DEFAULT_DEV_URL });
  return devUrl || DEFAULT_DEV_URL;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== 'OPEN_DEV') return;
  getDevUrl()
    .then((url) => chrome.tabs.create({ url }))
    .then(() => sendResponse({ ok: true }))
    .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
  return true;
});
