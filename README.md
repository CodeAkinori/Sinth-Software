# SINTH - Video Downloader

A simple, open-source video downloader with a modern graphical interface

Version: 1.0.0 | Platform: Windows

Linux and MacOS soon...

## Overview

SINTH is a lightweight, desktop application built with Electron that allows users to download videos and audio from various online platforms. It features a clean, modern interface and leverages the power of `yt-dlp` and `ffmpeg` to provide high-quality downloads.

## Features

- Video Downloads - Download videos in MP4 format with best available quality
- Audio Extraction - Extract audio and convert to MP3 format
- Custom Download Location - Choose where to save your downloads
- Real-time Progress Tracking - Visual progress bar with percentage indicator
- Persistent Settings - Remembers your preferred download folder
- Fast and Efficient - Optimized download process with minimal resource usage

## Prerequisites

Before installing SINTH, ensure you have the following:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning the repository)

## Installation

### Build from Source

```bash
# Clone the repository
git clone https://github.com/yourusername/sinth.git
cd sinth

# Install dependencies
npm install

# Run the application in development mode
npm start
```

## Usage

### Basic Workflow

1. Launch SINTH - Open the application from your applications folder or desktop shortcut

2. Enter Video URL - Paste the URL of the video you want to download in the text input field

3. Select Format - Choose between:
   - `Video (mp4)` - Downloads the video file
   - `Audio (mp3)` - Extracts and converts audio only

4. Choose Download Location (Optional) - Click "Select Folder" to choose where files will be saved
   - Default location: Your system's Downloads folder
   - The folder selection is remembered for future downloads

5. Start Download - Click the "Download" button to begin
   - Progress bar will show real-time download progress
   - Status messages will keep you informed of the process

6. Access Your Files - Once complete, find your downloaded files in the selected folder

### Supported Platforms

SINTH works with most video platforms supported by yt-dlp, including:
- YouTube
- Vimeo
- Dailymotion
- Twitter/X
- Facebook
- Instagram
- And many more...

## Project Structure

```
sinth/
├── dist/                          # Build output directory
│   ├── win-unpacked/             # Unpacked Windows build
│   ├── builder-debug.yml         # Build debug configuration
│   ├── builder-effective-config.yml
│   └── Sinth Setup 1.0.0.exe     # Windows installer
│
├── node_modules/                  # Dependencies
│
├── resources/                     # Static resources
│   └── bin/
│       └── win/                  # Windows binaries
│           ├── ffmpeg.exe        # FFmpeg executable
│           └── yt-dlp.exe        # yt-dlp executable
│
├── src/                          # Source code
│   ├── renderer/                 # Renderer process (UI)
│   │   ├── index.html           # Main HTML file
│   │   ├── renderer.js          # UI logic
│   │   ├── script.js            # Additional scripts
│   │   └── style.css            # Styling
│   │
│   ├── main.js                  # Main process (Electron)
│   └── preload.js               # Preload script (IPC bridge)
│
├── electron-builder.yml          # Electron Builder configuration
├── package.json                  # Project metadata and scripts
├── package-lock.json            # Dependency lock file
└── README.md                    # This file
```

## Development

### Setting Up Development Environment

```bash
# Install dependencies
npm install

# Start in development mode with hot reload
npm start

# Run with debugging
npm run dev
```

### Available Scripts

```json
{
  "start": "electron .",
  "dev": "NODE_ENV=development electron .",
  "build": "electron-builder",
  "build:win": "electron-builder --win",
  "build:mac": "electron-builder --mac",
  "build:linux": "electron-builder --linux"
}
```

### Development Tools

- **Electron DevTools** - Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (macOS) to open
- **Hot Reload** - Modify files in `src/renderer/` and refresh to see changes
- **Logging** - Check console for stdout/stderr from yt-dlp and ffmpeg

### Build Commands

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run build:win     # Windows
npm run build:mac     # macOS
npm run build:linux   # Linux

# Build for all platforms
npm run build -- -wml
```

## Troubleshooting

### Common Issues

#### Download Fails Immediately
- Cause: Invalid URL or unsupported platform
- Solution: Verify the URL is correct and from a supported platform

#### "yt-dlp not found" Error
- Cause: Binary path is incorrect or binary is missing
- Solution: Ensure `resources/bin/win/yt-dlp.exe` exists and is executable

#### Progress Bar Doesn't Update
- Cause: IPC communication issue
- Solution: Check that `preload.js` is properly loaded in BrowserWindow configuration

#### Downloads to Wrong Folder
- Cause: Folder selection not saved
- Solution: Click "Select Folder" again and ensure electron-store is working

### Debug Mode

Run the application with debugging enabled:

```bash
# Windows
set DEBUG=* && npm start

# Linux/macOS
DEBUG=* npm start
```

### Logs Location

Application logs are stored in:
- Windows: `%APPDATA%/sinth/logs`
- macOS: `~/Library/Application Support/sinth/logs`
- Linux: `~/.config/sinth/logs`

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

1. Check if the issue already exists in [Issues](https://github.com/codeakinori/Sinth-Software/issues)
2. If not, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Your OS and SINTH version

### Suggesting Features

1. Open a new issue with the `enhancement` label
2. Describe the feature and its use case
3. Explain why it would be valuable

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Comment complex logic
- Keep functions small and focused

## Support

Need help? Here are your options:

- Documentation: Check this README thoroughly
- Bug Reports: [Open an issue](https://github.com/codeakinori/Sinth-Software/issues)
- Discussions: [Join our community](https://github.com/codeakinori/Sinth-Software/discussions)

---

## Acknowledgments

SINTH is built with these amazing open-source projects:

- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Video download engine
- [FFmpeg](https://ffmpeg.org/) - Multimedia processing
- [electron-store](https://github.com/sindresorhus/electron-store) - Settings persistence

---

## Support the Project

If you find SINTH useful, consider supporting its development:

Bitcoin: bc1qwhhpvq9jv54xp9appezlwh9nfu4kacrdp3jrha

---

Made with care by the SINTH community

[Back to Top](#sinth---video-downloader)
