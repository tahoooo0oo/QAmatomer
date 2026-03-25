const enterSideBtn = document.getElementById('enterSide');
const enterFullBtn  = document.getElementById('enterFull');
const optionsBtn    = document.getElementById('options');
const statusEl      = document.getElementById('status');

function showError(prefix, error) {
  statusEl.textContent = `${prefix}: ${chrome.runtime.lastError?.message || error?.message || String(error) || 'unknown'}`;
}

// 現在モードをハイライト
chrome.runtime.sendMessage({ type: 'GET_MODE' }, (res) => {
  if (res?.mode === 'side') enterSideBtn.classList.add('active');
  else enterFullBtn.classList.add('active');
});

enterSideBtn.addEventListener('click', () => {
  // popup の screen オブジェクトは信頼性が高い
  const wa = {
    left: screen.availLeft ?? 0,
    top: screen.availTop ?? 0,
    width: screen.availWidth,
    height: screen.availHeight,
  };
  chrome.runtime.sendMessage({ type: 'ENTER_SIDE', wa }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      showError('失敗', chrome.runtime.lastError || new Error(res?.error));
      return;
    }
    window.close();
  });
});

enterFullBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'ENTER_FULL' }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      showError('失敗', chrome.runtime.lastError || new Error(res?.error));
      return;
    }
    window.close();
  });
});

optionsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
