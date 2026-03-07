const DEFAULT_DEV_URL = 'http://127.0.0.1:4173/QAmatomer_dev.html';

async function getDevUrl() {
  const { devUrl } = await chrome.storage.sync.get({ devUrl: DEFAULT_DEV_URL });
  return devUrl || DEFAULT_DEV_URL;
}

async function getActiveTabId(fallbackTabId) {
  if (fallbackTabId) return fallbackTabId;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.id;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'OPEN_DEV') {
    getDevUrl()
      .then((url) => chrome.tabs.create({ url }))
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }

  if (message?.type === 'OPEN_SIDEPANEL') {
    getActiveTabId(sender?.tab?.id)
      .then((tabId) => {
        if (!tabId) throw new Error('active tab not found');
        return chrome.sidePanel.setOptions({ tabId, path: 'sidepanel.html', enabled: true })
          .then(() => chrome.sidePanel.open({ tabId }));
      })
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: String(error?.message || error) }));
    return true;
  }
});
