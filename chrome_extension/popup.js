const openSideBtn = document.getElementById('openSide');
const openBtn = document.getElementById('open');
const optionsBtn = document.getElementById('options');
const statusEl = document.getElementById('status');

function showError(prefix, error) {
  statusEl.textContent = `${prefix}: ${chrome.runtime.lastError?.message || error?.message || String(error) || 'unknown error'}`;
}

openSideBtn.addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !tab?.windowId) throw new Error('active tab not found');
    await chrome.sidePanel.setOptions({ tabId: tab.id, path: 'sidepanel.html', enabled: true });
    // NOTE: sidePanel.open() must be called from a user gesture context.
    await chrome.sidePanel.open({ windowId: tab.windowId });
    window.close();
  } catch (error) {
    showError('サイドパネル起動に失敗しました', error);
  }
});

openBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'OPEN_DEV' }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      showError('タブ起動に失敗しました', chrome.runtime.lastError || new Error(res?.error || 'unknown error'));
      return;
    }
    window.close();
  });
});

optionsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
