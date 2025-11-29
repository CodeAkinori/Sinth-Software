const urlInput = document.getElementById('url');
const typeSelect = document.getElementById('type');
const statusDiv = document.getElementById('status');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

document.getElementById('select-folder').addEventListener('click', async () => {
  const folder = await window.electronAPI.selectFolder();
  statusDiv.textContent = `Selected Folder: ${folder}`;
});

document.getElementById('download').addEventListener('click', async () => {
  const url = urlInput.value.trim();
  const type = typeSelect.value;

  if (!url) {
    statusDiv.textContent = 'Please enter a valid URL.';
    return;
  }

  statusDiv.textContent = 'Downloading...';
  progressBar.style.width = '0%';
  progressText.textContent = '0%';

  try {
    await window.electronAPI.download({ url, type });
    statusDiv.textContent = 'Download completed successfully.';
    progressBar.style.width = '100%';
    progressText.textContent = '100%';
  } catch (err) {
    statusDiv.textContent = 'Error: ' + err.message;
  }
});

window.electronAPI.onProgress((progress) => {
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${progress.toFixed(1)}%`;
  statusDiv.textContent = `Downloading... ${progress.toFixed(1)}%`;
});
