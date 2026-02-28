# md-bold-spacer 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/md-bold-spacer)
[![Compatibility](https://img.shields.io/badge/Compatibility-Node.js%20%2F%20Bun-green.svg)](#)

**Stop the "Bold Not Rendering" bug in CJK Markdown without heavy tools like textlint.**

[日本語のREADMEは下記をご覧ください](#japanese)

---

## 🧐 What is this?

In many Markdown renderers (GitHub, VSCode Preview, Zenn, etc.), bold text (`**BOLD**`) fails to render if it's placed immediately next to CJK (Chinese, Japanese, Korean) characters without a space.

`md-bold-spacer` is a lightning-fast, zero-dependency CLI tool that automatically fixes this by inserting half-width spaces between CJK characters and bold markers.

### Before
これは**太字**です。 (Might not render as bold)

### After
これは **太字** です。 (Always renders correctly)

## ✨ Features

- **Zero Dependency**: Extremely lightweight and fast.
- **Universal**: Guaranteed to run on both **Node.js** and **Bun**.
- **Safe**: Automatically protects Code Blocks (```) and Inline Code (`).
- **Smart**: Handles list markers (`- **item**`) correctly and avoids double spacing.

## 🚀 Usage

No installation required. Just run it with `npx`.

```bash
# Fix a single file
npx md-bold-spacer path/to/your/file.md

# Fix all .md files in a directory
npx md-bold-spacer ./articles
```

## 🛠 Options

- `-h, --help`: Show help message.
- `-v, --version`: Show version number.

---

<div id="japanese"></div>

## 🇯🇵 日本語版

`md-bold-spacer` は、日本語などのCJK文字と太字（`**`）が隣接している場合に、一部のMarkdownレンダー（GitHub, VSCode, Zenn等）で太字が正しく表示されない問題を解決するためのCLIツールです。

### 特徴
- **インストール不要**: `npx` で即座に実行可能。
- **マルチ環境対応**: Node.js と Bun の両方で動作します。
- **安全**: コードブロックやインラインコードの中身は変更しません。
- **軽量**: 依存関係ゼロで動作します。

### 使い方
```bash
npx md-bold-spacer <ファイルまたはディレクトリのパス>
```

---

## 📄 License
MIT

## 👤 Author
**kazuki-ookura**
- GitHub: [@kazuki-ookura](https://github.com/kazuki-ookura)
