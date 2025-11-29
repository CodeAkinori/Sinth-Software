const urlInput = document.getElementById('url');
const typeSelect = document.getElementById('type');
const selectFolderBtn = document.getElementById('selectFolder');
const downloadBtn = document.getElementById('downloadBtn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const statusDiv = document.getElementById('status');

selectFolderBtn.addEventListener('click', async () => {
  const folder = await window.electronAPI.selectFolder();
  statusDiv.textContent = `Folder selected: ${folder}`;
});

downloadBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();
  const type = typeSelect.value;

  if (!url) {
    statusDiv.textContent = 'Please enter a valid URL.';
    return;
  }

  progressBar.style.width = '0%';
  progressText.textContent = '0%';
  statusDiv.textContent = 'Starting download...';

  try {
    const result = await window.electronAPI.download({ url, type });
    statusDiv.textContent = result;
  } catch (error) {
    statusDiv.textContent = error.message;
  }
});

window.electronAPI.onProgress((progress) => {
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${progress.toFixed(1)}%`;
});
