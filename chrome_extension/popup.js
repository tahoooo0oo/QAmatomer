const openSideBtn = document.getElementById('openSide');
const openBtn = document.getElementById('open');
const optionsBtn = document.getElementById('options');
const statusEl = document.getElementById('status');

function showError(prefix, res) {
  statusEl.textContent = `${prefix}: ${chrome.runtime.lastError?.message || res?.error || 'unknown error'}`;
}

openSideBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'OPEN_SIDEPANEL' }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      showError('サイドパネル起動に失敗しました', res);
      return;
    }
    window.close();
  });
});

openBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'OPEN_DEV' }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      showError('タブ起動に失敗しました', res);
      return;
    }
    window.close();
  });
});

optionsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
