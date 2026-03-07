const openBtn = document.getElementById('open');
const optionsBtn = document.getElementById('options');
const statusEl = document.getElementById('status');

openBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'OPEN_DEV' }, (res) => {
    if (chrome.runtime.lastError || !res?.ok) {
      statusEl.textContent = `起動に失敗しました: ${chrome.runtime.lastError?.message || res?.error || 'unknown error'}`;
      return;
    }
    window.close();
  });
});

optionsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
